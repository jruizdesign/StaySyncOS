import sql from './db.js';

async function checkPropertiesSchema() {
    try {
        console.log('--- Properties Columns ---');
        const cols = await sql`
            SELECT column_name, data_type 
            FROM information_schema.columns 
            WHERE table_name = 'properties'
        `;
        console.table(cols);
    } catch (err) {
        console.error(err);
    } finally {
        await sql.end();
    }
}

checkPropertiesSchema();
