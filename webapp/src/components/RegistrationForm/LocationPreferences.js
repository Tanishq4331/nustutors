import { Form, Card } from "react-bootstrap";
import { css } from "@emotion/css";

export default function LocationPreferences({
  formState,
  setFormState,
  handleCheckboxChange,
  errors,
}) {
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

  const handleLocationChecks = (e) => {
    let index = parseInt(e.target.name);
    const checked = e.target.checked;
    setFormState((prev) => {
      const newLocations = [
        ...prev.locations.slice(0, index),
        checked,
        ...prev.locations.slice(index + 1),
      ];
      return { ...prev, locations: newLocations };
    });
  };

  return (
    <Card className="mb-5">
      <Card.Header>
        <strong>Location Preferences</strong>
      </Card.Header>
      <Card.Body>
        <Form.Group>
          <Form.Check
            custom
            name="availableForOnline"
            type="checkbox"
            className="mb-3 "
            id="online"
            onChange={handleCheckboxChange}
            value={formState.availableForOnline}
            label={`I am available for online sessions`}
            isInvalid={!!errors.availableForOnline}
            feedback={errors.availableForOnline}
          />
        </Form.Group>
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
                transform: translateY(-3px) scale(1.05);
              }
            `;

            return (
              <div className={customCard} key={i}>
                <label htmlFor={i}>
                  <div style={{ padding: "10px", textAlign: "center" }}>
                    <div>
                      <strong> {item.name} </strong>
                    </div>
                    {item.desc}
                  </div>
                </label>
                <input
                  type="checkbox"
                  id={i}
                  name={i}
                  value={formState.locations[i]}
                  className="hide"
                  onChange={handleLocationChecks}
                ></input>
              </div>
            );
          })}
        </section>
      </Card.Body>
    </Card>
  );
}
