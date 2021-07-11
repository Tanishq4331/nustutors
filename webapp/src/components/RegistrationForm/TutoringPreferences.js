import { Card } from "react-bootstrap";
import { useState, useEffect, useMemo } from "react";
import ModuleSelect from "./ModuleSelect";
import ChooseGrades from "./ChooseGrades";

export default function TutoringPreferences({
  formState,
  handleChange,
  errors,
  setFormState,
}) {
  const [selectedMods, setSelectedMods] = useState(formState.modules);

  useEffect(() => {
    setFormState({ ...formState, modules: selectedMods });
  }, [selectedMods]);

  return (
    <>
      <Card className="mb-5">
        <Card.Header>
          <strong> Relevant Modules and Grades </strong>
        </Card.Header>
        <Card.Body>
          <ModuleSelect
            selectedMods={selectedMods}
            setSelectedMods={setSelectedMods}
            errors={errors}
          />
          <ChooseGrades formState={formState} setFormState={setFormState} />
        </Card.Body>
      </Card>
    </>
  );
}
