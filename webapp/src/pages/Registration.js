import * as React from "react";
import { useState, useEffect } from "react";
import { Form, Container } from "react-bootstrap";
import LoginDetails from "../components/RegistrationForm/LoginDetails";
import PersonalDetails from "../components/RegistrationForm/PersonalDetails";
import { useAuth } from "../contexts/AuthContext";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";

import Qualifications from "../components/RegistrationForm/Qualifications";
import TutoringPreferences from "../components/RegistrationForm/TutoringPreferences";
import Confirmation from "../components/RegistrationForm/Confirmation";
import { useHistory } from "react-router-dom";
import Navigation from "../components/RegistrationForm/Navigation";
import {
  validatePage,
  errorPresent,
} from "../components/RegistrationForm/validation";

export default function Registration() {
  const { registerUser, registerTutor, setAlert, currentUser, userData } =
    useAuth();
  const history = useHistory();

  const userRegistrationComplete = userData;
  const tutorRegistrationComplete = userData && userData.registeredTutor;

  //if user has already completed user and tutor registration redirect them to dashboard
  if (tutorRegistrationComplete) {
    history.push("/");
  }

  const [activeStep, setActiveStep] = useState(0);
  const [errors, setErrors] = React.useState("");
  const [loading, setLoading] = useState(false);

  const [userFormState, setUserFormState] = useState({
    name: currentUser ? currentUser.displayName : "",
    email: currentUser ? currentUser.email : "",
    url: currentUser ? currentUser.photoURL : null,
    phone: "",
    dateOfBirth: null,
    password: "",
    passwordConfirm: "",
    availableForOnline: false,
    registeredTutor: false,
    locations: [false, false, false, false, false, false, false, false],
    yearOfStudy: "Year 1",
  });

  const [tutorFormState, setTutorFormState] = useState({
    modules: [],
    grades: [],
    experiences: "",
    documents: [],
  });

  const userSteps = [{ label: "Personal Details", form: PersonalDetails }];

  //prepend the login details step if user is not already authenticated through google
  if (!currentUser) {
    userSteps.unshift({ label: "Login Details", form: LoginDetails });
  }

  const tutorSteps = [
    { label: "Tutoring Preferences", form: TutoringPreferences },
    { label: "Qualifications", form: Qualifications },
  ];

  const steps = userRegistrationComplete
    ? tutorSteps
    : userSteps.concat(tutorSteps);

  const isLastUserStep = userSteps.length - 1 === activeStep;
  const isLastTutorStep = steps.length - 1 === activeStep;
  const isUserStep = userSteps.includes(steps[activeStep]);

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    //check which form the field belongs to determine which form to update
    if (isUserStep) {
      setUserFormState({ ...userFormState, [name]: value });
    } else {
      setTutorFormState({ ...tutorFormState, [name]: value });
    }
  };

  const handleCheckboxChange = (e) => {
    let index = e.target.name;
    const checked = e.target.checked;
    if (index == "availableForOnline") {
      setUserFormState({ ...userFormState, availableForOnline: checked });
    } else {
      index = parseInt(index);
      setUserFormState((prev) => {
        const newLocations = [
          ...prev.locations.slice(0, index),
          checked,
          ...prev.locations.slice(index + 1),
        ];
        return { ...prev, locations: newLocations };
      });
    }
  };

  //start actively validating the whole form when there are already errors
  useEffect(async () => {
    if (errorPresent(errors)) {
      const newErrors = await validatePage(
        steps[activeStep].label,
        userFormState
      );
      setErrors(newErrors);
    }
  }, [userFormState]);

  const onStepSubmit = async (action) => {
    setLoading(true);

    const combinedFormState = { ...userFormState, ...tutorFormState };

    const newErrors = await validatePage(
      steps[activeStep].label,
      combinedFormState
    );
    setErrors(newErrors);
    //if the current page is not valid do nothing;
    if (errorPresent(newErrors)) {
      setLoading(false);
      return;
    }
    try {
      switch (action) {
        case "Next":
          setActiveStep(activeStep + 1);
          break;
        case "TutorSubmit":
          if (!userRegistrationComplete) {
            await registerUser(userFormState);
          }
          await registerTutor(tutorFormState);
          setAlert({ message: "Registration successful", success: true });
          break;
        case "UserSubmit":
          await registerUser(userFormState);
          history.push("/");
          setAlert({
            message:
              "User Registration successful. You need to complete the tutor registration to teach.",
            success: true,
          });
      }
    } catch (error) {
      console.log(`${error.code}: ${error.message}`);
      setAlert({
        message: "An unknown error occurred. Please try again later.",
        success: false,
      });
    }
    setLoading(false);
  };

  const Progress = () => {
    return (
      <Container className="d-flex align-items-center justify-content-center">
        <div className="w-100" style={{ maxWidth: "1000px" }}>
          <Stepper activeStep={activeStep} alternativeLabel>
            {steps.map((step) => (
              <Step key={step.label}>
                <StepLabel>{step.label}</StepLabel>
              </Step>
            ))}
          </Stepper>
        </div>
      </Container>
    );
  };

  const FormPage = steps[activeStep].form;

  return (
    <>
      <div className="justify-content-center mb-5">
        <h2 className="text-center">
          {currentUser && "Complete"} Registration
        </h2>
      </div>

      <Progress />

      <Container
        className="d-flex justify-content-center mt-4"
        style={{ minHeight: "50vh" }}
      >
        {" "}
        <div className="w-100" style={{ maxWidth: "800px" }}>
          <Form onSubmit={(e) => e.preventDefault()} className="mb-3">
            <FormPage
              formState={isUserStep ? userFormState : tutorFormState}
              setFormState={isUserStep ? setUserFormState : setTutorFormState}
              handleChange={handleChange}
              errors={errors}
              handleCheckboxChange={handleCheckboxChange}
            />
          </Form>
          <hr />
          <Navigation
            activeStep={activeStep}
            setActiveStep={setActiveStep}
            steps={steps}
            isLastTutorStep={isLastTutorStep}
            isLastUserStep={isLastUserStep}
            onStepSubmit={onStepSubmit}
          />{" "}
        </div>
      </Container>
    </>
  );
}
