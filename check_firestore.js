const admin = require('firebase-admin');
admin.initializeApp({
    projectId: 'gen-lang-client-0073207940'
});

const db = admin.firestore();
db.settings({
    host: 'localhost:8080',
    ssl: false
});

async function checkUser() {
    const snapshot = await db.collection('users').where('email', '==', 'jruizdesign@gmail.com').get();
    if (snapshot.empty) {
        console.log('No user found in Firestore for jruizdesign@gmail.com');
    } else {
        snapshot.forEach(doc => {
            console.log('Found user in Firestore:', doc.id, doc.data());
        });
    }
}

checkUser();
