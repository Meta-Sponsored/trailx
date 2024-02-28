/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */
const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();
const {onRequest} = require("firebase-functions/v2/https");
const logger = require("firebase-functions/logger");


exports.addAdminRole = functions.https.onCall((data, context) => {
    // Check if the request is made by an authenticated user
    if (!context.auth) {
      throw new functions.https.HttpsError('unauthenticated', 'The function must be called while authenticated.');
    }
  
    // Optionally, check if the requesting user is an admin
    // if (context.auth.token.admin !== true) {
    //   throw new functions.https.HttpsError('permission-denied', 'Only admins can add other admins');
    // }
  
    // Set custom user claim (admin)
    return admin.auth().getUserByEmail(data.email)
      .then(user => {
        return admin.auth().setCustomUserClaims(user.uid, { admin: true });
      })
      .then(() => {
        return { message: `Success! ${data.email} has been made an admin.` };
      })
      .catch(error => {
        return { error: error.message };
      });
  });
// Create and deploy your first functions
// https://firebase.google.com/docs/functions/get-started

// exports.helloWorld = onRequest((request, response) => {
//   logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
