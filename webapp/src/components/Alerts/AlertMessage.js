import { motion, AnimatePresence } from "framer-motion";
import { Alert } from "react-bootstrap";
import { useAuth } from "../../contexts/AuthContext";

export default function AlertMessage() {
  const { alert } = useAuth();
  const { message, success } = alert;

  const fixedHeightDiv = {
    height: "50px",
  };

  const Message = () => {
      if (!success) {
        return (
          <motion.div
            // layout
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <Alert variant="danger">{message}</Alert>
          </motion.div>
        );
      } else {
        return (
          <motion.div
            // layout
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <Alert variant="success">{message}</Alert>
          </motion.div>
        );
      }
  };

  return (
    <div style={fixedHeightDiv}>
      <AnimatePresence>
        {message && <Message />}
      </AnimatePresence>
    </div>
  );
}
