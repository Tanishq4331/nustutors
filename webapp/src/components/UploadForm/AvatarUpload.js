import { useState } from "react";
import { Button } from "react-bootstrap";
import { storage } from "../../config/firebase";
import { useAuth } from "../../contexts/AuthContext";

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
      setError("Please select an image file (png or jpg)");
    }
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
        setFile(null)
      })
      .catch((error) => {
        console.log(error.message);
        setError(error.message);
      });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="photo-upload" className="custom-file-upload fas">
          <div className="img-wrap img-upload">
            <img className="img" htmlFor="photo-upload" src={imagePreviewUrl} />
          </div>
          <input
            id="photo-upload"
            className="hide"
            type="file"
            onChange={(e) => photoUpload(e)}
          />
        </label>
        {file && (
          <Button type="submit" className="save">
            Set Avatar{" "}
          </Button>
        )}
      </form>
    </div>
  );
}
