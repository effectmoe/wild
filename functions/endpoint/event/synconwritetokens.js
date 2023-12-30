
const functions = require('firebase-functions');

process.env.TZ = 'Asia/Tokyo';
module.exports = functions.region('asia-northeast1').firestore.document('tokens/{token}').onWrite(async (snap, context) => {
    if (!snap.after.exists) {
        // デリートは無視
        return;
    }
    const uid = snap.after.id;
    console.log('uid=', uid);
    const tokendata = snap.after.data();

    // トークンにメールアドレスの設定があるかどうか
    if (tokendata.email) {
        // email、名前、電話番号をpersonsに書き込みを行う
        let setdata = { email: tokendata.email, isdevicetoken: true, devicetokens: admin.firestore.FieldValue.arrayUnion(tokendata.devicetoken), available: true, modifydate: admin.firestore.FieldValue.serverTimestamp(), };
        // XXX 名前と電話番号の登録を行う場合の処理は以下
        // ここから
        if (tokendata.name) {
            setdata.name = tokendata.name;
        }
        if (tokendata.tel) {
            setdata.tel = tokendata.tel;
        }
        // ここまで
        await firestore.collection('persons').doc(tokendata.email).set(setdata, { merge: true });
    }
    await admin.messaging().subscribeToTopic([tokendata.devicetoken,], 'all');
    return true;
});
