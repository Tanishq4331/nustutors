import { Form } from "react-bootstrap";

// import {
//   userNameValidator,
//   emailValidator,
//   passwordValidator,
// } from "./validators";

export default function AccountDetails({ formState, handleChange, errors }) {
  return (
    <>
      <Form.Group id="email">
        <Form.Label>Email</Form.Label>
        <Form.Control
          type="email"
          name="email"
          value={formState.email}
          onChange={handleChange}
          isInvalid={!!errors.email}
          required
        />
        <Form.Control.Feedback type="invalid">
          {errors.email}
        </Form.Control.Feedback>
      </Form.Group>
      <Form.Group id="password">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          name="password"
          value={formState.password}
          required
          onChange={handleChange}
          isInvalid={!!errors.password}
        />
        <Form.Control.Feedback type="invalid">
          {errors.password}
        </Form.Control.Feedback>
      </Form.Group>
      <Form.Group id="password-confirm">
        <Form.Label>Password Confirmation</Form.Label>
        <Form.Control
          type="password"
          name="passwordConfirm"
          value={formState.passwordConfirm}
          required
          onChange={handleChange}
          isInvalid={!!errors.passwordConfirm}
        />
        <Form.Control.Feedback type="invalid">
          {errors.passwordConfirm}
        </Form.Control.Feedback>
      </Form.Group>
    </>
  );
}
