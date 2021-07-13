import { Form, Button, Container, Row, Col } from "react-bootstrap";
import * as React from "react";

export default function Navigation({
  activeStep,
  setActiveStep,
  onStepSubmit,
  isLastTutorStep,
  isLastUserStep,
}) {
  return (
    <div>
      <Row>
        {activeStep !== 0 && (
          <BackButton activeStep={activeStep} setActiveStep={setActiveStep} />
        )}
        {isLastUserStep && <UserSubmit onStepSubmit={onStepSubmit} />}
        {isLastTutorStep ? (
          <TutorSubmit onStepSubmit={onStepSubmit} />
        ) : (
          <NextButton
            onStepSubmit={onStepSubmit}
            isLastUserStep={isLastUserStep}
          />
        )}
      </Row>
    </div>
  );
}

function BackButton({ activeStep, setActiveStep }) {
  const onPrevClick = React.useCallback(
    (event) => {
      event.preventDefault();
      setActiveStep(() => Math.max(activeStep - 1, 0));
    },
    [activeStep, setActiveStep]
  );

  return (
    <Col>
      <Button style={{ marginRight: "16px" }} onClick={onPrevClick}>
        Previous
      </Button>
    </Col>
  );
}

function TutorSubmit({ onStepSubmit }) {
  return (
    <Col>
      <div style={{ float: "right" }}>
        <Button primary={true} onClick={() => onStepSubmit("TutorSubmit")}>
          Submit
        </Button>
      </div>
    </Col>
  );
}

function NextButton({ onStepSubmit, isLastUserStep }) {
  return (
    <Col>
      <div style={{ float: "right" }}>
        <Button primary={true} onClick={() => onStepSubmit("Next")}>
          {isLastUserStep ? "Continue to Tutor Registration" : "Next"}
        </Button>
      </div>
    </Col>
  );
}

const UserSubmit = ({ onStepSubmit }) => {
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
