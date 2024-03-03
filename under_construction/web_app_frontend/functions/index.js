const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp();

// Removed the unused imports to resolve 'no-unused-vars' errors
// const { onRequest } = require("firebase-functions/v2/https");
// const logger = require("firebase-functions/logger");

exports.addAdminRole = functions.https.onCall((data, context) => {
  // Check if the request is made by an authenticated user
  if (!context.auth) {
    throw new functions.https.HttpsError("unauthenticated",
        "The function must be called while authenticated.");
  }

  // Optionally, check if the requesting user is an admin
  // if (context.auth.token.admin !== true) {
  //   throw new functions.https.HttpsError("permission-denied",
  //  "Only admins can add other admins");
  // }

  // Set custom user claim (admin)
  return admin.auth().getUserByEmail(data.email)
      .then((user) => admin.auth().setCustomUserClaims(user.uid, {admin: true}))
      .then(() => ({message: `Success! ${data.email} has been made an admin.`}))
      .catch((error) => ({error: error.message}));
});

// Removed the commented-out example function to clean up the file
