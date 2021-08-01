const assert = require("assert");
const firebase = require("@firebase/testing");

const MY_PROJECT_ID = "nus-tutors";
const myAuth = { uid: "dummy" };

const db = firebase
  .initializeTestApp({ projectId: MY_PROJECT_ID, auth: myAuth })
  .firestore();

describe("Web app", () => {
  it("Can read items in read-only collection", async () => {
    const testDoc = db.collection("requests").doc("testDoc");
    await firebase.assertSucceeds(testDoc.get());
  });
  it("Can update a request when logged in as tutee", async () => {
    await db
      .collection("requests")
      .doc("test_request")
      .update({
        rejectedAppications:
          firebase.firestore.FieldValue.arrayUnion("added a new value"),
      });
  });
  it("Can add a field to a firebase doc", async () => {
    var addField = firebase.functions().httpsCallable("addField");
    const testDoc = db.collection("users").doc("dummy");

    await testDoc.set({
      name: "dummy",
    });

    await addField({
      collection: "users",
      attribute: "rejectedApplications",
      value: [],
    });

    await firebase.assertSucceeds(
      testDoc.get().then((doc) => doc.data().value.length === 0)
    );
  });
});
