import sql from './db.js';

async function checkBookingsAndView() {
    try {
        console.log('--- Bookings Columns ---');
        const b = await sql`
            SELECT column_name, data_type 
            FROM information_schema.columns 
            WHERE table_name = 'bookings'
        `;
        console.table(b);

        console.log('--- Views ---');
        const v = await sql`
            SELECT table_name 
            FROM information_schema.views 
            WHERE table_schema = 'public'
        `;
        console.table(v);

    } catch (err) {
        console.error(err);
    } finally {
        await sql.end();
    }
}

checkBookingsAndView();
