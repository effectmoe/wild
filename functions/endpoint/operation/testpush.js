
const functions = require('firebase-functions');

process.env.TZ = 'Asia/Tokyo';
module.exports = functions.region('asia-northeast1').https.onRequest(async (request, response) => {
    response.set('Access-Control-Allow-Origin', '*');
    response.set('Access-Control-Allow-Headers', '*');
    response.set('Access-Control-Allow-Methods', 'GET, HEAD, OPTIONS, POST');

    console.log('request.body=', request.body);

    if (!request.body.nid) {
        console.log('スルー1');
        response.status(200).end(false);
        return;
    }
    if (!request.body.uid) {
        console.log('スルー2');
        response.status(200).end(false);
        return;
    }

    // if (!(request && request.headers.host.indexOf('localhost'))) {
    //     response.status(403).end('access error')
    // }

    const targettoken = 'dnGeUWOglsP8sZxQ2b1Jc0:APA91bG7Zam61jysLU_g0ijROgo6cKqmn86WDEQEiKrbi9ANjRikOAsVthLe2mUqWike_QpPxA84_gepKFy2G9pbUjBUwgkOoDfAbq5RgW52TTiZGhSkTR5Y5WvBB9yZlztfM8ffHDZW';
    const payload = {
        // notification: {
        //     title: notification.title,
        //     body: notification.body,
        //     badge: '1',
        //     sound: 'default',
        //     // data: {
        //     //     notification: targetnotification,
        //     //     nid: targetnotification,
        //     //     uid: email,
        //     // },
        // },
        // data: {
        //     notification: targetnotification,
        //     nid: targetnotification,
        //     uid: email,
        // },
        data: {
            title: 'test7',
            body: 'is??',
            // nid: targetnotification,
            // uid: email,
            link: '/resume.html',
        },
    };
    console.log('payload=', payload);    
    
    let sendres = await admin.messaging().sendToDevice(targettoken, payload, { priority: 'high' });
    console.log('sendres=', sendres);

    response.status(200).end('success!')
  });
  