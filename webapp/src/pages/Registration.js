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
import { validatePage, errorPresent } from "../components/RegistrationForm/validation";

export default function Registration() {
  const { register, setAlert, currentUser, userData } = useAuth();
  const history = useHistory();

  //if user has already completed registration redirect them to dashboard
  if (userData) {
    history.push("/");
  }

  const [activeStep, setActiveStep] = useState(0);
  const [errors, setErrors] = React.useState("");
  const [loading, setLoading] = useState(false);

  const [formState, setFormState] = useState({
    name: currentUser ? currentUser.displayName : "",
    email: currentUser ? currentUser.email : "",
    url: currentUser ? currentUser.photoURL : null,
    phone: "",
    dateOfBirth: null,
    password: "",
    passwordConfirm: "",
    availableForOnline: false,
    tutor: null,
    locations: [false, false, false, false, false, false, false, false],
    yearOfStudy: "Year 1",
    modules: [],
  });

  const steps = [
    { label: "Personal Details", form: PersonalDetails },
    { label: "Qualifications", form: Qualifications },
    { label: "Tutoring Preferences", form: TutoringPreferences },
    { label: "Confirmation", form: Confirmation },
  ];

  //prepend the login details step if user is not already authenticated through google
  if (!currentUser) {
    steps.unshift({ label: "Login Details", form: LoginDetails });
  }

  const isLastStep =  steps.length - 1 === activeStep;

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setFormState({ ...formState, [name]: value });
  };

  const handleCheckboxChange = (e) => {
    let index = e.target.name;
    const checked = e.target.checked;
    if (index == "availableForOnline") {
      setFormState({ ...formState, availableForOnline: checked });
    } else {
      index = parseInt(index);
      setFormState((prev) => {
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
      const newErrors = await validatePage(steps[activeStep].label, formState);
      setErrors(newErrors);
    }
  }, [formState]);
  

  const onStepSubmit = async () => {
    setLoading(true);
    const newErrors = await validatePage(steps[activeStep].label, formState);
    setErrors(newErrors);

    //if the current page is not valid do nothing;
    if (errorPresent(newErrors)) {
      setLoading(false);
      return;
    }

    //move to next step
    setActiveStep(() => Math.min(activeStep + 1, steps.length - 1));

    //submit at the final page
    if (isLastStep && !errorPresent(newErrors)) {
      try {
        await register(formState);
        setAlert({ message: "Registration successful", success: true });
      } catch (error) {
        console.log(`${error.code}: ${error.message}`);
        setAlert({
          message: "An unknown error occurred. Please try again later.",
          success: false,
        });
      }
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
          <Form className="mb-5">
            <FormPage
              formState={formState}
              setFormState={setFormState}
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
            isLastStep={isLastStep}
            onStepSubmit={onStepSubmit}
          />{" "}
        </div>
      </Container>
    </>
  );
}
