import Login from "../../pages/Login";
import AppPage from "../../pages/AppPage";
import { useAuth } from "../../contexts/AuthContext"

export default function Body(props) {
  const { currentUser } = useAuth() 
  if (!currentUser) {
    return <Login logIn={props.logIn.bind(this)} />;
  } else {
    return (
      <>
        <div style={{ maxWidth: "64rem", margin: "0 auto" }}>
          <AppPage display={props.display} />
        </div>
      </>
    );
  }
}