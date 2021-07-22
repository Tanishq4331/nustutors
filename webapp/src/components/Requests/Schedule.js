import ScheduleSelector from "react-schedule-selector";
import { useAuth } from "../../contexts/AuthContext";
import { Label } from "semantic-ui-react";
import styled from "styled-components";
import moment from "moment";
import { Header } from "semantic-ui-react";

const OverlapWrapper = styled.div`
  height: 400px;
  margin-top: 2rem;
  position: relative;

  .base {
    width: 100%;
    height: 100%;
    transform: scale(0.9);
    position: absolute;
    top: 1rem;
    left: 0;
  }

  .top {
    z-index: 9;
    opacity: 0.65;
  }
`;

export function renderDateLabel(date) {
  const Day = styled.div`
    font-size: 17px;
    margin: 0;
    text-align: center;
    margin-bottom: 4px;
  `;

  const formatted = moment(date).format("ddd");
  return <Day>{formatted}</Day>;
}

export default function Schedule({ tuteeTimes, switcheroo }) {
  const { userData } = useAuth();
  const tutorSchedule = userData.timings;
  const tuteeSchedule = tuteeTimes.map((x) => x.getTime());

  //Timing overlap between tutor and tutee
  // const intersection = tutorSchedule.filter((value) =>
  //   tuteeTimes.includes(value.getTime())
  // );

  return (
    <div className="mb-2" style={{ pointerEvents: "none" }}>
      <OverlapWrapper>
        <Header as="h4">Time Preferences</Header>
        <div className="base">
          <ScheduleSelector
            selection={tutorSchedule}
            numDays={7}
            minTime={8}
            startDate={new Date("May 21 2018")} //arbitrary time to ensure timings start with monday
            dateFormat="ddd"
            selectedColor={"#00b5ad"}
            unselectedColor={"white"}
            renderDateLabel={renderDateLabel}
            maxTime={21}
            hourlyChunks={1}
            className="base"
          />
        </div>
        <div className="base top">
          <ScheduleSelector
            selection={tuteeSchedule}
            numDays={7}
            minTime={8}
            startDate={new Date("May 21 2018")} //arbitrary time to ensure timings start with monday
            dateFormat="ddd"
            maxTime={21}
            hourlyChunks={1}
            renderDateLabel={renderDateLabel}
            selectedColor={"#fbbd08"}
          />
        </div>
      </OverlapWrapper>
      <div className="d-flex mt-1 justify-content-center">
        <Label color={"teal"}>You</Label>
        <Label color={"yellow"}>{switcheroo ? "Tutor" : "Tutee"}</Label>
        <Label color={"olive"}>Common</Label>
      </div>
    </div>
  );
}
