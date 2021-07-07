import { Form, Button, Container, Row, Col } from "react-bootstrap";
import * as React from "react";

export default function Navigation({
  activeStep,
  setActiveStep,
  steps,
  onStepSubmit,
  isLastStep,
}) {
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
    const label = steps[activeStep].label;
    if (label == "Qualifications" || label == "Tutoring Preferences") {
      return (
        <Button style={{ marginRight: "16px" }} onClick={onSkipClick}>
          Skip Tutor Registration
        </Button>
      );
    } else {
      return null;
    }
  };

  return (
    <div>
      <Row>
        <Col>
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
}
