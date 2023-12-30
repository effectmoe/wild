
global.admin = require('firebase-admin');

// console.log('global.production=', global.production);
// const serviceAccount = require('./serviceaccount.json');
// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount),
//   storageBucket: JSON.parse(process.env.FIREBASE_CONFIG).storageBucket,
//   },
//   functions.config().firebase
// );
// else {
admin.initializeApp();
// }

//db.settings
// const firestore = admin.firestore();
global.firestore = admin.firestore();
firestore.settings({timestampsInSnapshots: true});
