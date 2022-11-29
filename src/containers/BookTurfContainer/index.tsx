import { Box, Calendar, PlaceholderLoading } from "@/components";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useOutletContext } from "react-router-dom";
import { momentLocalizer, View, Views } from "react-big-calendar";
import moment from "moment";
import { useModal, useRouter } from "@/hooks";
import { BookedTurfModal } from "@/looks/components";
import { ScheduleType } from "@/data-model/Schedule";
import { toast } from "react-toastify";
import useGetScheduleOfTurf from "@/hooks/api/Turf/useGetScheduleOfTurf";
import { string } from "yup";
import { DATE_FORMATS } from "@/utils/helpers/DateTimeUtils";
import { useUser } from "@/hooks/api";

const localizer = momentLocalizer(moment);

const BookTurfContainer = () => {
  const [containerTitle, setContainerTitle]: any = useOutletContext();
  const { query } = useRouter();

  useEffect(() => {
    setContainerTitle("Book Turf");
  }, []);

  const { user } = useUser();
  const [myEvents, setEvents] = useState<any>([]);
  const [currentView, setCurrentView] = useState<string>(Views.WEEK);
  const [scheduleInfo, setScheduleInfo] = useState<Partial<ScheduleType>>({});
  const [dateRange, setDateRange] = useState<{ start: string; end: string }>({
    start: moment(new Date()).format(DATE_FORMATS.DEFAULT_WITHOUT_TIME),
    end: moment(new Date(Date.now() + 604800000)).format(
      DATE_FORMATS.DEFAULT_WITHOUT_TIME
    ),
  });
  const { data, isLoading } = useGetScheduleOfTurf(
    query.id as string,
    dateRange.start,
    dateRange.end
  );

  const bookTurfModal = useModal();

  useEffect(() => {
    if (data?.schedules) {
      setEvents(
        data.schedules.map((schedule) => {
          return {
            ...schedule,
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
    if (start.getTime() < Date.now()) {
      toast.error("The turf can only be booked now or the next days!");
    }
  };

  const handleSelectEvent = useCallback((event: any) => {
    setScheduleInfo({
      ...event,
      start_time: event.start,
      end_time: event.end,
    });
    bookTurfModal.toggleModal();
  }, []);

  const handleChangeView = useCallback((view: string) => {
    setCurrentView(view);
  }, []);

  const { defaultDate } = useMemo(
    () => ({
      defaultDate: new Date(),
    }),
    []
  );

  const onRangeChange = (value: any, view?: View | undefined) => {
    if (view === Views.MONTH) {
      setDateRange({
        start: moment(value.start).format(DATE_FORMATS.DEFAULT_WITHOUT_TIME),
        end: moment(value.end).format(DATE_FORMATS.DEFAULT_WITHOUT_TIME),
      });
    } else if (view === Views.WEEK) {
      setDateRange({
        start: moment(value[0]).format(DATE_FORMATS.DEFAULT_WITHOUT_TIME),
        end: moment(value[value.length - 1]).format(
          DATE_FORMATS.DEFAULT_WITHOUT_TIME
        ),
      });
    } else if (view === Views.DAY) {
      setDateRange({
        start: moment(value[0]).format(DATE_FORMATS.DEFAULT_WITHOUT_TIME),
        end: moment(new Date(new Date(value[0]).getTime() + 86400000)).format(
          DATE_FORMATS.DEFAULT_WITHOUT_TIME
        ),
      });
    }
  };

  return (
    <Box height="100%" style={{ position: "relative" }}>
      <Calendar
        onRangeChange={onRangeChange}
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
        onView={handleChangeView}
      />
      <BookedTurfModal scheduleInfo={scheduleInfo} modal={bookTurfModal} />
    </Box>
  );
};

export default BookTurfContainer;
