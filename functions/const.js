
// 環境変数をGlobalにしまう
global.genv = JSON.parse(process.env.FIREBASE_CONFIG);

global.production = true;

global.funcs = {
  notification: './endpoint/cron/notification',
  recivenotification: './endpoint/api/recivenotification',
  opennotification: './endpoint/api/opennotification',
  synconupdatenotifications: './endpoint/event/synconupdatenotifications',
  synconwritetokens: './endpoint/event/synconwritetokens',
  synconcreatepersons: './endpoint/event/synconcreatepersons',
  testpush: './endpoint/operation/testpush',
  quickpush: './endpoint/api/quickpush',
};

global.allowIPs = [
];

global.BASIC_AUTHORS = {
};

// 最高権限UID一覧
global.superuseruids = [
  // XXX 書き換え用
  'QxEQhYJVEBUGxSx6CuSZVWCb2cb2',
];

//const _key = CryptoJS.PBKDF2('super-pwa-secret', 'super-pwa-secret-generate-2023-08-28', {keySize: 4, iterations: 500})
global.aeskey = 'Wq1qVU1bliytbIZOQsEguw==';

// 今回はsuperpwa20230828を16進数に変換
//const _iv = CryptoJS.enc.Hex.parse('73757065727077613230323330383238')
global.aesiv = 'c3VwZXJwd2EyMDIzMDgyOA==';

// テスト環境振り分け
if (-1 < global.genv.projectId.indexOf('test')
  || -1 < global.genv.projectId.indexOf('-dev')
  || -1 < global.genv.projectId.indexOf('dev-')
  || -1 < global.genv.projectId.indexOf('development')) {

  // テスト環境用の設定
  global.production = false;
}
