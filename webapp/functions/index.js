const functions = require("firebase-functions");
const admin = require("firebase-admin");

admin.initializeApp();
const db = admin.firestore();

//delete all applications for a request that has been deleted
exports.onDeleteRequest = functions.firestore
  .document("/requests/{id}")
  .onDelete((snap, context) => {
    const rid = context.params.id;
    const relevantApplications = db
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
    const requestId = snap.data().requestId;
    const tutorId = snap.data().tutorId;

    return db
      .collection("users")
      .doc(tutorId)
      .update({
        applications: admin.firestore.FieldValue.arrayRemove(requestId),
      });
  });

// Add an attribute to all documents in a given collection.
exports.addField = functions.https.onCall((data, context) => {
  const { collection, attribute, value } = data;
  console.log(collection, attribute);
  console.log(`value: ${value}`);
  return db
    .collection(collection)
    .get()
    .then(function (querySnapshot) {
      querySnapshot.forEach(function (doc) {
        console.log(value);
        doc.ref.update({
          [attribute]: value,
        });
      });
    });
});

// Delete an attribute from all documents in a given collection.
exports.addField = functions.https.onCall((data, context) => {
  const { collection, attribute } = data;
  console.log(collection, attribute);
  return db
    .collection(collection)
    .get()
    .then(function (querySnapshot) {
      querySnapshot.forEach(function (doc) {
        doc.ref.update({
          [attribute]: admin.firestore.FieldValue.delete(),
        });
      });
    });
});

//custom feed for each user
//if someone applies to their request
//if someone accepts their application

//set verifiedToTrue if user uploads documents
