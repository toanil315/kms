import { Box } from "@/components";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useOutletContext } from "react-router-dom";
import { Calendar, momentLocalizer, Views } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import eventsExample from "./events.example";

const localizer = momentLocalizer(moment);

const BookTurfContainer = () => {
  const [containerTitle, setContainerTitle] = useOutletContext();

  useEffect(() => {
    setContainerTitle("Book Turf");
  }, []);

  const [myEvents, setEvents] = useState(eventsExample);

  const handleSelectSlot = useCallback(
    ({ start, end }: any) => {
      const title = window.prompt("New Event name");
      if (title) {
        setEvents((prev: any) => [...prev, { start, end, title }]);
      }
    },
    [setEvents]
  );

  const handleSelectEvent = useCallback(
    (event: any) => window.alert(event.title),
    []
  );

  const { defaultDate, scrollToTime } = useMemo(
    () => ({
      defaultDate: new Date(2022, 11, 13),
      scrollToTime: new Date(2022, 11, 13),
    }),
    []
  );

  return (
    <Box height="100%">
      <Calendar
        defaultDate={defaultDate}
        defaultView={Views.WEEK}
        events={myEvents}
        localizer={localizer}
        onSelectEvent={handleSelectEvent}
        onSelectSlot={handleSelectSlot}
        selectable
        scrollToTime={scrollToTime}
      />
    </Box>
  );
};

export default BookTurfContainer;
