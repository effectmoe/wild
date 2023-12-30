
const functions = require('firebase-functions');

process.env.TZ = 'Asia/Tokyo';
module.exports = functions.region('asia-northeast1').firestore.document('persons/{person}').onCreate(async (snap, context) => {
    const uid = snap.id;
    const data = snap.data();
    // メアドの新規登録を記録
    await firestore.collection('persons').doc(uid).update({ registerdate: data.modifydate.toDate(), });
    return true;
});
