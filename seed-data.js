import sql from './db.js';

async function seed() {
    console.log('🌱 Starting seed...');

    try {
        // 1. Organization
        let orgs = await sql`SELECT id, name FROM organizations LIMIT 1`;
        let orgId;
        if (orgs.length === 0) {
            console.log('Creating Organization...');
            const newOrg = await sql`
                INSERT INTO organizations (name, subdomain, subscription_plan)
                VALUES ('Seed Org', 'seed-org-' || gen_random_uuid(), 'FREE')
                RETURNING id
            `;
            orgId = newOrg[0].id;
        } else {
            orgId = orgs[0].id;
            console.log(`Using existing Organization: ${orgs[0].name} (${orgId})`);
        }

        // 2. Property
        let props = await sql`SELECT id, name FROM properties WHERE organization_id = ${orgId} LIMIT 1`;
        let propId;
        if (props.length === 0) {
            console.log('Creating Property...');
            const newProp = await sql`
                INSERT INTO properties (organization_id, name, address_line_1, city, country_code)
                VALUES (${orgId}, 'Seed Hotel', '123 Seed St', 'Seed City', 'US')
                RETURNING id
            `;
            propId = newProp[0].id;
        } else {
            propId = props[0].id;
            console.log(`Using existing Property: ${props[0].name} (${propId})`);
        }

        // 3. Room Type
        let types = await sql`SELECT id, name FROM room_types WHERE property_id = ${propId} LIMIT 1`;
        let typeId;
        if (types.length === 0) {
            console.log('Creating Room Type...');
            const newType = await sql`
                INSERT INTO room_types (organization_id, property_id, name, occupancy_adults, base_price)
                VALUES (${orgId}, ${propId}, 'Deluxe King', 2, 150.00)
                RETURNING id
            `;
            typeId = newType[0].id;
        } else {
            typeId = types[0].id;
            console.log(`Using existing Room Type: ${types[0].name} (${typeId})`);
        }

        // 4. Room
        // Check if room 101 exists
        const roomNum = '101';
        let rooms = await sql`SELECT id FROM rooms WHERE property_id = ${propId} AND room_number = ${roomNum}`;
        if (rooms.length === 0) {
            console.log(`Creating Room ${roomNum}...`);
            await sql`
                INSERT INTO rooms (organization_id, property_id, room_type_id, room_number, status)
                VALUES (${orgId}, ${propId}, ${typeId}, ${roomNum}, 'CLEAN')
            `;
        } else {
            console.log(`Room ${roomNum} already exists.`);
        }

        // 5. Guest
        const guestEmail = 'seed.guest@example.com';
        let guests = await sql`SELECT id FROM guests WHERE property_id = ${propId} AND email = ${guestEmail}`;
        if (guests.length === 0) {
            console.log(`Creating Guest ${guestEmail}...`);
            await sql`
                INSERT INTO guests (organization_id, property_id, first_name, last_name, email, phone, is_vip)
                VALUES (${orgId}, ${propId}, 'Seed', 'Guest', ${guestEmail}, '555-0100', true)
            `;
        } else {
            console.log(`Guest ${guestEmail} already exists.`);
        }

        console.log('✅ Seeding complete.');

    } catch (err) {
        console.error('❌ Seeding failed:', err);
    } finally {
        await sql.end();
    }
}

seed();
