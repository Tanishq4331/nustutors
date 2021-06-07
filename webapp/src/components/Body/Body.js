import Login from "../../pages/Login";
import AppPage from "../../pages/AppPage";

export default function Body(props) {
  if (!props.user) {
    return <Login logIn={props.logIn.bind(this)} />;
  } else {
    return (
      <>
        <div style={{ maxWidth: "64rem", margin: "0 auto" }}>
          <AppPage />
        </div>
      </>
    );
  }
}