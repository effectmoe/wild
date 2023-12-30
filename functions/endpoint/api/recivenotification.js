const functions = require('firebase-functions');
const notification = require('../cron/notification');

process.env.TZ = 'Asia/Tokyo';
module.exports = functions.region('asia-northeast1').https.onRequest(async (request, response) => {
    response.set('Access-Control-Allow-Origin', '*');
    response.set('Access-Control-Allow-Headers', '*');
    response.set('Access-Control-Allow-Methods', 'GET, HEAD, OPTIONS, POST');

    console.log('request.body=', request.body);

    let data = null;
    try {
        data = JSON.parse(request.body);
    }
    catch (error) {
        console.error('error=', error);
        console.log('スルー0');
        response.status(200).end(false);
        return;
    }
    if (!data) {
        console.log('スルー1');
        response.status(200).end(false);
        return;
    }

    if (!data.nid) {
        console.log('スルー2');
        response.status(200).end(false);
        return;
    }
    if (!data.uid) {
        console.log('スルー3');
        response.status(200).end(JSON.stringify({ data: false }));
        return;
    }

    const notificationid = data.nid;
    const personuid = data.uid;

    const nsnap = await firestore.collection('notifications').doc(notificationid).get();
    if (!nsnap.exists) {
        console.log('スルー3');
        response.status(200).end(false);
        return;
    }
    const notification = nsnap.data();
    if (-1 < notification.recivepersons.indexOf(personuid)) {
        console.log('スルー4 一人複数台の端末を持っていると多重受信があり得るので無視');
        response.status(200).end(JSON.stringify({ data: true }));
        return;
    }

    await firestore.collection('notifications').doc(notificationid).update({recivepersons: admin.firestore.FieldValue.arrayUnion(personuid)});

    response.status(200).end(JSON.stringify({ data: true }));
    return;
})
