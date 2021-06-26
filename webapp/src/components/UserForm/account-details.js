import { Form } from "react-bootstrap";

// import {
//   userNameValidator,
//   emailValidator,
//   passwordValidator,
// } from "./validators";

export default function AccountDetails({ formState, handleChange }) {
  return (
    <>
      <Form.Group id="email">
        <Form.Label>Email</Form.Label>
        <Form.Control
          type="email"
          name="email"
          value={formState.email}
          onChange={handleChange}
          required
        />
      </Form.Group>
      <Form.Group id="password">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          name="password"
          value={formState.password}
          required
          onChange={handleChange}
        />
      </Form.Group>
      <Form.Group id="password-confirm">
        <Form.Label>Password Confirmation</Form.Label>
        <Form.Control
          type="password"
          name="passwordConfirm"
          value={formState.passwordConfirm}
          required
          onChange={handleChange}
        />
      </Form.Group>
    </>
  );
}
