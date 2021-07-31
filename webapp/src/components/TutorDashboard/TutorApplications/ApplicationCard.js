import { Container, Row, Col } from "react-bootstrap";
import AvatarIcon from "../../AvatarIcon/AvatarIcon";
import { TutorRequestModal } from "../TutorRequests/TutorRequestModal";
import moment from "moment";
import useWindowSize from "../../../hooks/useWindowSize";
import { useData } from "../../../contexts/AppContext";
import { useState } from "react";
import styled from "styled-components";
import { Button } from "semantic-ui-react";

const StyledCard = styled.div`
  width: 100%;
  background-color: rgba(97, 179, 226, 0.1);
  transition: all 0.5s ease-out;

  padding: 10px 20px;
  border-radius: 4px;
  border: 1px solid #f2f8f9;
  cursor: pointer;
  margin: 10px auto;
  font-size: 1.2em;

  &:hover {
    transition: all 0.2s ease-out;
    box-shadow: 0px 4px 8px rgba(38, 38, 38, 0.2);
    top: -4px;
    border: 1px solid #cccccc;
    background-color: white;
  }
`;

export function ApplicationCard({ application }) {
  const [open, setOpen] = useState(false);
  const bigScreen = useWindowSize() > 990;
  const tinyScreen = useWindowSize() < 500;
  const { request } = application;
  const createdAt =
    application.createdAt &&
    moment(application.createdAt.toDate()).format("D MMM");
  const code = request.module.value;
  const label = request.module.label;
  const title = label.substr(label.indexOf(" ") + 1);
  const { deleteApplication } = useData();

  const onRemove = () => {
    setOpen(false);
    deleteApplication(application);
  };

  return (
    <>
      <TutorRequestModal
        request={application.request}
        open={open}
        setOpen={setOpen}
        alreadyApplied
        onRemove={onRemove}
      />
      <StyledCard onClick={() => setOpen(true)}>
        <Container fluid>
          <Row className="d-flex align-items-center justify-content-between">
            <Col md="1" className="d-flex justify-content-center">
              <AvatarIcon userData={application.request.user} small />
            </Col>
            {!tinyScreen && <Col md="2">{application.request.user.name}</Col>}
            <Col md={bigScreen ? "5" : "2"}>
              <div>
                <strong>{code}</strong>
                {bigScreen && <div>{title}</div>}
              </div>
            </Col>
            <Col md="1.5">
              <div>{createdAt}</div>
            </Col>
            <Col md="1.5">
              <div>
                {application.status === "pending" ? (
                  <Button basic color="green" onClick={() => setOpen(true)}>
                    Pending
                  </Button>
                ) : (
                  <Button basic color="red" onClick={() => setOpen(true)}>
                    Rejected
                  </Button>
                )}
              </div>
            </Col>
          </Row>
        </Container>
      </StyledCard>
    </>
  );
}
