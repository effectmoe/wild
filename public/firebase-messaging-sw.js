
const projectid = 'wild-cb814';
const apikey = 'AIzaSyC3VDS0cUCsLr-tLDjqA-Pf9Qub4OQfAEs';
const senderid = '182484139607';
const appid = '1:182484139607:web:2dbb900e9bad1469aeed12';
const recivenotification = 'https://asia-northeast1-' + projectid + '.cloudfunctions.net/recivenotification';
const opennotification = 'https://asia-northeast1-' + projectid + '.cloudfunctions.net/opennotification';

importScripts("https://www.gstatic.com/firebasejs/8.10.1/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/8.10.1/firebase-messaging.js");

firebase.initializeApp({
  apiKey: apikey,
  authDomain: projectid + '.firebaseapp.com',
  projectId: projectid,
  storageBucket: projectid + '.appspot.com',
  messagingSenderId: senderid,
  appId: appid
});
const messaging = firebase.messaging();

messaging.onBackgroundMessage(async (payload) => {


  // iPhoneにバッジ通知をつける（①）
  navigator.setAppBadge(1);



  console.log(
    "[firebase-messaging-sw.js] Received background message ",
    payload
  );
  const notificationTitle = payload.data?.title;
  const notificationOptions = {
    body: payload.data?.body,
    icon: payload.data?.image,
    data: payload.data,
  };
  if (payload.data?.nid && payload.data?.uid) {
    await fetch(recivenotification, { mode: 'no-cors', method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ nid: payload.data.nid, uid: payload.data.uid, }) });
  }
  self.registration.showNotification(notificationTitle, notificationOptions);
});


// ノーティフィケーションカードをクリックしてバッジ通知を消すコマンド一式
self.addEventListener('notificationclick', async (event) => {
  console.log('click notify', event);
  if (event.notification.data && event.notification.data.nid && event.notification.data.uid) {
    await fetch(opennotification, { mode: 'no-cors', method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ nid: event.notification.data.nid, uid: event.notification.data.uid, }) });
  }
  event.notification.close();
  // リンクを起動
  if (event.notification.data.link) {
    event.waitUntil(self.clients.openWindow(event.notification.data.link));
  }
  else {
    event.waitUntil(self.clients.openWindow('/'));
  }
});


// アプリにアクセスしてバッジ通知を消すコマンド一式
if ('object' == typeof notification && notification) {
  notification.close();
}

console.log('load page');