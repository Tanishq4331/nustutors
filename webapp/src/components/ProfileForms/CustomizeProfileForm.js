import { Form, Container, Button } from "react-bootstrap";
import { useAuth } from "../../contexts/AuthContext";
import { useState, useEffect } from "react";
import PersonalDetails from "../RegistrationForm/PersonalDetails";
import Qualifications from "../RegistrationForm/Qualifications";
import LocationPreferences from "../RegistrationForm/LocationPreferences";
import TutoringPreferences from "../RegistrationForm/TutoringPreferences";
import { validatePage, errorPresent } from "../RegistrationForm/validation";
import ChangeAccountDetails from "./ChangeAccountDetails";
import { makeStyles } from "@material-ui/core/styles";
import { Tabs, Tab } from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
import Loading from "../Loading/Loading";

export default function CustomizeProfileForm() {
  const { userData, setUserData, setAlert, currentUser, uploadDocuments } =
    useAuth();
  const [errors, setErrors] = useState("");
  const [currTab, setCurrTab] = useState(0);
  const [loading, setLoading] = useState(false);
  const [formState, setFormState] = useState({ ...userData, documents: [] });
  const [provider, setProvider] = useState("");
  const [changesMade, setChangesMade] = useState(true);

  useEffect(() => {
    const { documents, ...formData } = formState;

    //ordering of data needs to be the same (including ordering of data in arrays, attributes in objects)
    setChangesMade(
      Boolean(
        JSON.stringify(formData) !== JSON.stringify(userData) ||
          (documents && documents.length)
      )
    );
  }, [formState, userData]);

  useEffect(() => setFormState({ ...userData, documents: [] }), []);

  //set the provider state to the sign in provider
  useEffect(() => {
    currentUser
      .getIdTokenResult()
      .then((idToken) => {
        setProvider(idToken.signInProvider);
      })
      .catch((error) => {
        console.log(`${error.code}: ${error.message}`);
      });
  }, []);

  const tabData = [
    { label: "Personal Details", form: PersonalDetails },
    { label: "Location and Timing Preferences", form: LocationPreferences },
  ];

  if (provider === "password") {
    tabData.unshift({
      label: "Account Details",
      form: ChangeAccountDetails,
    });
  }

  if (userData.registeredTutor) {
    tabData.push(
      ...[
        { label: "Tutoring Preferences", form: TutoringPreferences },
        { label: "Qualifications", form: Qualifications },
      ]
    );
  }

  const currTabData = tabData[currTab];

  const handleTabChange = (event, newValue) => {
    //changing tabs without saving undoes the changes
    setFormState({ ...userData });
    setCurrTab(newValue);
  };

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setFormState({ ...formState, [name]: value });
  };

  //only user registration steps use checkboxes so far
  const handleCheckboxChange = (e) => {
    let name = e.target.name;
    const checked = e.target.checked;
    setFormState({ ...formState, [name]: checked });
  };

  //start actively validating the whole form when there are already errors
  useEffect(async () => {
    if (errorPresent(errors)) {
      const newErrors = await validatePage(currTabData.label, formState);
      setErrors(newErrors);
    }
  }, [formState]);

  const onSubmit = async (action) => {
    setLoading(true);

    const newErrors = await validatePage(currTabData.label, formState);
    setErrors(newErrors);
    //if the current page is not valid do nothing;
    if (errorPresent(newErrors)) {
      //error in timings, locations shown as alert
      if (newErrors.locations) {
        setAlert({ message: newErrors.locations, success: false });
      } else if (newErrors.timings) {
        setAlert({ message: newErrors.timings, success: false });
      }

      setLoading(false);
      return;
    }

    const { documents, ...data } = formState;

    if (documents) {
      console.log("uploading documents");
      await uploadDocuments(documents, currentUser.uid);
      setFormState({ ...data, documents: [] });
    }

    setUserData(data);
    setAlert({
      message: `Profile successfully updated`,
      success: true,
    });

    setLoading(false);
  };

  const FormPage = currTabData.form;

  return (
    <>
      <Loading loading={loading} />
      <Container
        className="d-flex justify-content-center"
        style={{ minHeight: "50vh" }}
      >
        <div className="w-100" style={{ maxWidth: "900px" }}>
          <Tabs
            value={currTab}
            indicatorColor="primary"
            textColor="primary"
            onChange={handleTabChange}
            aria-label="disabled tabs example"
            variant="fullWidth"
          >
            {tabData.map((tab, index) => {
              return <Tab key={index} label={tab.label} />;
            })}
          </Tabs>

          <Form onSubmit={(e) => e.preventDefault()} className="mb-3 mt-5">
            <FormPage
              formState={formState}
              setFormState={setFormState}
              handleChange={handleChange}
              errors={errors}
              handleCheckboxChange={handleCheckboxChange}
            />
          </Form>
          {currTabData.label !== "Account Details" && (
            <>
              {changesMade && (
                <Alert severity="info" color="info">
                  Please save your changes before moving to another tab.
                </Alert>
              )}
              <hr />
              <Button onClick={onSubmit} disabled={!changesMade}>
                Save
              </Button>
            </>
          )}
        </div>
      </Container>
    </>
  );
}
