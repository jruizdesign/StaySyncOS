import sql from './db.js';

async function checkSchema() {
    try {
        console.log('--- Properties Columns ---');
        const propsCols = await sql`
            SELECT column_name, data_type 
            FROM information_schema.columns 
            WHERE table_name = 'properties'
        `;
        console.table(propsCols);

        console.log('\n--- Rooms Columns ---');
        const roomsCols = await sql`
            SELECT column_name, data_type 
            FROM information_schema.columns 
            WHERE table_name = 'rooms'
        `;
        console.table(roomsCols);

    } catch (err) {
        console.error(err);
    } finally {
        await sql.end();
    }
}

checkSchema();
