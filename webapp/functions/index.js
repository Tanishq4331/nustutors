const functions = require("firebase-functions");
const admin = require("firebase-admin");

admin.initializeApp();

//delete all applications for a request that has been deleted
exports.onDeleteRequest = functions.firestore
  .document("/requests/{id}")
  .onDelete((snap, context) => {
    const rid = context.params.id;
    const relevantApplications = admin
      .firestore()
      .collection("applications")
      .where("requestId", "==", rid);
    return relevantApplications.get().then((querySnap) => {
      querySnap.forEach((doc) => doc.ref.delete());
    });
  });

//if an application is deleted remove the requestId that it corresponds to from applications of the tutor
exports.onDeleteApplication = functions.firestore
  .document("/applications/{id}")
  .onDelete((snap, context) => {
    const applicationId = context.params.id;
    const requestId = snap.data().requestId;

    //tutor whose appllication was deleted
    const relevantUserId = admin
      .firestore()
      .collection("applications")
      .doc(applicationId)
      .get()
      .then((doc) => doc.data().tutorId);

    return admin
      .firestore()
      .collection("applications")
      .doc(relevantUserId)
      .update({
        applications: admin.firestore.FieldValue.arrayRemove(requestId),
      });
  });

//custom feed for each user
//if someone applies to their request
//if someone accepts their application


//set verifiedToTrue if user uploads documents
