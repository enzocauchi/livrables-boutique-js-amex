const db = require('./connection');

const seedData = () => {
    console.log('\n🌱 Seeding test data...\n');

    // Update some vehicles with stock and promotions
    const updates = [
        { id: 1, stock: 15, promo: 10 },      // 10% discount
        { id: 2, stock: 8, promo: 15 },       // 15% discount
        { id: 3, stock: 0, promo: 0 },        // Out of stock
        { id: 4, stock: 12, promo: 20 },      // 20% discount
        { id: 5, stock: 5, promo: 5 },        // 5% discount
    ];

    let completed = 0;

    updates.forEach((update) => {
        const sql = 'UPDATE vehicules SET stock_quantity = ?, promotion_percent = ? WHERE id = ?';
        db.query(sql, [update.stock, update.promo, update.id], (err) => {
            if (err) {
                console.error(`❌ Error updating vehicle ${update.id}:`, err.message);
            } else {
                console.log(`✅ Vehicle ${update.id}: stock=${update.stock}, promo=${update.promo}%`);
            }
            completed++;
            if (completed === updates.length) {
                console.log('\n✅ Seeding completed!\n');
                db.end();
                process.exit(0);
            }
        });
    });
};

seedData();
