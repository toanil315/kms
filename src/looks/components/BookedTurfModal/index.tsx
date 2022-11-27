import { Box, Button, Center, Form, Modal, Text } from "@/components";
import { ScheduleBase, ScheduleType } from "@/data-model/Schedule";
import { UseModalHelper } from "@/hooks/useModal";
import { Col, Row } from "antd";
import React, { useEffect, useMemo } from "react";
import { scheduleTurfSchema } from "./constants";
import { SubmitHandler } from "react-hook-form";
import { useRouter } from "@/hooks";
import { useBookTurf, useUpdateSchedule } from "@/hooks/api";
import { SCHEDULE_STATUSES, SCHEDULE_STATUSES_COLOR } from "@/utils/constants";

interface Props {
  modal: UseModalHelper;
  scheduleInfo: Partial<ScheduleType>;
}

const BookedTurfModal = ({ modal, scheduleInfo }: Props) => {
  const { bookTurf, isLoading: isBookTurfLoading } = useBookTurf();
  const { updateSchedule, isLoading: isUpdateScheduleLoading } =
    useUpdateSchedule();
  const { query } = useRouter();
  const mode = useMemo(() => {
    return scheduleInfo.id ? "view" : "create";
  }, [scheduleInfo]);

  const onSubmit: SubmitHandler<Partial<ScheduleType>> = (data) => {
    const scheduleData = {
      title: data.title,
      description: data.description,
      start_time: new Date(data.start_time as string).toISOString(),
      end_time: new Date(data.end_time as string).toISOString(),
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
          defaultValues={scheduleInfo}
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
                <Col span={12}>
                  <Form.DatePicker
                    allowClear={false}
                    label="Start Date"
                    control={control}
                    name="start_time"
                    disabled
                  />
                </Col>
                <Col span={12}>
                  <Form.DatePicker
                    allowClear={false}
                    label="End Date"
                    control={control}
                    name="end_time"
                    disabled
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
