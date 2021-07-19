import { Form, Card } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { useAuth } from "../../../contexts/AuthContext";

export default function LoginDetails({ formState, handleChange, errors }) {
  const { loginWithGoogle, setAlert } = useAuth();

  function handleLoginWithGoogle() {
    return loginWithGoogle()
      .then(() => {
        setAlert({
          message:
            "You are logged in with google. Please complete the registration to use the app",
          success: true,
        });
      })
      .catch((error) => {
        setAlert({ message: "Unable to sign up", successs: false });
        console.log(`${error.code}: ${error.message}`);
      });
  }

  return (
    <>
      <Card>
        <Card.Header>
          <strong>Login Details</strong>
        </Card.Header>
        <Card.Body>
          <Form>
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
          </Form>
        </Card.Body>
      </Card>

      <div className="w-100 text-center mt-3">Or</div>
      <div className="w-100 text-center mt-2">
        <Button variant="outline-primary" onClick={handleLoginWithGoogle}>
          Sign up with Google
        </Button>
      </div>
    </>
  );
}
