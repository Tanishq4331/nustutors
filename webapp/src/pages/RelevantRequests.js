import BasicTable from "../components/RequestTable/BasicTable";
import Loading from "../components/Loading/Loading";
import useRequests from "../hooks/useRequests";
import { Header } from "semantic-ui-react";
import { Container } from "react-bootstrap";
import { useState, useEffect } from "react";
import ModuleSelect from "../components/RegistrationForm/TutoringPreferences/ModuleSelect";
import { Link } from "react-router-dom";

export default function RelevantRequests() {
  const { requests, loading } = useRequests({
    onlyShowRelevant: true,
  });

  const toDisplay = requests.map((request) => {
    return { ...request, moduleName: request.module.label };
  });

  return (
    <>
      <Loading loading={loading} />

      <div className="text-center mb-5">
        <Header as="h1">Relevant Requests</Header>
      </div>

      <Container
        className="d-flex mt-4"
        style={{ minHeight: "50vh", maxHeight: "70vh", maxWidth: "900px" }}
      >
        <div className="wrap-table100">
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
