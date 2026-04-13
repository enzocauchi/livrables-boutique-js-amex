const fs = require('fs/promises');
const path = require('path');
const db = require('../database/connection');

const PROJECT_ROOT = path.join(__dirname, '..', '..', '..');
const IMAGE_EXTENSIONS = new Set(['.png', '.jpg', '.jpeg', '.webp']);
const VARIANT_PRICE_OFFSETS = {
    'De base': 0,
    Bleu: 125000,
    Vert: 235000
};

const getOrderedFileRank = (fileName) => {
    const match = fileName.match(/^(\d+)-/);
    return match ? Number(match[1]) : Number.MAX_SAFE_INTEGER;
};

const getVariantSprites = async (imageUrl) => {
    if (!imageUrl) {
        return [];
    }

    const relativeDir = path.dirname(imageUrl);
    const absoluteDir = path.join(PROJECT_ROOT, relativeDir);

    try {
        const files = await fs.readdir(absoluteDir);
        const sprites = files
            .filter((file) => IMAGE_EXTENSIONS.has(path.extname(file).toLowerCase()))
            .sort((left, right) => {
                const rankDiff = getOrderedFileRank(left) - getOrderedFileRank(right);
                if (rankDiff !== 0) {
                    return rankDiff;
                }

                return left.localeCompare(right, undefined, { numeric: true });
            })
            .map((file) => `${relativeDir}/${file}`);

        return sprites.length ? sprites : [imageUrl];
    } catch (error) {
        return [imageUrl];
    }
};

const enrichCarsWithVariants = (cars) => {
    return new Promise((resolve, reject) => {
        if (!cars.length) {
            resolve([]);
            return;
        }

        const ids = cars.map((car) => car.id);
        const placeholders = ids.map(() => '?').join(',');
        const sql = `
            SELECT id, vehicule_id, image_url, nom
            FROM variantes
            WHERE vehicule_id IN (${placeholders})
            ORDER BY id
        `;

        db.query(sql, ids, async (err, variants) => {
            if (err) return reject(err);

            try {
                const variantsWithSprites = await Promise.all(
                    variants.map(async (variant) => ({
                        vehicule_id: variant.vehicule_id,
                        id: variant.id,
                        nom: variant.nom,
                        image_url: variant.image_url,
                        sprites: await getVariantSprites(variant.image_url)
                    }))
                );

                const variantsByCarId = variantsWithSprites.reduce((acc, variant) => {
                    if (!acc[variant.vehicule_id]) {
                        acc[variant.vehicule_id] = [];
                    }

                    acc[variant.vehicule_id].push({
                        id: variant.id,
                        nom: variant.nom,
                        image_url: variant.sprites[0] || variant.image_url,
                        sprites: variant.sprites
                    });
                    return acc;
                }, {});

                resolve(cars.map((car) => {
                    const carVariants = variantsByCarId[car.id] || [];
                    const baseVariant = carVariants.find((variant) => variant.nom === 'De base') || carVariants[0];

                    return {
                        ...car,
                        image_url: baseVariant?.sprites?.[0] || baseVariant?.image_url || car.image_url,
                        variantes: carVariants
                    };
                }));
            } catch (error) {
                reject(error);
            }
        });
    });
};

/**
 * Récupère un véhicule spécifique par son ID avec sa catégorie,
 * son constructeur et la liste de ses variantes.
 */
exports.getCarByID = (id) => {
    return new Promise((resolve, reject) => {
        const sql = `
            SELECT
                v.*,
                c.nom AS categorie,
                con.nom AS constructeur
            FROM vehicules v
                LEFT JOIN categories c ON v.category_id = c.id
                LEFT JOIN constructeurs con ON v.constructeur_id = con.id
            WHERE v.id = ?
        `;

        db.query(sql, [id], (err, results) => {
            if (err) return reject(err);

            if (results[0]) {
                enrichCarsWithVariants(results)
                    .then((cars) => resolve(cars[0]))
                    .catch(reject);
            } else {
                resolve(null);
            }
        });
    });
};

/**
 * Récupère la liste de tous les véhicules avec leurs détails
 * et leurs variantes respectives.
 */
