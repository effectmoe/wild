
const functions = require('firebase-functions');

process.env.TZ = 'Asia/Tokyo';
module.exports = functions.region('asia-northeast1').firestore.document('notifications/{notificationid}').onUpdate(async (snap, context) => {
    const uid = snap.after.id;
    console.log('uid=', uid);
    const beforedata = snap.before.data();
    const afterdata = snap.after.data();
    if (!('undefined' != typeof afterdata.notified && true === afterdata.notified)) {
        // 配信が完了していないので集計出来ない
        console.log('配信が完了していないので集計出来ない');
        return true;
    }
    if (beforedata.summarycount !== afterdata.summarycount) {
        // サマリー処理直後なので循環参照
        console.log('サマリー処理直後なので循環参照');
        return true;
    }
    if (afterdata.targetpersons.trim() == '全配信') {
        // 全配信は集計出来ない
        console.log('全配信は集計出来ない');
        return true;
    }

    const targetpersons = afterdata.targetpersons.trim().split('\n');
    // 送信率
    const sendperseint = (afterdata.sendpersons.length / targetpersons.length) * 100;
    // 到達率
    let recivecnt = 0;
    for (let sidx=0; sidx < afterdata.sendpersons.length; sidx++) {
        const sendperson = afterdata.sendpersons[sidx].trim();
        if (-1 < afterdata.recivepersons.indexOf(sendperson)) {
            recivecnt++; 
        }
    }
    const reciveperseint = (recivecnt / afterdata.sendpersons.length) * 100;
    // 開封率
    let opencnt = 0;
    for (let sidx=0; sidx < afterdata.sendpersons.length; sidx++) {
        const sendperson = afterdata.sendpersons[sidx].trim();
        if (-1 < afterdata.openpersons.indexOf(sendperson)) {
            opencnt++; 
        }
    }
    const openperseint = (opencnt / afterdata.sendpersons.length) * 100;

    await firestore.collection('notifications').doc(uid).update({ summarycount: admin.firestore.FieldValue.increment(1), sendperseint: sendperseint, reciveperseint: reciveperseint, openperseint: openperseint, });
    const targetday = new Date().toLocaleDateString('ja-JP', { year: 'numeric', month: '2-digit', day: '2-digit', }).replace('/', '-').replace('/', '-');
    await firestore.collection('summary').doc(uid + '-' + targetday).set({ label: afterdata.label, targetuid: uid, targetday: targetday, openperseint: openperseint, }, { merge: true });
    return true;
});
  