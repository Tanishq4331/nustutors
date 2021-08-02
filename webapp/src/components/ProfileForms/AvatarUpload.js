import { Container } from "react-bootstrap";
import { storage } from "../../config/firebase";
import { useAuth } from "../../contexts/AuthContext";
import EditIcon from "@material-ui/icons/Edit";
import styled from "styled-components";

const CustomFileUpload = styled.form`
  label {
    border-radius: 50%;
    display: inline-block;
    position: relative;
    top: 20px;
    left: -35px;
    padding: 6px;
    cursor: pointer;
    background: #007bff;
    margin-bottom: 15px;
    transition: 0.3s;
  }

  label:hover {
    background: #0c66c0;
    margin-bottom: 15px;
  }
`;

const ImageWrap = styled.img`
  position: relative;
  left: 30px;
  width: 250px;
  height: 250px;
  overflow: hidden;
  background: #0c66c0;
  padding: 4px;
  border-radius: 50%;
`;

export default function AvatarUpload() {
  const { setUserData, userData, setAlert, currentUser } = useAuth();

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
        uploadFile();
      };
      reader.readAsDataURL(file);
    } else {
      return setAlert({
        message: "Please select an image file (png or jpg)",
        success: false,
      });
    }

    const uploadFile = () => {
      //generate ref to new img in database
      const storageRef = storage.ref(`${currentUser.uid}/${file.name}`);

      //upload img to ref
      storageRef
        .put(file)
        .then(async (snapshot) => {
          const existingUrl = userData.url;

          const newUrl = await storageRef.getDownloadURL();

          if (existingUrl) {
            try {
              //delete the previous avatar from the databse (if any)
              const prevRef = storage.refFromURL(existingUrl);
              if (prevRef) {
                prevRef.delete().then(() => {
                  console.log("Deleted");
                });
              }
            } catch (error) {
              //Usually invalid when initial url is sourced from google instead of storage
              if (error.code !== "storage/invalid-argument") {
                console.log(`${error.code}: ${error.message}`);
              }
            }
          }

          //add the generated url to userData
          setUserData({ ...userData, url: newUrl });
          setAlert({ message: "Avatar successfully updated", success: true });
        })
        .catch((error) => {
          console.log(error.message);
          setAlert({
            message: error.message,
            success: false,
          });
        });
    };
  };

  return (
    <Container className="d-flex align-items-top justify-content-center">
      <div>
        <ImageWrap
          htmlFor="photo-upload"
          src={
            userData.url ||
            "https://cdn2.iconfinder.com/data/icons/instagram-ui/48/jee-74-1024.png"
          }
        />
      </div>
      <CustomFileUpload>
        <label htmlFor="photo-upload">
          <EditIcon style={{ fill: "white" }} />
          <input
            id="photo-upload"
            className="hide"
            type="file"
            onChange={(e) => photoUpload(e)}
          />
        </label>
      </CustomFileUpload>
    </Container>
  );
}
