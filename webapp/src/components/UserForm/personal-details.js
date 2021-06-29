import { Form } from "react-bootstrap";

export default function PersonalDetails({ formState, handleChange, errors }) {
  return (
    <>
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
    </>
  );
}
