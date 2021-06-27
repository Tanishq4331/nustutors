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
          required
        />
        <Form.Control.Feedback type="invalid">
          {errors.name}
        </Form.Control.Feedback>
      </Form.Group>
      <Form.Group id="phone">
        <Form.Label>Phone Number</Form.Label>
        <Form.Control
          type="tel"
          name="phone"
          value={formState.phone}
          required
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
