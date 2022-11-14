import { Box } from "@/components";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useOutletContext } from "react-router-dom";
import { Calendar, momentLocalizer, Views } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import eventsExample from "./events.example";
import { useModal } from "@/hooks";

const localizer = momentLocalizer(moment);

const BookTurfContainer = () => {
  const [containerTitle, setContainerTitle] = useOutletContext();

  useEffect(() => {
    setContainerTitle("Book Turf");
  }, []);

  const [myEvents, setEvents] = useState(eventsExample);

  const modal = useModal();

  const handleSelectSlot = useCallback(
    ({ start, end }: { start: Date; end: Date }) => {
      const title = window.prompt("New Event name");
      if (
        !((end.getTime() - start.getTime()) % 3600000) &&
        start.getMinutes() === 0
      ) {
        title && setEvents((prev: any) => [...prev, { start, end, title }]);
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
      defaultDate: new Date(),
      scrollToTime: new Date(),
    }),
    []
  );

  return (
    <Box height="100%">
      <Calendar
        min={new Date(0, 0, 0, 5, 0, 0)}
        max={new Date(0, 0, 0, 23, 59, 0)}
        defaultDate={defaultDate}
        defaultView={Views.WEEK}
        events={myEvents}
        localizer={localizer}
        onSelectEvent={handleSelectEvent}
        onSelectSlot={handleSelectSlot}
        selectable="ignoreEvents"
        scrollToTime={scrollToTime}
        // selected
      />
    </Box>
  );
};

export default BookTurfContainer;
