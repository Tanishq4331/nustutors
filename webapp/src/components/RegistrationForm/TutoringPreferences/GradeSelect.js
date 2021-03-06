import { useState, useEffect } from "react";
import { Radio } from "antd";
import { Row, Col, Container } from "react-bootstrap";

const OPTIONS = [
  { label: "A+", value: "A+" },
  { label: "A", value: "A" },
  { label: "A-", value: "A-" },
  { label: "B+", value: "B+" },
  { label: "B", value: "B" },
  { label: "NA", value: "NA" },
];

function GradeOptions({ moduleName, grades, setGrades }) {
  const handleChange = (e) => {
    const value = e.target.value;
    setGrades({ ...grades, [moduleName]: value });
  };

  const value = grades[moduleName];

  return (
    <Radio.Group
      options={OPTIONS}
      onChange={handleChange}
      name={value}
      value={value}
      optionType="button"
      buttonStyle="solid"
    />
  );
}

function ChosenModules({ modules, grades, setGrades }) {
  return modules.map((module, index) => {
    const code = module.value;
    const label = module.label;
    const title = label.substr(label.indexOf(" ") + 1);

    return (
      <>
        <Container key={`inline-${index}`} className="mb-3">
          <Row noGutters={true} className="mb-4">
            <Col style={{ textAlign: "left", marginRight: "15px" }}>
              <strong>{code}</strong>
              <div>{title}</div>
            </Col>
            <Col
              xs={6}
              className={"d-flex align-items-center justify-content-end"}
            >
              <GradeOptions
                moduleName={module.value}
                grades={grades}
                setGrades={setGrades}
              />
            </Col>
          </Row>
        </Container>
      </>
    );
  });
}

export default function GradeSelect({ formState, setFormState }) {
  const [grades, setGrades] = useState({});

  //update grades when modules changes;
  useEffect(() => {
    const modules = formState.modules;

    //map modules to a list of [moduleCode, grade] pairs
    const pairs = modules.map((mod) => {
      const moduleCode = mod.value;

      //use NA if no existing grade is found in the formState
      return [moduleCode, formState.grades[moduleCode] || "NA"];
    });

    //turn pairs list into a map of moduleCode to grade
    setGrades(Object.fromEntries(pairs));
  }, [formState.modules]);

  //update formState when grades changes
  useEffect(() => {
    setFormState({ ...formState, grades: grades });
  }, [grades]);

  if (formState.modules) {
    return (
      <>
        <div className="mb-4 mt-5">
          <hr></hr>
          Please enter your grades for the modules you have chosen
        </div>

        <ChosenModules
          modules={formState.modules}
          grades={grades}
          setGrades={setGrades}
        />
      </>
    );
  } else {
    return null;
  }
}
