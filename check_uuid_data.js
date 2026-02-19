import sql from './db.js';

async function checkDataPopulation() {
    try {
        console.log('--- Property UUID Population Check ---');

        const properties = await sql`SELECT count(*) as total, count(id_uuid) as has_uuid FROM properties`;
        console.table(properties);

        const rooms = await sql`SELECT count(*) as total, count(property_uuid) as has_uuid FROM rooms`;
        console.table(rooms);

        const userRoles = await sql`SELECT count(*) as total, count(property_uuid) as has_uuid FROM user_roles`;
        console.table(userRoles);

    } catch (err) {
        console.error(err);
    } finally {
        await sql.end();
    }
}

checkDataPopulation();
