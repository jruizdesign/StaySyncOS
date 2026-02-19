import sql from './db.js';

async function checkMoreSchema() {
    try {
        console.log('--- Guests Columns ---');
        const g = await sql`
            SELECT column_name, data_type 
            FROM information_schema.columns 
            WHERE table_name = 'guests'
        `;
        console.table(g);

        console.log('--- Reservations Columns ---');
        const r = await sql`
            SELECT column_name, data_type 
            FROM information_schema.columns 
            WHERE table_name = 'reservations'
        `;
        console.table(r);

    } catch (err) {
        console.error(err);
    } finally {
        await sql.end();
    }
}

checkMoreSchema();
