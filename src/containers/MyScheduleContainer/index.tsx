import { Box, Calendar } from "@/components";
import { ScheduleType } from "@/data-model";
import { useModal, useRouter } from "@/hooks";
import {
  useGetScheduleOfUser,
  useGetSchedulesOfReferee,
  useUser,
} from "@/hooks/api";
import { BookedTurfModal } from "@/looks/components";
import { USER_ROLES } from "@/utils/constants";
import { DATE_FORMATS } from "@/utils/helpers/DateTimeUtils";
import moment from "moment";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { momentLocalizer, View, Views } from "react-big-calendar";
import { useOutletContext } from "react-router-dom";

const localizer = momentLocalizer(moment);

const MyScheduleContainer = () => {
  const [containerTitle, setContainerTitle]: any = useOutletContext();
  const { query } = useRouter();

  useEffect(() => {
    setContainerTitle("My Schedules");
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
  const { data: schedulesOfUser } = useGetScheduleOfUser(
    user?.role !== USER_ROLES.USER
  );
  const { data: schedulesOfReferee } = useGetSchedulesOfReferee(
    user?.role !== USER_ROLES.REFEREE
  );

  const data = useMemo(() => {
    return user?.role === USER_ROLES.USER
      ? schedulesOfUser
      : schedulesOfReferee;
  }, [user?.role, schedulesOfReferee, schedulesOfUser]);

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
        onSelectSlot={undefined}
        selectable="ignoreEvents"
        onView={handleChangeView}
      />
      <BookedTurfModal
        mode={user?.role === USER_ROLES.REFEREE ? "viewOnly" : "view"}
        scheduleInfo={scheduleInfo}
        modal={bookTurfModal}
      />
    </Box>
  );
};

export default MyScheduleContainer;
