import sql from './db.js';

async function checkLogsAndInvoices() {
    try {
        console.log('--- Table Existence Check ---');
        const tables = await sql`
            SELECT table_name 
            FROM information_schema.tables 
            WHERE table_schema = 'public' 
            AND table_name IN ('system_logs', 'audit_logs', 'invoices', 'folios')
        `;
        console.table(tables);

        console.log('--- Folios Columns (if exists) ---');
        const folios = await sql`
            SELECT column_name, data_type 
            FROM information_schema.columns 
            WHERE table_name = 'folios'
        `;
        console.table(folios);

        console.log('--- Audit Logs Columns (if exists) ---');
        const audit = await sql`
            SELECT column_name, data_type 
            FROM information_schema.columns 
            WHERE table_name = 'audit_logs'
        `;
        console.table(audit);

    } catch (err) {
        console.error(err);
    } finally {
        await sql.end();
    }
}

checkLogsAndInvoices();
