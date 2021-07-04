import { useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";

export default function Dashboard() {
  const { setAlert } = useAuth();

  useEffect(() => {
    setAlert({ message: "", successs: true });
  }, []);
  return (
    <div>
      <br></br>
      <h3 className="text-center mb-4"> Dashboard </h3>
    </div>
  );
}
