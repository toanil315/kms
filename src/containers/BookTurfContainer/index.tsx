import { Box, PlaceholderLoading } from "@/components";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useOutletContext } from "react-router-dom";
import { Calendar, momentLocalizer, Views } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { useModal, useRouter } from "@/hooks";
import { BookedTurfModal } from "@/looks/components";
import { ScheduleType } from "@/data-model/Schedule";
import { toast } from "react-toastify";
import useGetScheduleOfTurf from "@/hooks/api/Turf/useGetScheduleOfTurf";

const localizer = momentLocalizer(moment);

const BookTurfContainer = () => {
  const [containerTitle, setContainerTitle]: any = useOutletContext();
  const { query } = useRouter();

  useEffect(() => {
    setContainerTitle("Book Turf");
  }, []);

  const [myEvents, setEvents] = useState<any>([]);
  const [currentView, setCurrentView] = useState<string>(Views.WEEK);
  const [scheduleInfo, setScheduleInfo] = useState<Partial<ScheduleType>>({});
  const { data, isLoading } = useGetScheduleOfTurf(query.id as string);

  const bookTurfModal = useModal();

  useEffect(() => {
    if (data?.schedules) {
      setEvents(
        data.schedules.map((schedule) => {
          return {
            title: schedule.title,
            desc: schedule.description,
            start: new Date(schedule.start_time),
            end: new Date(schedule.end_time),
          };
        })
      );
    }
  }, [JSON.stringify(data)]);

  const handleSelectSlot = useCallback(
    ({ start, end }: { start: Date; end: Date }) => {
      if (
        !((end.getTime() - start.getTime()) % 3600000) &&
        start.getMinutes() === 0 &&
        start.getDate() >= new Date().getDate() &&
        start.getTime() >= Date.now()
      ) {
        setScheduleInfo({
          title: "",
          start_time: start.toString(),
          end_time: end.toString(),
          description: "",
        });
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
      toast.error("The turf can only be booked now or the next days!");
    }
    if (start.getDate() < Date.now()) {
      toast.error("The turf can only be booked now or the next days!");
    }
  };

  const handleSelectEvent = useCallback((event: any) => {
    setScheduleInfo({
      ...event,
      description: event.desc,
    });
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

  if (isLoading) {
    return <PlaceholderLoading />;
  }

  return (
    <Box height="100%" style={{ position: "relative" }}>
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
      />
      <BookedTurfModal scheduleInfo={scheduleInfo} modal={bookTurfModal} />
    </Box>
  );
};

export default BookTurfContainer;
