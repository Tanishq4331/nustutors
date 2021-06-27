import * as React from "react";
import * as ReactDOM from "react-dom";

import { Form, Button, Card, Alert, Container } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import { useEffect } from "react";

import AccountDetails from "./account-details";
import PersonalDetails from "./personal-details";

import { makeStyles } from "@material-ui/core/styles";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Typography from "@material-ui/core/Typography";
import { accountValidation, personalValidation } from "./validators";

const stepPages = [PersonalDetails, AccountDetails];

export default function Registration() {
  const [activeStep, setActiveStep] = React.useState(0);
  const [errors, setErrors] = React.useState("");
  const history = useHistory();

  const [formState, setFormState] = React.useState({
    name: "",
    phone: "",
    email: "",
    password: "",
    passwordConfirm: "",
  });
  const [steps, setSteps] = React.useState([
    { label: "Personal Details", isValid: undefined },
    { label: "Account Details", isValid: undefined },
  ]);

  const lastStepIndex = steps.length - 1;
  const isLastStep = lastStepIndex === activeStep;
  const isPreviousStepsValid =
    steps
      .slice(0, activeStep)
      .findIndex((currentStep) => currentStep.isValid === false) === -1;

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setFormState({ ...formState, [name]: value });
  };

  //validates the fields on the current page and updates errors and pages
  const validatePage = () => {
    switch (steps[activeStep].label) {
      case "Personal Details":
        return personalValidation(formState.name, formState.phone);
      case "Account Details":
        return accountValidation(
          formState.email,
          formState.password,
          formState.passwordConfirm
        );
    }
  };

  const onStepSubmit = () => {
    const newErrors = validatePage();
    setErrors(newErrors);

    const errorPresent = Object.values(newErrors).some((x) => x !== "");
    console.log(errorPresent);
    //update the validity of the active page
    // if (errorPresent) {
    //   setSteps((prev) => [
    //     ...prev.slice(0, activeStep),
    //     {
    //       ...prev[activeStep],
    //       isValid: false,
    //     },
    //     ...prev.slice(activeStep + 1),
    //   ]);
    // } else {
    //   setSteps((prev) => [
    //     ...prev.slice(0, activeStep),
    //     {
    //       ...prev[activeStep],
    //       isValid: true,
    //     },
    //     ...prev.slice(activeStep + 1),
    //   ]);
    // }

    //if the current page is not valid do nothing; could disable button alternatively
    if (errorPresent) {
      return;
    }

    //move to next step
    setActiveStep(() => Math.min(activeStep + 1, lastStepIndex));

    if (isLastStep && isPreviousStepsValid && !errorPresent) {
      alert(JSON.stringify(formState));
    }
  };

  const onPrevClick = React.useCallback(
    (event) => {
      event.preventDefault();
      setActiveStep(() => Math.max(activeStep - 1, 0));
    },
    [activeStep, setActiveStep]
  );

  const FormPage = stepPages[activeStep];

  return (
    <Container
      className="d-flex align-items-center justify-content-center"
      style={{ minHeight: "100vh" }}
    >
      <div className="w-100" style={{ maxWidth: "450px" }}>
        <Card>
          <Card.Body>
            <h2 className="text-center mb-4">Registration</h2>
            {/* {error && <Alert variant="danger">{error}</Alert>} */}

            <Stepper activeStep={activeStep} alternativeLabel>
              {steps.map((step) => (
                <Step key={step.label}>
                  <StepLabel>{step.label}</StepLabel>
                </Step>
              ))}
            </Stepper>

            <Form>
              <FormPage
                formState={formState}
                handleChange={handleChange}
                errors={errors}
              />
              <hr />
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
                  {activeStep !== 0 ? (
                    <Button
                      style={{ marginRight: "16px" }}
                      onClick={onPrevClick}
                    >
                      Previous
                    </Button>
                  ) : undefined}
                  <Button
                    primary={true}
                    // disabled={!formRenderProps.allowSubmit}
                    onClick={onStepSubmit}
                  >
                    {isLastStep ? "Submit" : "Next"}
                  </Button>
                </div>
              </div>
            </Form>
          </Card.Body>
        </Card>
      </div>
    </Container>
  );
}
