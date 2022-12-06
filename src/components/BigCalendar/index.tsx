import React from "react";
import { CalendarProps } from "react-big-calendar";
import { StyledBigCalendar } from "./styles";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { ScheduleType } from "@/data-model";
import { SCHEDULE_STATUSES } from "@/utils/constants";

interface Props extends CalendarProps {}

const Calendar = ({ children, ref, ...restProps }: Props) => {
  const eventStyleGetter = (
    event: ScheduleType,
    start: string,
    end: string
  ) => {
    const style = {
      backgroundColor: "rgba(29, 138, 181, 0.4)",
      borderColor: "#1d8ab5",
    };

    if (new Date(start).getTime() < Date.now()) {
      style.backgroundColor = "rgba(149, 165, 166, 0.4)";
      style.borderColor = "rgba(149, 165, 166)";
    }

    if (
      event.status === SCHEDULE_STATUSES.ADMIN_CANCELED ||
      event.status === SCHEDULE_STATUSES.USER_CANCELED
    ) {
      style.backgroundColor = "rgba(230, 51, 13, 0.4)";
      style.borderColor = "rgb(230, 51, 13)";
    }

    return {
      style,
    };
  };

  return (
    <StyledBigCalendar {...restProps} eventPropGetter={eventStyleGetter} />
  );
};

export default Calendar;
