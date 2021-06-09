import Dashboard from "./Dashboard"
import Signup from "./Signup"
import ForgotPassword from "./ForgotPassword"

export default function AppPage(props) {

  const component = () => {
    switch(props.display) {
      case "Dashboard":
        return <Dashboard />;
      case "Signup":
        return <Signup />;
      case "ForgotPassword":
        return <ForgotPassword />;
      default:
        return <Dashboard />;
    }
  }

  return (
    <div className="App">
      <header>
        {/* <div style={{ display: "flex", flexFlow: "row nowrap" }}>
          </div> */}
      </header>

      <main>{component()}</main>
    </div>
  );
}
