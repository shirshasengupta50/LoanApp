var admin = require("firebase-admin");

var serviceAccount = require("../utils/creditsea-eafea-firebase-adminsdk-fbsvc-c3fc871c3c.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

module.exports = admin;
