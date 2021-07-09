import { Form, Card } from "react-bootstrap";
import UploadDocuments from "./UploadDocuments";
import React from "react";
import ChooseGrades from "./ChooseGrades";
import "antd/dist/antd.css";

export default function Qualifications({
  formState,
  handleChange,
  setFormState,
}) {
  return (
    <>
      <Experiences formState={formState} handleChange={handleChange} />
      <ChooseGrades formState={formState} setFormState={setFormState} />
      <UploadDocuments formState={formState} setFormState={setFormState} />
    </>
  );
}

function Experiences({ handleChange, formState }) {
  return (
    <Card className="mb-5">
      <Card.Header>
        <strong> Experiences </strong>
      </Card.Header>
      <Card.Body>
        A better portfolio will increase your chances of getting assignments.
        Please include:
        <ul>
          <li>Any T.A experience at NUS, with the modules taught </li>
          <li>
            Other tutoring experiences, number of students taught & their
            improvements
          </li>
          <li>
            Other teaching experiences or academic achievements (tuition centre,
            relief teaching, Dean&apos;s list, scholarship etc.)
          </li>
        </ul>
        <Form.Group>
          {/* <Form.Label>Example textarea</Form.Label> */}
          <Form.Control
            as="textarea"
            name="experiences"
            value={formState.experiences}
            onChange={handleChange}
            rows="3"
          />
        </Form.Group>
      </Card.Body>
    </Card>
  );
}
