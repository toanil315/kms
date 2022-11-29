import {
  Box,
  Button,
  Center,
  Form,
  Modal,
  RangePicker,
  Text,
} from "@/components";
import { ScheduleBase, ScheduleType } from "@/data-model/Schedule";
import { UseModalHelper } from "@/hooks/useModal";
import { Col, Row } from "antd";
import React, {
  BaseSyntheticEvent,
  SyntheticEvent,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { scheduleTurfSchema } from "./constants";
import { SubmitHandler } from "react-hook-form";
import { useRouter } from "@/hooks";
import { useBookTurf, useUpdateSchedule } from "@/hooks/api";
import { SCHEDULE_STATUSES, SCHEDULE_STATUSES_COLOR } from "@/utils/constants";
import { DatePickerProps, RangePickerProps } from "antd/lib/date-picker";
import moment from "moment";
import { preview } from "vite";
import useGetScheduleOfTurf from "@/hooks/api/Turf/useGetScheduleOfTurf";
import { DATE_FORMATS } from "@/utils/helpers/DateTimeUtils";

interface Props {
  modal: UseModalHelper;
  scheduleInfo: Partial<ScheduleType>;
}

const BookedTurfModal = ({ modal, scheduleInfo }: Props) => {
  const router = useRouter();
  const { bookTurf, isLoading: isBookTurfLoading } = useBookTurf();
  const { updateSchedule, isLoading: isUpdateScheduleLoading } =
    useUpdateSchedule();
  const { query } = useRouter();
  const mode = useMemo(() => {
    return scheduleInfo.id ? "view" : "create";
  }, [scheduleInfo]);
  const [currentTime, setCurrentTime] = useState<{
    date: number;
    month: number;
    year: number;
  }>({
    date: new Date().getDate(),
    month: new Date().getMonth(),
    year: new Date().getFullYear(),
  });
  const [currentPickedDate, setCurrentPickedDate] = useState<number>(
    new Date().getDate()
  );
  const [startTime, setStartTime] = useState<number>(0);
  const [typeOfCalendar, setTypeOfCalendar] = useState<string>("start");

  const { data: schedules } = useGetScheduleOfTurf(
    router.query.id as string,
    // start date of current date on range picker
    moment(new Date(currentTime.year, currentTime.month, 1)).format(
      DATE_FORMATS.DEFAULT_WITHOUT_TIME
    ),
    // end date of current date on range picker
    moment(new Date(currentTime.year, currentTime.month + 1, 1)).format(
      DATE_FORMATS.DEFAULT_WITHOUT_TIME
    )
  );

  const disabledDates = useMemo(() => {
    return schedules?.schedules?.map((schedule) => {
      return {
        id: schedule.id,
        start: moment(
          new Date(schedule.start_time),
          DATE_FORMATS.DEFAULT_WITH_TIME
        ),
        end: moment(
          new Date(schedule.end_time),
          DATE_FORMATS.DEFAULT_WITH_TIME
        ),
      };
    });
  }, [schedules]);

  const onSubmit: SubmitHandler<Partial<ScheduleType> & { times: any }> = (
    data
  ) => {
    const scheduleData = {
      title: data.title,
      description: data.description,
      start_time: new Date(data.times[0] as string).toISOString(),
      end_time: new Date(data.times[1] as string).toISOString(),
    } as ScheduleBase;

    if (mode === "create") {
      bookTurf({ ...scheduleData, turf_id: query.id as string });
    } else {
      updateSchedule({ ...scheduleData, id: scheduleInfo.id ?? "" });
    }
  };

  useEffect(() => {
    modal.show &&
      (isBookTurfLoading || isUpdateScheduleLoading) &&
      modal.closeModal();
  }, [isBookTurfLoading, isUpdateScheduleLoading]);

  const onClick = (e: BaseSyntheticEvent) => {
    const node = { ...e.target };
    const onClickItem: any = Object.values(node)[1];
    switch (onClickItem.className) {
      case "ant-picker-cell-inner": {
        if (currentPickedDate < Number(onClickItem.children)) {
          setCurrentPickedDate(Number(onClickItem.children));
          setStartTime(0);
        }

        break;
      }

      case "ant-picker-header-next-btn": {
        setCurrentTime((prev) => ({
          ...prev,
          month: prev.month + 1,
        }));
        break;
      }

      case "ant-picker-next-icon": {
        setCurrentTime((prev) => ({
          ...prev,
          month: prev.month + 1,
        }));
        break;
      }

      case "ant-picker-prev-icon": {
        setCurrentTime((prev) => ({
          ...prev,
          month: prev.month - 1,
        }));
        break;
      }

      case "ant-picker-header-prev-btn": {
        setCurrentTime((prev) => ({
          ...prev,
          month: prev.month - 1,
        }));
        break;
      }

      case "ant-picker-super-prev-icon": {
        setCurrentTime((prev) => ({
          ...prev,
          year: prev.year - 1,
        }));
        break;
      }

      case "ant-picker-header-super-prev-btn": {
        setCurrentTime((prev) => ({
          ...prev,
          year: prev.year - 1,
        }));
        break;
      }

      case "ant-picker-super-next-icon": {
        setCurrentTime((prev) => ({
          ...prev,
          year: prev.year + 1,
        }));
        break;
      }

      case "ant-picker-header-super-next-btn": {
        setCurrentTime((prev) => ({
          ...prev,
          year: prev.year + 1,
        }));
        break;
      }

      case "ant-picker-time-panel-cell-inner": {
        if (typeOfCalendar !== "end") {
          setStartTime(Number(onClickItem.children));
        }
      }

      default:
        break;
    }
  };

  const getDisabledHours = useCallback(
    (date: moment.Moment | null, type: any) => {
      let array: any[] = [];
      if (date && disabledDates) {
        if (type === "start") {
          setTypeOfCalendar("start");
          disabledDates.forEach((values) => {
            if (
              moment(date).isSame(values.start, "day") &&
              scheduleInfo.id !== values.id
            ) {
              for (let i = values.start.hour(); i < values.end.hour(); i += 1) {
                array.push(i);
              }
            }
          });
        } else {
          setTypeOfCalendar("end");
          const unavailableTimes = new Set([]);
          const times: number[] = [];
          const availableTimes: number[] = [];

          disabledDates.forEach((values) => {
            if (
              currentPickedDate === values.start.date() &&
              scheduleInfo.id !== values.id
            ) {
              for (
                let i = values.start.hour() + 1;
                i <= values.end.hour();
                i++
              ) {
                unavailableTimes.add(i as never);
              }
            }
          });

          for (let i = 1; i <= 24; i++) {
            if (!unavailableTimes.has(i as never) && i >= startTime) {
              times.push(i);
            } else {
              times.push(-1);
            }
          }

          let currentIndex = 0;
          for (let i = startTime; i < 24; i++) {
            if (i > currentIndex && currentIndex === 0) {
              if (times[i] !== -1) {
                console.log(times[i]);
                availableTimes.push(times[i]);
                for (let j = i + 1; j < 24; j++) {
                  if (times[j] !== -1) {
                    availableTimes.push(times[j]);
                    currentIndex = j;
                  }
                  if (times[j] === -1) {
                    currentIndex = j;
                    break;
                  }
                }
              }
            }
          }

          let disableHours = Array.from({ length: 24 }, (_, i) => i + 1);

          availableTimes.forEach((availableHour) => {
            disableHours = disableHours.filter(
              (disableHour) => disableHour !== availableHour
            );
          });

          array = disableHours;
        }
      }
      return array;
    },
    [disabledDates, startTime]
  );

  return (
    <Modal onCancel={modal.closeModal} open={modal.show}>
      <Box width={["400px", "450px", "500px"]}>
        <Text
          fontSize="lg"
          fontWeight="bold"
          lineHeight="large"
          color="text"
          textAlign="center"
        >
          {mode === "view" ? "View the scheduled calendar" : "Book Turf"}
        </Text>
        {mode === "view" && (
          <Center margin=" 10px 0 20px">
            <Box
              width="8px"
              height="8px"
              borderRadius="rounded"
              bg={
                SCHEDULE_STATUSES_COLOR[
                  scheduleInfo.status as keyof typeof SCHEDULE_STATUSES_COLOR
                ]
              }
              margin="0 8px 0 0"
            ></Box>
            <Text
              fontSize="sm"
              fontWeight="medium"
              color={
                SCHEDULE_STATUSES_COLOR[
                  scheduleInfo.status as keyof typeof SCHEDULE_STATUSES_COLOR
                ]
              }
              textAlign="center"
            >
              {
                SCHEDULE_STATUSES[
                  scheduleInfo.status as keyof typeof SCHEDULE_STATUSES_COLOR
                ]
              }
            </Text>
          </Center>
        )}
        <Form
          defaultValues={{
            ...scheduleInfo,
            times: [
              moment(scheduleInfo.start_time).format(
                DATE_FORMATS.DEFAULT_WITH_TIME
              ),
              moment(scheduleInfo.end_time).format(
                DATE_FORMATS.DEFAULT_WITH_TIME
              ),
            ],
          }}
          onSubmit={onSubmit}
          schema={scheduleTurfSchema}
          enableResetForm={!!scheduleInfo}
        >
          {({ control }) => {
            return (
              <Row gutter={[20, 20]}>
                <Col span={24}>
                  <Form.Input
                    label="Title"
                    control={control}
                    name="title"
                    placeholder="Enter your title..."
                    isRequired
                  />
                </Col>
                <Col span={24}>
                  <Form.RangePicker
                    allowClear={false}
                    label="Time"
                    showTime={{ format: "HH" }}
                    format={DATE_FORMATS.DEFAULT_WITH_TIME}
                    onMouseDown={onClick}
                    disabledTime={(date, type) => {
                      return {
                        disabledHours: () => getDisabledHours(date, type),
                      };
                    }}
                    disabledDate={(current) =>
                      current.isBefore(moment().subtract(1, "day"))
                    }
                    control={control}
                    name="times"
                  />
                </Col>
                <Col span={24}>
                  <Form.Input
                    label="Note"
                    control={control}
                    name="description"
                    as="textarea"
                    placeholder="Note something..."
                  />
                </Col>
                <Col span={24}>
                  <Center>
                    <Button
                      $type="secondary"
                      padding="10px 30px"
                      margin="0 10px 0 0"
                      type="button"
                      onClick={() => modal.closeModal()}
                    >
                      Cancel
                    </Button>
                    {mode === "create" && (
                      <Button loading={isBookTurfLoading} padding="10px 30px">
                        Save
                      </Button>
                    )}
                    {mode === "view" && (
                      <Button
                        loading={isUpdateScheduleLoading}
                        padding="10px 30px"
                      >
                        Update
                      </Button>
                    )}
                  </Center>
                </Col>
              </Row>
            );
          }}
        </Form>
      </Box>
    </Modal>
  );
};

export default BookedTurfModal;
