import sql from './db.js';

async function checkUsersSchema() {
    try {
        console.log('--- Users Columns ---');
        const usersCols = await sql`
            SELECT column_name, data_type 
            FROM information_schema.columns 
            WHERE table_name = 'users'
        `;
        console.table(usersCols);

    } catch (err) {
        console.error(err);
    } finally {
        await sql.end();
    }
}

checkUsersSchema();
