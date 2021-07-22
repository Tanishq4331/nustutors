import { useAuth } from "../../contexts/AuthContext";
import { useState, useEffect } from "react";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function AlertMessage() {
  const { alert } = useAuth();
  const { message, success } = alert;

  const [open, setOpen] = useState(Boolean(message));

  const DURATION = 6000;

  useEffect(() => setOpen(message), [alert]);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  return (
    <Snackbar open={open} autoHideDuration={DURATION} onClose={handleClose}>
      <Alert onClose={handleClose} severity={success ? "success" : "error"}>
        {message}
      </Alert>
    </Snackbar>
  );
}
