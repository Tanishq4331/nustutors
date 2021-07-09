import { Form } from "react-bootstrap";
import { useState, useEffect, useMemo } from "react";
import ModuleSelect from "./ModuleSelect";

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
      <ModuleSelect
        selectedMods={selectedMods}
        setSelectedMods={setSelectedMods}
        errors={errors}
      />
  );
}
