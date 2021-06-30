import * as React from "react";
import { useState, useEffect } from "react";
import { Form, Button, Card, Alert, Container } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";

import LoginDetails from "./LoginDetails";
import PersonalDetails from "./personal-details";
import { useAuth } from "../../contexts/AuthContext";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Typography from "@material-ui/core/Typography";
import { accountValidation, personalValidation } from "./validators";
import Qualifications from "./qualifications";
import TutoringPreferences from "./tutoring-preferences";
import Confirmation from "./Confirmation";

export default function Registration() {
  console.log("registration re-rending");
  const { register } = useAuth();
  const [activeStep, setActiveStep] = useState(0);
  const [errors, setErrors] = React.useState("");
  const [loading, setLoading] = useState(false);
  const [globalError, setGlobalError] = useState("");
  const history = useHistory();

  const [formState, setFormState] = useState({
    name: "",
    phone: "",
    email: "",
    dateOfBirth: null,
    password: "",
    passwordConfirm: "",
    tutor: null,
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
    if (isLastStep && !errorPresent) {
      try {
        setGlobalError("");
        await register(formState);
      } catch (error) {
        console.log(`${error.code}: ${error.message}`);
        setGlobalError("An unknown error occurred. Please try again later.");
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
      <Button primary={true} onClick={onStepSubmit}>
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
      <div
        style={{
          justifyContent: "space-between",
          alignContent: "center",
        }}
        className={"k-form-buttons k-buttons-end"}
      >
        <span style={{ alignSelf: "center" }}>
          Step {activeStep + 1} of {steps.length}
        </span>
        <div>
          <BackButton />
          <SkipButton />
          <NextButton />
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
            {globalError && <Alert variant="danger">{globalError}</Alert>}
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
