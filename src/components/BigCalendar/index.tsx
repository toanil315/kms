import React from "react";
import { CalendarProps } from "react-big-calendar";
import { StyledBigCalendar } from "./styles";
import "react-big-calendar/lib/css/react-big-calendar.css";

interface Props extends CalendarProps {}

const Calendar = ({ children, ref, ...restProps }: Props) => {
  return <StyledBigCalendar {...restProps} />;
};

export default Calendar;
