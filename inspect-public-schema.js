import sql from './db.js';

async function checkPublicSchema() {
    try {
        console.log('--- Public Users Columns ---');
        const usersCols = await sql`
            SELECT column_name, data_type 
            FROM information_schema.columns 
            WHERE table_name = 'users' AND table_schema = 'public'
        `;
        console.table(usersCols);

        console.log('\n--- User Roles Columns ---');
        const userRolesCols = await sql`
            SELECT column_name, data_type 
            FROM information_schema.columns 
            WHERE table_name = 'user_roles' AND table_schema = 'public'
        `;
        console.table(userRolesCols);

    } catch (err) {
        console.error(err);
    } finally {
        await sql.end();
    }
}

checkPublicSchema();
