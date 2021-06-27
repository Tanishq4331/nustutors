import * as React from "react";
import { useState } from "react";
import { Form, Button, Card, Alert, Container } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";

import AccountDetails from "./account-details";
import PersonalDetails from "./personal-details";
import { useAuth } from "../../contexts/AuthContext";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Typography from "@material-ui/core/Typography";
import { accountValidation, personalValidation } from "./validators";

export default function Registration() {
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
    password: "",
    passwordConfirm: "",
  });

  const steps = [
    { label: "Account Details", form: AccountDetails },
    { label: "Personal Details", form: PersonalDetails },
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
        return personalValidation(formState.name, formState.phone);
      case "Account Details":
        return accountValidation(
          formState.email,
          formState.password,
          formState.passwordConfirm
        );
    }
  };

  const onStepSubmit = async () => {
    setLoading(true);
    const newErrors = await validatePage();
    setErrors(newErrors);

    const errorPresent = Object.values(newErrors).some((x) => x !== "");

    //if the current page is not valid do nothing; could disable button alternatively
    if (errorPresent) {
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

  const FormPage = steps[activeStep].form;

  return (
    <Container
      className="d-flex align-items-center justify-content-center"
      style={{ minHeight: "100vh" }}
    >
      <div className="w-100" style={{ maxWidth: "450px" }}>
        <Card>
          <Card.Body>
            <h2 className="text-center mb-4">Registration</h2>
            {globalError && <Alert variant="danger">{globalError}</Alert>}
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
