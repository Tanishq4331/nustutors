import { Form } from "react-bootstrap";

export default function PersonalDetails({ formState, handleChange }) {
  return (
    <>
      <Form.Group id="name">
        <Form.Label>Name</Form.Label>
        <Form.Control
          type="text"
          name="name"
          value={formState.name}
          onChange={handleChange}
          required
        />
      </Form.Group>
      <Form.Group id="phone">
        <Form.Label>Phone Number</Form.Label>
        <Form.Control
          type="tel"
          name="phone"
          value={formState.phone}
          required
          onChange={handleChange}
        />
      </Form.Group>
    </>
  );
}
