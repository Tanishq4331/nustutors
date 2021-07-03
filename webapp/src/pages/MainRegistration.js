import * as React from "react";
import { useState, useEffect } from "react";
import { Form, Button, Card, Container, Row, Col } from "react-bootstrap";

import LoginDetails from "../components/RegistrationForm/LoginDetails";
import PersonalDetails from "../components/RegistrationForm/PersonalDetails";
import { useAuth } from "../contexts/AuthContext";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import {
  accountValidation,
  personalValidation,
} from "../components/RegistrationForm/validators";
import Qualifications from "../components/RegistrationForm/Qualifications";
import TutoringPreferences from "../components/RegistrationForm/TutoringPreferences";
import Confirmation from "../components/RegistrationForm/Confirmation";
import zIndex from "@material-ui/core/styles/zIndex";

export default function Registration() {
  console.log("registration re-rending");
  const { register, setAlert } = useAuth();
  const [activeStep, setActiveStep] = useState(0);
  const [errors, setErrors] = React.useState("");
  const [loading, setLoading] = useState(false);

  const [formState, setFormState] = useState({
    name: "",
    phone: "",
    email: "",
    dateOfBirth: null,
    password: "",
    passwordConfirm: "",
    availableForOnline: false,
    tutor: null,
    locations: [false, false, false, false, false, false, false, false],
  });

  const steps = [
    { label: "Login Details", form: LoginDetails },
    { label: "Personal Details", form: PersonalDetails },
    { label: "Qualifications", form: Qualifications },
    { label: "Tutoring Preferences", form: TutoringPreferences },
    { label: "Confirmation", form: Confirmation },
  ];

  const lastStepIndex = steps.length - 1;
  const isLastStep = lastStepIndex === activeStep;

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

  //returns an error object
  const validatePage = () => {
    switch (steps[activeStep].label) {
      case "Personal Details":
        return personalValidation(
          formState.name,
          formState.phone,
          formState.dateOfBirth
        );
      case "Login Details":
        return accountValidation(
          formState.email,
          formState.password,
          formState.passwordConfirm
        );
      case "Confirmation":
        return "";
    }
  };

  const errorPresent = (errors) => Object.values(errors).some((x) => x !== "");

  useEffect(async () => {
    //only actively validate the whole form where there are already errors
    if (errorPresent(errors)) {
      const newErrors = await validatePage();
      setErrors(newErrors);
    }
  }, [formState]);

  const onStepSubmit = async () => {
    setLoading(true);
    const newErrors = await validatePage();
    setErrors(newErrors);

    //if the current page is not valid do nothing;
    if (errorPresent(newErrors)) {
      setLoading(false);
      return;
    }

    //move to next step
    setActiveStep(() => Math.min(activeStep + 1, lastStepIndex));

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

  const onPrevClick = React.useCallback(
    (event) => {
      event.preventDefault();
      setActiveStep(() => Math.max(activeStep - 1, 0));
    },
    [activeStep, setActiveStep]
  );

  const onSkipClick = React.useCallback(
    (event) => {
      event.preventDefault();
      setActiveStep(() => steps.length - 1);
    },
    [steps, setActiveStep]
  );

  const FormPage = steps[activeStep].form;

  const BackButton = () => {
    if (activeStep !== 0) {
      return (
        <Button style={{ marginRight: "16px" }} onClick={onPrevClick}>
          Previous
        </Button>
      );
    } else {
      return null;
    }
  };

  const NextButton = () => {
    return (
      <Button primary={true} disabled={loading} onClick={onStepSubmit}>
        {isLastStep ? "Submit" : "Next"}
      </Button>
    );
  };

  const SkipButton = () => {
    if (activeStep > 1 && !isLastStep) {
      return (
        <Button style={{ marginRight: "16px" }} onClick={onSkipClick}>
          Skip Tutor Registration
        </Button>
      );
    } else {
      return null;
    }
  };

  const Progress = () => {
    return (
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((step) => (
          <Step key={step.label}>
            <StepLabel>{step.label}</StepLabel>
          </Step>
        ))}
      </Stepper>
    );
  };

  const Navigation = () => {
    return (
      <div>
        <Row>
          <Col>
            {/* <divstyle={{float: "right"}}> */}
            <BackButton />
          </Col>
          <Col>
            <SkipButton />
          </Col>
          <Col>
            <div style={{ float: "right" }}>
              <NextButton />
            </div>
          </Col>
        </Row>
      </div>
    );
  };

  return (
    <>
      <div className="justify-content-center mb-5">
        <h2 className="text-center">Registration</h2>
      </div>

      <Container className="d-flex align-items-center justify-content-center">
        <div className="w-100" style={{ maxWidth: "1000px" }}>
          <Progress />
        </div>
      </Container>

      <Container
        className="d-flex justify-content-center mt-4"
        style={{ minHeight: "50vh" }}
      >
        {" "}
        <div className="w-100" style={{ maxWidth: "800px" }}>
          <Form className="mb-5">
            <FormPage
              formState={formState}
              handleChange={handleChange}
              errors={errors}
              handleCheckboxChange={handleCheckboxChange}
            />
          </Form>
          <hr />
          <Navigation />{" "}
        </div>
      </Container>
    </>
  );
}
