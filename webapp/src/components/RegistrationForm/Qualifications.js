import { Form, Card } from "react-bootstrap";
import { useState, useEffect } from "react";
import { useAuth } from "../../contexts/AuthContext";

export default function Qualifications({ formState, handleChange, errors }) {
  const options = [
    { value: "Year 1" },
    { value: "Year 2" },
    { value: "Year 3" },
    { value: "Year 4" },
    { value: "Graduate" },
  ];

  return (
    <>
      <Card className="mb-5">
        <Card.Header>
          <strong> Academic Qualifications </strong>
        </Card.Header>
        <Card.Body>
          <Form.Group controlId="yearOfStudy">
            <Form.Label>Year of Study</Form.Label>
            <Form.Control
              required
              as="select"
              name="yearOfStudy"
              placeholder="Type"
              onChange={handleChange}
            >
              {options.map((option, index) => {
                return (
                  <option key={index} value={option.value}>
                    {option.value}
                  </option>
                );
              })}
            </Form.Control>
          </Form.Group>
        </Card.Body>
      </Card>

      <Card className="mb-5">
        <Card.Header>
          <strong> Relevant Modules and Grades </strong>
        </Card.Header>
        <Card.Body>
          Please select the relevant modules you have completed along with your
          grade for each module.
          <Form.Group></Form.Group>
        </Card.Body>
      </Card>
    </>
  );
}
