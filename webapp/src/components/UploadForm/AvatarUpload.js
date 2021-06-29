import { useState } from "react";
import { Button, Container } from "react-bootstrap";
import { storage } from "../../config/firebase";
import { useAuth } from "../../contexts/AuthContext";
import EditIcon from "@material-ui/icons/Edit";

export default function AvatarUpload({ setError }) {
  const [file, setFile] = useState("");
  const { setUserData, userData } = useAuth();

  const [imagePreviewUrl, setImagePreviewUrl] = useState(
    userData.url ||
      "https://cdn2.iconfinder.com/data/icons/instagram-ui/48/jee-74-1024.png"
  );

  const types = ["image/png", "image/jpeg"];

  const photoUpload = (e) => {
    e.preventDefault();
    const reader = new FileReader();
    const file = e.target.files[0];

    if (!file) {
      return;
    }
    if (types.includes(file.type)) {
      reader.onloadend = () => {
        setFile(file);
        setImagePreviewUrl(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      return setError("Please select an image file (png or jpg)");
    }

    //generate ref to new img in database
    const storageRef = storage.ref(file.name);

    //upload img to storage
    storageRef
      .put(file)
      .then(async (snapshot) => {
        const existingUrl = userData.url;

        const newUrl = await storageRef.getDownloadURL();

        if (existingUrl) {
          //delete the previous avatar from the databse (if any)
          const prevRef = storage.refFromURL(existingUrl);
          prevRef
            .delete()
            .then(() => {
              console.log("Deleted");
            })
            .catch((err) => console.log(err));
        }

        //add the generated url to userData
        setUserData({ ...userData, url: newUrl });
        setFile(null);
      })
      .catch((error) => {
        console.log(error.message);
        setError(error.message);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    //generate ref to new img in database
    const storageRef = storage.ref(file.name);

    //upload img to storage
    storageRef
      .put(file)
      .then(async (snapshot) => {
        const existingUrl = userData.url;

        const newUrl = await storageRef.getDownloadURL();

        if (existingUrl) {
          //delete the previous avatar from the databse (if any)
          const prevRef = storage.refFromURL(existingUrl);
          prevRef
            .delete()
            .then(() => {
              console.log("Deleted");
            })
            .catch((err) => console.log(err));
        }

        //add the generated url to userData
        setUserData({ ...userData, url: newUrl });
        setFile(null);
      })
      .catch((error) => {
        console.log(error.message);
        setError(error.message);
      });
  };

  return (
    <div>
      <form>
        <Container className="d-flex align-items-top justify-content-center">
          <div>
            <img
              className="img img-wrap img-upload"
              htmlFor="photo-upload"
              src={imagePreviewUrl}
            />
          </div>
          <div>
            <label className="custom-file-upload" htmlFor="photo-upload">
              <EditIcon style={{ fill: "white" }} />
              <input
                id="photo-upload"
                className="hide"
                type="file"
                onChange={(e) => photoUpload(e)}
              />
            </label>
          </div>
        </Container>
        {file && (
          <Button type="submit" className="save">
            Set Avatar{" "}
          </Button>
        )}
      </form>
    </div>
  );
}
