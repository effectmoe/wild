/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

// Create and deploy your first functions
// https://firebase.google.com/docs/functions/get-started

// exports.helloWorld = onRequest((request, response) => {
//   logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

require('./const');
require('./firebase');

// Functions読み込み
loadFunctions = (funcsObj) => {
  for(let name in funcsObj){
    if(! process.env.FUNCTION_NAME || process.env.FUNCTION_NAME === name) {
      exports[name] = require(funcsObj[name])
    }
  }
}

// 実行
loadFunctions(funcs)
console.log('exports:', exports)
