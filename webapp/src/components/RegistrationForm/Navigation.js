import { Form, Button, Container, Row, Col } from "react-bootstrap";
import * as React from "react";

export default function Navigation({
  activeStep,
  setActiveStep,
  onStepSubmit,
  isLastTutorStep,
  isLastUserStep,
}) {
  const onPrevClick = React.useCallback(
    (event) => {
      event.preventDefault();
      setActiveStep(() => Math.max(activeStep - 1, 0));
    },
    [activeStep, setActiveStep]
  );

  const BackButton = () => {
    return (
      <Col>
        <Button style={{ marginRight: "16px" }} onClick={onPrevClick}>
          Previous
        </Button>
      </Col>
    );
  };

  const TutorSubmit = () => {
    return (
      <Col>
        <div style={{ float: "right" }}>
          <Button primary={true} onClick={() => onStepSubmit("TutorSubmit")}>
            Submit
          </Button>
        </div>
      </Col>
    );
  };

  const NextButton = () => {
    return (
      <Col>
        <div style={{ float: "right" }}>
          <Button primary={true} onClick={() => onStepSubmit("Next")}>
            {isLastUserStep ? "Continue to Tutor Registration" : "Next"}
          </Button>
        </div>
      </Col>
    );
  };

  const UserSubmit = () => {
    return (
      <Col>
        <Button
          style={{ marginRight: "16px" }}
          onClick={() => onStepSubmit("UserSubmit")}
        >
          Submit
        </Button>
      </Col>
    );
  };

  return (
    <div>
      <Row>
        {activeStep !== 0 && <BackButton />}
        {isLastUserStep && <UserSubmit />}
        {isLastTutorStep ? <TutorSubmit /> : <NextButton />}
      </Row>
    </div>
  );
}
