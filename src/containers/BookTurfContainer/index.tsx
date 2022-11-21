import { Box } from "@/components";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useOutletContext } from "react-router-dom";
import { Calendar, momentLocalizer, Views } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { useModal } from "@/hooks";
import { BookedTurfModal } from "@/looks/components";
import { ScheduleType } from "@/data-model/Schedule";
import { toast } from "react-toastify";

const localizer = momentLocalizer(moment);

const BookTurfContainer = () => {
  const [containerTitle, setContainerTitle]: any = useOutletContext();

  useEffect(() => {
    setContainerTitle("Book Turf");
  }, []);

  const [myEvents, setEvents] = useState([]);
  const [currentView, setCurrentView] = useState<string>(Views.WEEK);
  const [scheduleInfo, setScheduleInfo] = useState<Partial<ScheduleType>>({});

  const bookTurfModal = useModal();

  const handleSelectSlot = useCallback(
    ({ start, end }: { start: Date; end: Date }) => {
      if (
        !((end.getTime() - start.getTime()) % 3600000) &&
        start.getMinutes() === 0 &&
        start.getDate() >= new Date().getDate()
      ) {
        setScheduleInfo({ title: "", start, end, desc: "" });
        bookTurfModal.toggleModal();
      } else handleInValidCaseWhenSelect({ start, end });
    },
    [setEvents]
  );

  const handleInValidCaseWhenSelect = ({
    start,
    end,
  }: {
    start: Date;
    end: Date;
  }) => {
    if ((end.getTime() - start.getTime()) % 3600000) {
      toast.error("The turf can only be booked by the hour!");
    }
    if (start.getMinutes() !== 0) {
      toast.error("The football field can only be booked in the even hour!");
    }
    if (start.getDate() < new Date().getDate()) {
      toast.error("The turf can only be booked today or the next days!");
    }
  };

  const handleSelectEvent = useCallback((event: any) => {
    setScheduleInfo(event);
    bookTurfModal.toggleModal();
  }, []);

  const handleChangeView = useCallback((view: string) => {
    setCurrentView(view);
  }, []);

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
        onSelectSlot={
          currentView !== Views.MONTH ? handleSelectSlot : undefined
        }
        selectable="ignoreEvents"
        scrollToTime={scrollToTime}
        onView={handleChangeView}
        // selected
      />
      <BookedTurfModal scheduleInfo={scheduleInfo} modal={bookTurfModal} />
    </Box>
  );
};

export default BookTurfContainer;
