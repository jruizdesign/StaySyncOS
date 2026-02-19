import sql from './db.js';

async function checkRoomTypesSchema() {
    try {
        console.log('--- Room Types Columns ---');
        const cols = await sql`
            SELECT column_name, data_type 
            FROM information_schema.columns 
            WHERE table_name = 'room_types'
        `;
        console.table(cols);
    } catch (err) {
        console.error(err);
    } finally {
        await sql.end();
    }
}

checkRoomTypesSchema();
