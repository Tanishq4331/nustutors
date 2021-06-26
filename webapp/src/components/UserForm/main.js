import * as React from "react";
import * as ReactDOM from "react-dom";

import { Form, Button, Card, Alert, Container } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";

import AccountDetails from "./account-details";
import PersonalDetails from "./personal-details";

import { makeStyles } from "@material-ui/core/styles";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Typography from "@material-ui/core/Typography";

const stepPages = [AccountDetails, PersonalDetails];

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  backButton: {
    marginRight: theme.spacing(1),
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
}));

export default function Registration() {
  const [activeStep, setActiveStep] = React.useState(0);
  const history = useHistory();

  const [formState, setFormState] = React.useState({
    name: "",
    phone: "",
    email: "",
    password: "",
    passwordConfirm: "",
  });
  const [steps, setSteps] = React.useState([
    { label: "Account Details", isValid: undefined },
    { label: "Personal Details", isValid: undefined },
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

  const onStepSubmit = React.useCallback(
    //or handleNext
    (event) => {
      //check the validity of submitted form page and update steps
      // const { isValid, values } = event;

      // const currentSteps = steps.map((currentStep, index) => ({
      //   ...currentStep,
      //   isValid: index === activeStep ? isValid : currentStep.isValid,
      // }));

      // setSteps(currentSteps);

      // if (!isValid) {
      //   return;
      // }

      //if the form is valid update to the next state
      setActiveStep(() => Math.min(activeStep + 1, lastStepIndex));

      // if (isLastStep && isPreviousStepsValid && isValid) {
      if (isLastStep) {
        alert(JSON.stringify(formState));
      }
    },
    [
      activeStep,
      steps,
      setSteps,
      setActiveStep,
      setFormState,
      isLastStep,
      isPreviousStepsValid,
    ]
  );

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
              <FormPage formState={formState} handleChange={handleChange} />
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
