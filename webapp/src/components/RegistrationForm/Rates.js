import { useState, useEffect } from "react";
import { Card } from "react-bootstrap";
import { Slider } from "@material-ui/core";

const marks = [
  {
    value: 0,
    label: "$0",
  },
  {
    value: 25,
    label: "$25",
  },
  {
    value: 50,
    label: "$50",
  },
  {
    value: 75,
    label: "$75",
  },
  {
    value: 100,
    label: "$100",
  },
];

function valuetext(value) {
  return `${value}$`;
}

export default function Rates({ formState, setFormState }) {
  const [rate, setRate] = useState(formState.rate);

  //update formState when rate changes
  useEffect(() => {
    setFormState({ ...formState, rate: rate });
  }, [rate]);

  const onSlide = (event, value) => {
    setRate(value);
  };

  return (
    <Card className="mb-5">
      <Card.Header>
        <strong> Rates </strong>
      </Card.Header>
      <Card.Body>
        Only receive assignments that offer this minimum hourly rate
        <div className="d-flex justify-content-center">
          <div
            className="mt-5"
            style={{
              width: "80%",
            }}
          >
            <Slider
              value={rate}
              getAriaValueText={valuetext}
              aria-labelledby="discrete-slider-always"
              step={1}
              marks={marks}
              onChange={onSlide}
              valueLabelDisplay="on"
            />
          </div>
        </div>
      </Card.Body>
    </Card>
  );
}