exports.getAllCars = () => {
    return new Promise((resolve, reject) => {
        const sql = `
            SELECT
                v.*,
                c.nom AS categorie,
                con.nom AS constructeur
            FROM vehicules v
                     LEFT JOIN categories c ON v.category_id = c.id
                     LEFT JOIN constructeurs con ON v.constructeur_id = con.id
            ORDER BY v.id
        `;

        db.query(sql, (err, results) => {
            if (err) return reject(err);
            enrichCarsWithVariants(results)
                .then(resolve)
                .catch(reject);
        });
    });
};

exports.createOrder = ({ customerName, address, items }) => {
    return new Promise((resolve, reject) => {
        if (!items.length) {
            reject(new Error('EMPTY_ORDER'));
            return;
        }

        const vehicleIds = items.map((item) => item.id);
        const placeholders = vehicleIds.map(() => '?').join(',');
        const sql = `
            SELECT id, nom_modele, prix, stock_quantity, promotion_percent
            FROM vehicules
            WHERE id IN (${placeholders})
            FOR UPDATE
        `;

        db.beginTransaction((transactionError) => {
            if (transactionError) {
                reject(transactionError);
                return;
            }

            db.query(sql, vehicleIds, (selectError, vehicles) => {
                if (selectError) {
                    return db.rollback(() => reject(selectError));
                }

                const vehiclesById = vehicles.reduce((acc, vehicle) => {
                    acc[vehicle.id] = vehicle;
                    return acc;
                }, {});

                const normalizedItems = [];
                for (const item of items) {
                    const vehicle = vehiclesById[item.id];
                    if (!vehicle) {
                        return db.rollback(() => reject(new Error(`UNKNOWN_VEHICLE_${item.id}`)));
                    }

                    if (vehicle.stock_quantity < item.quantity) {
                        return db.rollback(() => reject(new Error(`OUT_OF_STOCK_${vehicle.id}`)));
                    }

                    const variantOffset = VARIANT_PRICE_OFFSETS[item.variantName] || 0;
                    const discountedBasePrice = Number(vehicle.prix) * (1 - Number(vehicle.promotion_percent || 0) / 100);
                    const finalUnitPrice = discountedBasePrice + variantOffset;

                    normalizedItems.push({
                        id: vehicle.id,
                        nom_modele: vehicle.nom_modele,
                        quantity: Number(item.quantity),
                        variantName: item.variantName || 'De base',
                        unitPrice: Number(finalUnitPrice.toFixed(2))
                    });
                }

                const totalAmount = normalizedItems.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0);
                const insertOrderSql = `
                    INSERT INTO commandes (
                        customer_name,
                        address_line1,
                        address_line2,
                        postal_code,
                        city,
                        country,
                        total_amount
                    ) VALUES (?, ?, ?, ?, ?, ?, ?)
                `;

                db.query(
                    insertOrderSql,
                    [
                        customerName,
                        address.line1,
                        address.line2 || null,
                        address.postalCode,
                        address.city,
                        address.country,
                        totalAmount
                    ],
                    (orderError, orderResult) => {
                        if (orderError) {
                            return db.rollback(() => reject(orderError));
                        }

                        const orderId = orderResult.insertId;
                        const itemValues = normalizedItems.map((item) => [
                            orderId,
                            item.id,
                            item.variantName,
                            item.quantity,
                            item.unitPrice
                        ]);

                        db.query(
                            'INSERT INTO commande_items (commande_id, vehicule_id, variant_name, quantity, unit_price) VALUES ?',
                            [itemValues],
                            (itemsError) => {
                                if (itemsError) {
                                    return db.rollback(() => reject(itemsError));
                                }

                                const stockUpdates = normalizedItems.map((item) => new Promise((stockResolve, stockReject) => {
                                    db.query(
                                        'UPDATE vehicules SET stock_quantity = stock_quantity - ? WHERE id = ?',
                                        [item.quantity, item.id],
                                        (updateError) => {
                                            if (updateError) {
                                                stockReject(updateError);
                                            } else {
                                                stockResolve();
                                            }
                                        }
                                    );
                                }));

                                Promise.all(stockUpdates)
                                    .then(() => {
                                        db.commit((commitError) => {
                                            if (commitError) {
                                                return db.rollback(() => reject(commitError));
                                            }

                                            resolve({
                                                orderId,
                                                totalAmount,
                                                items: normalizedItems
                                            });
                                        });
                                    })
                                    .catch((stockError) => {
                                        db.rollback(() => reject(stockError));
                                    });
                            }
                        );
                    }
                );
            });
        });
    });
};
