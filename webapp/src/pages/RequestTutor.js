import { Container, Card } from "react-bootstrap";
import { Formik } from "formik";
import * as Yup from "yup";
import { useAuth } from "../contexts/AuthContext";
import { useHistory } from "react-router-dom";
import RequestTutorForm from "../components/RequestTutor/RequestTutorForm";
import { useData } from "../contexts/AppContext";

const validationSchema = Yup.object().shape({
  duration: Yup.number()
    .min(1, "Duration too short")
    .max(12, "Duration too long")
    .required("*Duration is required"),
  startDate: Yup.date()
    .min(new Date(), "Invalid date")
    .required("Start date is required"),
  modules: Yup.object(),
});

export default function RequestTutor() {
  const { setAlert } = useAuth();
  const { makeRequest } = useData();
  const history = useHistory();

  const handleSubmit = (values, { setSubmitting }) => {
    makeRequest(values)
      .then(() => {
        setAlert({
          message: `Request successfully submitted`,
          success: true,
        });
        setSubmitting(false);
        history.push("/dashboard");
      })
      .catch((error) => {
        setSubmitting(false);
        console.log(`${error.code}: ${error.message}`);
        setAlert({ message: "Could not contact server", success: false });
      });
  };

  return (
    <>
      <div className="justify-content-center mb-5">
        <h2 className="text-center">Request a tutor</h2>
      </div>
      <Container
        className="d-flex justify-content-center mt-4"
        style={{ minHeight: "50vh" }}
      >
        <div className="w-100" style={{ maxWidth: "800px" }}>
          <Card className="mb-4">
            <Card.Header>
              <strong>Request Form</strong>
            </Card.Header>
            <Card.Body>
              <Formik
                initialValues={{
                  description: "",
                  startDate: undefined,
                  modules: undefined,
                  duration: undefined,
                  rate: 0,
                }}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
              >
                <RequestTutorForm />
              </Formik>
            </Card.Body>
          </Card>
          <hr />
        </div>
      </Container>
    </>
  );
}
