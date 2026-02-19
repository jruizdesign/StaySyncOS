import sql from './db.js';

async function checkConnection() {
    try {
        const result = await sql`
            SELECT 
                current_database() as db_name,
                current_user as db_user,
                inet_server_addr() as db_host,
                version() as db_version
        `;
        console.table(result);
    } catch (err) {
        console.error('Connection failed:', err);
    } finally {
        await sql.end();
    }
}

checkConnection();
