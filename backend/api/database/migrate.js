const mysql = require('mysql2');

const dbConfig = {
    host: process.env.DB_HOST || '127.0.0.1',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || 'root',
    database: process.env.DB_NAME || 'boutique',
    port: Number(process.env.DB_PORT) || 3306
};

const connection = mysql.createConnection(dbConfig);

connection.connect((err) => {
    if (err) {
        console.error('❌ Connection error:', err.message);
        process.exit(1);
    }
    console.log('✅ Connected to MySQL');
});

// Migration function
const migrate = () => {
    console.log('\n🔧 Starting database migration...\n');

    // Step 1: Check current structure
    console.log('📋 Step 1: Checking current table structure...');
    connection.query('DESCRIBE vehicules', (err, result) => {
        if (err) {
            console.error('❌ Error describing table:', err.message);
            connection.end();
            process.exit(1);
        }
        
        console.log('Current columns:', result.map(r => r.Field).join(', '));
        
        const hasStockQty = result.some(r => r.Field === 'stock_quantity');
        const hasPromo = result.some(r => r.Field === 'promotion_percent');
        
        console.log(`  • stock_quantity exists: ${hasStockQty ? '✅' : '❌'}`);
        console.log(`  • promotion_percent exists: ${hasPromo ? '✅' : '❌'}\n`);
        
        // Step 2: Add missing columns
        addMissingColumns(hasStockQty, hasPromo);
    });
};

const addMissingColumns = (hasStockQty, hasPromo) => {
    let completed = 0;
    const total = (hasStockQty ? 0 : 1) + (hasPromo ? 0 : 1);
    
    if (total === 0) {
        console.log('✅ All columns already exist! No migration needed.\n');
        connection.end();
        process.exit(0);
    }
    
    console.log(`📝 Step 2: Adding missing columns (${total} to add)...\n`);
    
    // Add stock_quantity
    if (!hasStockQty) {
        console.log('Adding column: stock_quantity...');
        connection.query(
            'ALTER TABLE vehicules ADD COLUMN stock_quantity INT DEFAULT 10',
            (err) => {
                if (err) {
                    console.error('❌ Error adding stock_quantity:', err.message);
                    connection.end();
                    process.exit(1);
                }
                console.log('✅ Column stock_quantity added\n');
                completed++;
                if (completed === total) finalizeMigration();
            }
        );
    } else {
        completed++;
    }
    
    // Add promotion_percent
    if (!hasPromo) {
        console.log('Adding column: promotion_percent...');
        connection.query(
            'ALTER TABLE vehicules ADD COLUMN promotion_percent DECIMAL(5,2) DEFAULT 0',
            (err) => {
                if (err) {
                    console.error('❌ Error adding promotion_percent:', err.message);
                    connection.end();
                    process.exit(1);
                }
                console.log('✅ Column promotion_percent added\n');
                completed++;
                if (completed === total) finalizeMigration();
            }
        );
    } else {
        completed++;
    }
};

const finalizeMigration = () => {
    console.log('📋 Step 3: Verifying final structure...\n');
    connection.query('DESCRIBE vehicules', (err, result) => {
        if (err) {
            console.error('❌ Error verifying:', err.message);
            connection.end();
            process.exit(1);
        }
        
        console.log('Final columns:', result.map(r => r.Field).join(', '));
        console.log('\n✅ Migration completed successfully!\n');
        connection.end();
        process.exit(0);
    });
};

migrate();
