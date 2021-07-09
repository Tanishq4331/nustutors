import { useState, useEffect } from "react";
import { Radio } from "antd";
import { Card, Row, Col, Container } from "react-bootstrap";

const OPTIONS = [
  { label: "A+", value: "A+" },
  { label: "A", value: "A" },
  { label: "A-", value: "A-" },
  { label: "B+", value: "B+" },
  { label: "B", value: "B" },
  { label: "NA", value: "NA" },
];

export default function ChooseGrades({ formState, setFormState }) {
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

  const RadioGroup = ({ moduleName }) => {
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
  };

  return (
    <Card className="mb-5">
      <Card.Header>
        <strong> Module Grades </strong>
      </Card.Header>
      <Card.Body>
        <div className="mb-4">
          Please enter your grades for the modules you have chosen
        </div>
        {formState.modules &&
          formState.modules.map((module, index) => {
            const code = module.value;
            const label = module.label;
            const title = label.substr(label.indexOf(" ") + 1);

            return (
              <Container key={`inline-${index}`}>
                <Row noGutters={true} className="mb-3">
                  <Col style={{ textAlign: "left", marginRight: "15px" }}>
                    <strong>{code}</strong>
                    <div>{title}</div>
                  </Col>
                  <Col
                    xs={6}
                    className={"d-flex align-items-center justify-content-end"}
                  >
                    <RadioGroup moduleName={module.value} />
                  </Col>
                </Row>
              </Container>
            );
          })}
      </Card.Body>
    </Card>
  );
}
