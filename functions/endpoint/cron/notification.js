
const functions = require('firebase-functions');

process.env.TZ = 'Asia/Tokyo';
module.exports = functions.region('asia-northeast1').runWith({ timeoutSeconds: 540, /*memory: '2GB'*/ }).pubsub.schedule('every 1 minutes').timeZone('Asia/Tokyo').onRun(async (context) => {
    let now = new Date();
    console.log('now date=', now);
    let nsnaps = await firestore.collection('notifications').where('targetdate', '<=', now).where('notified', '==', false).where('available', '==', true).orderBy('targetdate', 'asc').limit(1).get();
    if (0 >= nsnaps.size) {
        console.log('対象のお知らせナシ');
        return true;
    }

    //Notification.timestamp 通知が生成されたとき、または適用されるとき (過去、現在、未来) の時刻を示す
    const dts = Math.floor(Date.now());



    for (let nidx = 0; nidx < nsnaps.size; nidx++) {
        const notification = nsnaps.docs[nidx].data();
        const targetnotification = notification.uid;
        if (notification.targetpersons.trim() == '全配信') {
            let payload = {
                data: {
                    timestamp: notification.timestamp,
                    title: notification.title,
                    body: notification.body,
                    image: notification.image
                },
            };
            if (notification.link) {
                payload.data.link = notification.link;
            }
            console.log('send all payload=', payload);
            // ここから本反映処理
            const res = await (() => new Promise(function (resolve) {
                firestore.runTransaction(async function (transaction) {
                    let sendres = await admin.messaging().sendToTopic('all', payload, { priority: 'high' });
                    console.log('sendres=', sendres);
                    // 通知済みに更新
                    await transaction.update(firestore.collection('notifications').doc(targetnotification), { notified: true, modifydate: admin.firestore.FieldValue.serverTimestamp(), });
                    return Promise.resolve(true);
                })
                    .then(function (result) {
                        resolve(result);
                    })
                    .catch(function (error) {
                        console.error('trans error', error);
                        resolve(false);
                    });
            }))();
            console.log('allsend res=', res);
        }
        else {
            const targetpersons = notification.targetpersons.trim().split('\n');
            for (let uidx = 0; uidx < targetpersons.length; uidx++) {
                const email = targetpersons[uidx].trim();
                let psnap = await firestore.collection('persons').doc(email).get();
                if (!psnap.exists) {
                    continue;
                }
                const person = psnap.data();
                if (!(person.devicetokens instanceof Array && 0 < person.devicetokens.length)) {
                    continue;
                }
                const targettokens = person.devicetokens;
                let payload = {
                    // XXX notificationを使うとカスタムPush表示の際に2重で同じ通知が表示されてしまう！(バグではなくブラウザの仕様)
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
                    // カスタムPushの場合はdataだけを通知する
                    data: {
                        title: notification.title,
                        body: notification.body,
                        nid: targetnotification,
                        uid: email,
                        timestamp: notification.timestamp,
                        image: notification.image
                    },
                };
                if (notification.link) {
                    payload.data.link = notification.link;
                }
                console.log('send target payload=', payload);
                // ここから本反映処理
                const res = await (() => new Promise(function (resolve) {
                    firestore.runTransaction(async function (transaction) {
                        let sendres = await admin.messaging().sendToDevice(targettokens, payload, { priority: 'high' });
                        console.log('sendres=', sendres);
                        // 通知済みに更新
                        await transaction.update(firestore.collection('notifications').doc(targetnotification), { sendpersons: admin.firestore.FieldValue.arrayUnion(email), modifydate: admin.firestore.FieldValue.serverTimestamp(), });
                        return Promise.resolve(true);
                    })
                        .then(function (result) {
                            resolve(result);
                        })
                        .catch(function (error) {
                            console.error('trans error', error);
                            resolve(false);
                        });
                }))();
                console.log(uidx + ' res=', res);
            }
            // 通知済みに更新
            await firestore.collection('notifications').doc(targetnotification).update({ notified: true, modifydate: admin.firestore.FieldValue.serverTimestamp(), });
        }
    }
    return true;
});
