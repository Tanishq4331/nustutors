import { Form, Card } from "react-bootstrap";
import { useState, useEffect, useMemo } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { css } from "@emotion/css";
import React, { Component } from "react";
import ModuleSelect from "./ModuleSelect";

export default function Qualifications({
  formState,
  handleChange,
  errors,
  setFormState,
}) {
  const options = [
    { value: "Year 1" },
    { value: "Year 2" },
    { value: "Year 3" },
    { value: "Year 4" },
    { value: "Graduate" },
  ];

  const [selectedMods, setSelectedMods] = useState(null);

  useEffect(() => {
    setFormState({ ...formState, modules: selectedMods });
  }, [selectedMods]);

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
      <ModuleSelect setSelectedMods={setSelectedMods} errors={errors} />
    </>
  );
}
