import sql from './db.js';

async function checkChildSchema() {
    try {
        console.log('--- Room Types Columns ---');
        const rt = await sql`
            SELECT column_name, data_type 
            FROM information_schema.columns 
            WHERE table_name = 'room_types'
        `;
        console.table(rt);

        console.log('--- Rooms Columns ---');
        const r = await sql`
            SELECT column_name, data_type 
            FROM information_schema.columns 
            WHERE table_name = 'rooms'
        `;
        console.table(r);

    } catch (err) {
        console.error(err);
    } finally {
        await sql.end();
    }
}

checkChildSchema();
