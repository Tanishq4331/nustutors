import { Form, Card } from "react-bootstrap";
import { useState, useEffect } from "react";
import LocationPreferences from "./LocationPreferences";

export default function PersonalDetails({
  formState,
  handleChange,
  handleCheckboxChange,
  errors,
}) {
  const options = [
    { value: "Year 1" },
    { value: "Year 2" },
    { value: "Year 3" },
    { value: "Year 4" },
    { value: "Graduate" },
  ];

  return (
    <>
      <Card className="mb-4">
        <Card.Header>
          <strong>Personal Details</strong>
        </Card.Header>
        <Card.Body>
          <Form>
            <Form.Group id="name">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={formState.name}
                onChange={handleChange}
                isInvalid={!!errors.name}
              />
              <Form.Control.Feedback type="invalid">
                {errors.name}
              </Form.Control.Feedback>
            </Form.Group>
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
            <Form.Group id="dateOfBirth">
              <Form.Label>Date of Birth</Form.Label>
              <Form.Control
                type="date"
                name="dateOfBirth"
                value={formState.dateOfBirth}
                onChange={handleChange}
                isInvalid={!!errors.dateOfBirth}
              />
              <Form.Control.Feedback type="invalid">
                {errors.dateOfBirth}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group id="phone">
              <Form.Label>Phone Number</Form.Label>
              <Form.Control
                type="tel"
                name="phone"
                value={formState.phone}
                onChange={handleChange}
                isInvalid={!!errors.phone}
              />
              <Form.Control.Feedback type="invalid">
                {errors.phone}
              </Form.Control.Feedback>
            </Form.Group>
          </Form>
        </Card.Body>
      </Card>
      <LocationPreferences
        handleCheckboxChange={handleCheckboxChange}
        formState={formState}
        errors={errors}
      />
    </>
  );
}
