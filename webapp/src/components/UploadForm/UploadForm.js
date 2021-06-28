import React, { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { db, storage } from "../../config/firebase";
import { Form, Card, Alert, Button } from "react-bootstrap";

const UploadForm = () => {
  const { currentUser } = useAuth();
  const [error, setError] = useState(null);

  const types = ["image/png", "image/jpeg"];

  const handleChange = (e) => {
    const file = e.target.files[0];

    if (file && types.includes(file.type)) {
      const storageRef = storage.ref(file.name);
      storageRef
        .put(file)
        .then(async (snapshot) => {
          const url = await storageRef.getDownloadURL();
          db.collection("users").doc(currentUser.uid).update({ url: url });
        })
        .catch((error) => {
          console.log(error.message);
          setError(error.message);
        });
    } else {
      setError("Please select an image file (png or jpg)");
    }
  };

  return (
    <Form>
      <Form.Group>
        <Form.File
          className="position-relative"
          required
          name="file"
          label="Upload Avatar"
          onChange={handleChange}
          isInvalid={!!error}
          feedback={error}
          feedbackTooltip
        />
      </Form.Group>
    </Form>
  );
};

export default UploadForm;
