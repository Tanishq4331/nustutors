import BasicTable from "../components/RequestTable/BasicTable";
import Loading from "../components/Loading/Loading";
import useRequests from "../hooks/useRequests";
import { Header } from "semantic-ui-react";
import { Container } from "react-bootstrap";
import { useState, useEffect } from "react";
import ModuleSelect from "../components/RegistrationForm/TutoringPreferences/ModuleSelect";

export default function AllRequests() {
  //use a format that is accepted by ModuleSelect
  const [moduleSelectionWrapper, setModuleSelectionWrapper] = useState({
    modules: [],
  });
  const [displayedRequests, setDisplayedRequests] = useState([]);

  const { requests, loading } = useRequests({});
  const modOptions = moduleSelectionWrapper.modules.map((mod) => mod.label);

  useEffect(() => {
    //only display requests for the chosen modules
    if (modOptions.length) {
      const filtered = requests.filter((request) =>
        modOptions.includes(request.module.label)
      );
      setDisplayedRequests(filtered);
    } else {
      setDisplayedRequests(requests);
    }
  }, [moduleSelectionWrapper, requests]);

  const toDisplay = displayedRequests.map((request) => {
    return {
      ...request,
      moduleName: request.module.label,
    };
  });

  return (
    <>
      <Loading loading={loading} />

      <div className="text-center mb-5">
        <Header as="h1">All Requests</Header>
      </div>

      <Container
        className="d-flex mt-4"
        style={{ minHeight: "50vh", maxHeight: "70vh", maxWidth: "900px" }}
      >
        <div className="wrap-table100">
          <div className="mb-4">
            <div className="mb-3">
              You may filter the requests by choosing the modules below.
            </div>
            <ModuleSelect
              formState={moduleSelectionWrapper}
              setFormState={setModuleSelectionWrapper}
              errors={{}}
            />
          </div>
          {toDisplay && <BasicTable data={toDisplay} />}
        </div>
      </Container>

      <Container
        className="mt-4"
        style={{ minHeight: "10vh", maxWidth: "900px" }}
      ></Container>
    </>
  );
}
