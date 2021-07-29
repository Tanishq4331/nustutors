const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp();

exports.onDeleteRequest = functions.firestore
  .document("/requests/{id}")
  .onDelete((snap, context) => {
    const rid = context.params.id;
    const relevantApplications = admin
      .firestore()
      .collection("applications")
      .where("requestId", "==", rid);
    relevantApplications.get.then((querySnap) => {
      querySnap.forEach((doc) => doc.ref.delete());
    });
  });
