import { Card } from "react-bootstrap";
import ModuleSelect from "./ModuleSelect";
import GradeSelect from "./GradeSelect";
import Rates from "./Rates";

export default function TutoringPreferences({
  formState,
  errors,
  setFormState,
}) {
  return (
    <>
      <Card className="mb-5">
        <Card.Header>
          <strong> Rates </strong>
        </Card.Header>
        <Card.Body>
          Only receive assignments that offer this minimum hourly rate
          <Rates formState={formState} setFormState={setFormState} />
        </Card.Body>
      </Card>
      <Card className="mb-5">
        <Card.Header>
          <strong> Relevant Modules and Grades </strong>
        </Card.Header>
        <Card.Body>
          <div className="mb-3">
            Please select the relevant modules you have completed along with
            your grade for each module.
          </div>
          <ModuleSelect
            formState={formState}
            setFormState={setFormState}
            errors={errors}
          />
          <GradeSelect formState={formState} setFormState={setFormState} />
        </Card.Body>
      </Card>
    </>
  );
}
