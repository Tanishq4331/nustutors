import { useAuth } from "../../../contexts/AuthContext";
import Alert from "@material-ui/lab/Alert";
import TimePreferences from "./TimePreferences";
import LocationPreferences from "./LocationPreferences";

export default function LocationAndTime({
  formState,
  setFormState,
  handleCheckboxChange,
  errors,
}) {
  const { userData } = useAuth();

  return (
    <>
      <LocationPreferences
        formState={formState}
        setFormState={setFormState}
        handleCheckboxChange={handleCheckboxChange}
        errors={errors}
      />

      <TimePreferences formState={formState} setFormState={setFormState} />

      {/* only show alert when registering */}
      {!userData && (
        <Alert severity="info" color="info">
          You may submit the form now, or continue to Tutor Regsitration
        </Alert>
      )}
    </>
  );
}
