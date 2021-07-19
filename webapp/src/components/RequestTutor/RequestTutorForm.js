import ModuleSelect from "../RegistrationForm/TutoringPreferences/ModuleSelect";
import Rates from "../RegistrationForm/TutoringPreferences/Rates";
import { Form, Button } from "react-bootstrap";
import Loading from "../Loading/Loading";
import { useFormikContext } from "formik";

export default function RequestTutorForm() {
  const {
    isSubmitting,
    setFieldValue,
    handleSubmit,
    values,
    handleBlur,
    touched,
    errors,
    handleChange,
  } = useFormikContext();

  const setBudget = (value) => {
    setFieldValue("rate", value);
  };

  const setModules = (value) => {
    setFieldValue("modules", value);
  };

  return (
    <Form onSubmit={handleSubmit} className="mb-3">
      <Loading loading={isSubmitting} />
      <div className="mb-3">Please select the module you need help in.</div>
      <ModuleSelect
        formState={values}
        onBlur={handleBlur}
        touched={Boolean(touched.modules)}
        setModules={setModules}
        errors={errors.modules ? { modules: "Please select a module" } : {}}
        isSingle
      />
      <Form.Group className="mt-3">
        <Form.Label>Description of Needs (Optional) </Form.Label>
        <Form.Control
          as="textarea"
          name="description"
          value={values.description}
          onChange={handleChange}
          rows="3"
        />
      </Form.Group>
      <Form.Group id="startDate">
        <Form.Label>Start Date</Form.Label>
        <Form.Control
          type="date"
          name="startDate"
          onBlur={handleBlur}
          onChange={(e) => {
            setFieldValue("startDate", e.target.value); // Access it from props
          }}
          isInvalid={touched.startDate && !!errors.startDate}
        />
        <Form.Control.Feedback type="invalid">
          {touched.startDate && errors.startDate}
        </Form.Control.Feedback>
      </Form.Group>
      <Form.Group className="mb-5" id="duration">
        <Form.Label>Length of commitment (months) </Form.Label>
        <Form.Control
          type="number"
          name="duration"
          value={values.duration}
          onChange={handleChange}
          onBlur={handleBlur}
          isInvalid={touched.duration && !!errors.duration}
        />
        <Form.Control.Feedback type="invalid">
          {touched.duration && errors.duration}
        </Form.Control.Feedback>
      </Form.Group>
      <Form.Group className="mb-5">
        Please choose your hourly budget
        <br></br>
        <br></br>
        <Rates formState={values} setBudget={setBudget} />
      </Form.Group>
      <Button type="submit">Submit</Button>
    </Form>
  );
}
