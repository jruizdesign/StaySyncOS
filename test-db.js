import sql from './db.js';

async function testConnection() {
    try {
        const result = await sql`select version()`;
        console.log('Database connected:', result[0].version);
    } catch (err) {
        console.error('Connection failed:', err);
    } finally {
        await sql.end();
    }
}

testConnection();