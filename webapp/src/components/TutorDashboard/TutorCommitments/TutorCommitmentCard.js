import { Container, Row, Col } from "react-bootstrap";
import AvatarIcon from "../../AvatarIcon/AvatarIcon";
import { CommitmentModal } from "../../CommitmentModal";
import moment from "moment";
import useWindowSize from "../../../hooks/useWindowSize";
import { useData } from "../../../contexts/AppContext";
import { useState } from "react";
import styled from "styled-components";
import { Button } from "semantic-ui-react";
import { StyledCard } from "../SubmittedApplications/SubmittedApplicationCard";

export function TutorCommitmentCard({ tutorCommitment }) {
  const [open, setOpen] = useState(false);
  const bigScreen = useWindowSize() > 990;
  const tinyScreen = useWindowSize() < 500;
  const { request, user } = tutorCommitment;
  const code = request.module.value;
  const label = request.module.label;
  const title = label.substr(label.indexOf(" ") + 1);
  // const { terminate } = useData();

  // const onTerminate = () => {
  //   setOpen(false);
  //   terminate(tutorCommitment);
  // };

  const startsIn = () => {
    const startDate = request.startDate;
    const today = moment();
    const daysBetween = today.diff(startDate, 'day')

    if (daysBetween < 0) {
      return `Starts in ${-1 * daysBetween} days`
    } else {
      return "Ongoing"
    }
  }

  return (
    <>
      <CommitmentModal
        request={request}
        user={user}
        open={open}
        setOpen={setOpen}
        alreadyApplied
        // onRemove={onTerminate}
      />
      <StyledCard onClick={() => setOpen(true)}>
        <Container fluid>
          <Row className="d-flex align-items-center justify-content-between">
            <Col md="1" className="d-flex justify-content-center">
              <AvatarIcon userData={user} small />
            </Col>
            {!tinyScreen && <Col md="2">{user.name}</Col>}
            <Col md={bigScreen ? "5" : "2"}>
              <div>
                <strong>{code}</strong>
                {bigScreen && <div>{title}</div>}
              </div>
            </Col>
            <Col md="2">
              <div>{startsIn()}</div>
            </Col>
          </Row>
        </Container>
      </StyledCard>
    </>
  );
}
