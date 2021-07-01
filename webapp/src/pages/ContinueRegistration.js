import * as React from "react";
import { useState, useEffect } from "react";
import { Form, Button, Card, Container, Row, Col } from "react-bootstrap";
import { db } from "../config/firebase";

import LoginDetails from "../components/UserForm/LoginDetails";
import PersonalDetails from "../components/UserForm/PersonalDetails";
import { useAuth } from "../contexts/AuthContext";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import {
  accountValidation,
  personalValidation,
} from "../components/UserForm/validators";
import Qualifications from "../components/UserForm/Qualifications";
import TutoringPreferences from "../components/UserForm/TutoringPreferences";
import Confirmation from "../components/UserForm/Confirmation";
import { useHistory } from "react-router-dom";

export default function ContinueRegistration() {
  const { register, setAlert, currentUser, userData } = useAuth();
const history = useHistory();

  //if user has already completed registration
  if (userData) {
    history.push("/");
  }

  const [activeStep, setActiveStep] = useState(0);
  const [errors, setErrors] = React.useState("");
  const [loading, setLoading] = useState(false);

  const [formState, setFormState] = useState({
    name: currentUser.displayName,
    phone: "",
    email: currentUser.email,
    dateOfBirth: null,
    tutor: null,
    url: currentUser.photoURL,
  });

  const steps = [
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

  //returns an error object
  const validatePage = () => {
    switch (steps[activeStep].label) {
      case "Personal Details":
        return personalValidation(
          formState.name,
          formState.phone,
          formState.dateOfBirth
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
        await db.collection("users").doc(currentUser.uid).set(formState);
        history.push("/");
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
    if (activeStep > 0 && !isLastStep) {
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
      <div className={"align-items-center justify-content-center"}>
        <div className={"align-items-center mb-3"}>
          <span>
            Step {activeStep + 1} of {steps.length}
          </span>
        </div>
        <div>
          <Row>
            <Col>
              <BackButton />
            </Col>
            <Col>
              <SkipButton />
            </Col>
            <Col>
              <NextButton />
            </Col>
          </Row>
        </div>
      </div>
    );
  };

  return (
    <Container
      className="d-flex align-items-center justify-content-center"
      style={{ minHeight: "100vh" }}
    >
      <div className="w-100" style={{ maxWidth: "600px" }}>
        <Card>
          <Card.Body>
            <h2 className="text-center mb-4">Registration</h2>
            <Progress />
            <Form>
              <FormPage
                formState={formState}
                handleChange={handleChange}
                errors={errors}
              />
              <hr />
              <Navigation />{" "}
            </Form>
          </Card.Body>
        </Card>
      </div>
    </Container>
  );
}
