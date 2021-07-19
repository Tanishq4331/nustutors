import ScheduleSelector from "react-schedule-selector";
import { useState, useEffect } from "react";
import { renderDateLabel } from "../../Requests/Schedule";
import { Card } from "react-bootstrap";

export default function TimePreferences({ formState, setFormState, errors }) {
  const [schedule, setSchedule] = useState(formState.timings);

  useEffect(() => {
    setSchedule(formState.timings);
  }, []);

  useEffect(() => {
    //ensure dates are sorted to ensure order of selection does not affect the timings array
    setFormState({ ...formState, timings: schedule.sort() });
  }, [schedule]);

  return (
    <Card className="mb-5">
      <Card.Header>
        <strong>Available Timings</strong>
      </Card.Header>
      <Card.Body>
        <ScheduleSelector
          selection={schedule}
          numDays={7}
          minTime={8}
          startDate={new Date("May 21 2018")} //arbitrary time to ensure timings start with monday
          dateFormat="ddd"
          maxTime={21}
          hourlyChunks={1}
          onChange={setSchedule}
          renderDateLabel={renderDateLabel}
        />{" "}
        <div className="text-center mt-1">
          Please input all your available timings to increase your chances of
          finding a tutor.
        </div>
      </Card.Body>
    </Card>
  );
}
