import { Card, Form } from "react-bootstrap";
import ModuleSelect from "./ModuleSelect";
import ChooseGrades from "./ChooseGrades";
import Rates from "./Rates";

export default function TutoringPreferences({
  formState,
  errors,
  setFormState,
}) {
  return (
    <>
      <Rates formState={formState} setFormState={setFormState} />
      <Card className="mb-5">
        <Card.Header>
          <strong> Relevant Modules and Grades </strong>
        </Card.Header>
        <Card.Body>
          <ModuleSelect
            formState={formState}
            setFormState={setFormState}
            errors={errors}
          />
          <ChooseGrades formState={formState} setFormState={setFormState} />
        </Card.Body>
      </Card>
    </>
  );
}
