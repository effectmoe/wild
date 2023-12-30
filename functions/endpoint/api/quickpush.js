
const functions = require('firebase-functions');

process.env.TZ = 'Asia/Tokyo';
module.exports = functions.region('asia-northeast1').https.onCall(async (data, context) => {
    console.log('data=', data);
    let notAllowMessage = null;
    if (!context.auth) {
        // そもそもログインしていない
        notAllowMessage = 'ログインして下さい';
    }
    
    if (null != notAllowMessage) {
        console.log('context.auth=', context.auth);
        throw new functions.https.HttpsError('permission-denied', notAllowMessage);
    }
    console.log('context.auth.uid=', context.auth.uid);

    if (null == data) {
        data = {};
    }    

    // バリデート
    let valid = true;
    if ('string' !== typeof data.title) {
        valid = false;
        console.log('スルー1');
    }
    else if ('string' !== typeof data.body) {
        valid = false;
        console.log('スルー2');
    }
    else if ('string' !== typeof data.devicetoken) {
        valid = false;
        console.log('スルー3');
    }

    if (!valid) {
        console.log('invalid=', valid);
        throw new functions.https.HttpsError('invalid-argument', 'パラメータが要件を満たしていません');
    }

    const title = data.title.trim();
    const body = data.body.trim();
    const link = (data.link.trim()) || null;
    let targettoken = data.devicetoken.trim();
    if (-1 < targettoken.indexOf('@') && -1 < targettoken.indexOf('.')) {
        // 対象がメールアドレス
        const personsnap = await firestore.collection('persons').doc(targettoken).get();
        if (!personsnap.exists) {
            console.log('スルー');
            return true
        }
        // notificationsレコードを作成してそこからPushとする
        const notificationuid = firestore.collection('notifications').doc().id;
        let notification = {
            uid: notificationuid,
            label: '即時Push-' + new Date().toLocaleTimeString('ja-JP', { year: 'numeric', month: '2-digit', day: '2-digit', }),
            title: title,
            body: body,
            targetpersons: targettoken,
            targetdate: admin.firestore.FieldValue.serverTimestamp(),
            sendpersons: [],
            recivepersons: [],
            openpersons: [],
            notified: false,
            summarycount: 0,
            sendperseint: 0,
            reciveperseint: 0,
            openperseint: 0,
            registerdate: admin.firestore.FieldValue.serverTimestamp(),
            modifydate: admin.firestore.FieldValue.serverTimestamp(),
            available: true,                
        };
        if (link) {
            notification.link = link;
        }
        const res = await firestore.collection('notifications').doc(notificationuid).set(notification);
        console.log('res=', res);
        return true;
    }

    const payload = {
        data: {
            title: title,
            body: body,
        },
    };
    if (link) {
        payload.data.link = link;
    }
    console.log('payload=', payload);
    
    let sendres = await admin.messaging().sendToDevice(targettoken, payload, { priority: 'high' });
    console.log('sendres=', sendres);

    return true;
  });
  