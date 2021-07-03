import { Form, Card } from "react-bootstrap";
import { useState, useEffect } from "react";
// import { css } from "emotion";
import { css } from "@emotion/css";

function LocationPreferences({ formState, handleCheckboxChange }) {
  const locations = [
    { name: "On Campus", desc: "NUS Kent Ridge" },
    { name: "North", desc: "Woodlands, Sembawang, Admiralty, Yishun, Khatib" },
    { name: "North West", desc: "Bukit Batok, CCK, Bukit Panjang, Yew Tee" },
    {
      name: "West",
      desc: "Jurong West, Clementi, Buona Vista, Kent Ridge, Commonwealth, Queenstown",
    },
    {
      name: "Central",
      desc: "Redhill, Tiong Bahru, Macpherson, Bugis, Orchard, Newton",
    },
    {
      name: "North East",
      desc: "Yio Chu Kang, Protong Pasir, Punggol, Hougang, Sengkang, Bishan, AMK, Toa Payoh",
    },
    {
      name: "East",
      desc: "Aljunied, Paya Lebar, Eunos, Tampines, Marine Parade, Pasir Ris, Changi",
    },
    {
      name: "South",
      desc: "Tanjong Pagar, Marina South, Harbourfront, Telok Blangah",
    },
  ];

  return (
    <Card className="mb-5">
      <Card.Header>
        <strong>Location Preferences</strong>
      </Card.Header>
      <Card.Body>
        <Form.Check
          custom
          name="availableForOnline"
          type="checkbox"
          className="mb-3 "
          id="online"
          onChange={handleCheckboxChange}
          value={formState.availableForOnline}
          label={`I am available for online sessions`}
        />
        You may also select multiple physical locations.
        <section className="basic-grid mt-3">
          {locations.map((item, i) => {
            const customCard = css`
              display: flex;
              flex-direction: column;
              justify-content: center;
              align-items: center;
              background: ${formState.locations[i] ? "pink" : "black"};
              font-size: 0.8rem;
              color: ${formState.locations[i] ? "black" : "orange"};
              box-shadow: rgba(3, 8, 20, 0.1) 0px 0.15rem 0.5rem,
                rgba(2, 8, 20, 0.1) 0px 0.075rem 0.175rem;
              height: 140px;
              width: 190px;
              border-radius: 4px;
              transition: all 500ms;
              overflow: hidden;
              background-size: cover;
              background-position: center;
              background-clip: content-box;
              background-repeat: no-repeat;

              &:hover {
                box-shadow: rgba(2, 8, 20, 0.1) 0px 0.35em 1.175em,
                  rgba(2, 8, 20, 0.08) 0px 0.175em 0.5em;
                transform: translateY(-3px) scale(1.1);
              }
            `;

            return (
              <div className={customCard} key={i}>
                <label htmlFor={i}>
                  <div style={{ padding: "10px", textAlign: "center" }}>
                    <h6>
                      {" "}
                      <strong> {item.name} </strong>
                    </h6>
                    {item.desc}
                  </div>
                </label>
                <input
                  type="checkbox"
                  id={i}
                  name={i}
                  value={formState.locations[i]}
                  className="hide"
                  onChange={handleCheckboxChange}
                ></input>
              </div>
            );
          })}
        </section>
      </Card.Body>
    </Card>
  );
}

export default function PersonalDetails({
  formState,
  handleChange,
  handleCheckboxChange,
  errors,
}) {
  return (
    <>
      <Card className="mb-4">
        <Card.Header>
          <strong>Personal Details</strong>
        </Card.Header>
        <Card.Body>
          <Form>
            <Form.Group id="name">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={formState.name}
                onChange={handleChange}
                isInvalid={!!errors.name}
              />
              <Form.Control.Feedback type="invalid">
                {errors.name}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group id="dateOfBirth">
              <Form.Label>Date of Birth</Form.Label>
              <Form.Control
                type="date"
                name="dateOfBirth"
                value={formState.dateOfBirth}
                onChange={handleChange}
                isInvalid={!!errors.dateOfBirth}
              />
              <Form.Control.Feedback type="invalid">
                {errors.dateOfBirth}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group id="phone">
              <Form.Label>Phone Number</Form.Label>
              <Form.Control
                type="tel"
                name="phone"
                value={formState.phone}
                onChange={handleChange}
                isInvalid={!!errors.phone}
              />
              <Form.Control.Feedback type="invalid">
                {errors.phone}
              </Form.Control.Feedback>
            </Form.Group>
          </Form>
        </Card.Body>
      </Card>
      <LocationPreferences
        handleCheckboxChange={handleCheckboxChange}
        formState={formState}
      />
    </>
  );
}
