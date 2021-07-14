import { useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";

export default function Dashboard() {
  const { setAlert, userData } = useAuth();

  return (
    <div>
      <h3 className="text-center mb-4"> Dashboard </h3>
    </div>
  );
}
