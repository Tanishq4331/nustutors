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

  const [open, setOpen] = useState(message);

  const DURATION = 6000;

  useEffect(() => setOpen(message), [alert]);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const Message = () => {
    if (success) {
      return (
        <Snackbar open={open} autoHideDuration={DURATION} onClose={handleClose}>
          <Alert onClose={handleClose} severity="success">
            {message}
          </Alert>
        </Snackbar>
      );
    } else {
      return (
        <Snackbar open={open} autoHideDuration={DURATION} onClose={handleClose}>
          <Alert onClose={handleClose} severity="error">
            {message}
          </Alert>
        </Snackbar>
      );
    }
  };

  return <Message />;
}
