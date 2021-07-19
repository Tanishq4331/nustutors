import { Button, Card, Image, Statistic } from "semantic-ui-react";
import { useState } from "react";
import moment from "moment";
import { RequestModal } from "./RequestModal";

export default function RequestCard({ request, addToBlacklist }) {
  const startDate = moment(request.startDate).format("D MMM");
  const [open, setOpen] = useState(false);
  const [pop, setPop] = useState(false);
  const items = [
    { key: "rate", label: "offer", value: `$${request.rate}` },
    { key: "startDate", label: "Start", value: startDate },
    { key: "duraiton", label: "Months", value: `${request.duration}` },
  ];

  return (
    <>
      <RequestModal request={request} open={open} setOpen={setOpen} />{" "}
      <div
        style={{
          display: "inline-block",
          marginRight: "15px",
          marginBottom: "15px",
        }}
      >
        <Card link={pop}>
          <Card.Content>
            {request.url && (
              <Image floated="right" size="mini" src={request.url} />
            )}
            <Card.Header>{request.name}</Card.Header>
            {request.modules.value}
            <Card.Description>
              <Statistic.Group
                size="mini"
                items={items}
                style={{ transform: "scale(0.8)" }}
              />
            </Card.Description>
          </Card.Content>
          <Card.Content extra>
            <div
              className="ui two buttons"
              onMouseOver={() => setPop(true)}
              onMouseOut={() => setPop(false)}
            >
              <Button basic color="green" onClick={() => setOpen(true)}>
                Apply
              </Button>
              <Button basic color="red" onClick={() => addToBlacklist(request)}>
                Hide
              </Button>
            </div>
          </Card.Content>
        </Card>
      </div>
    </>
  );
}