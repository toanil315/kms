import { Box, Button, Center, Form, Modal, Text } from "@/components";
import { ScheduleBase, ScheduleType } from "@/data-model/Schedule";
import { UseModalHelper } from "@/hooks/useModal";
import { Col, Row } from "antd";
import React, { useEffect, useMemo } from "react";
import { scheduleTurfSchema } from "./constants";
import { SubmitHandler } from "react-hook-form";
import useBookTurf from "@/hooks/api/Turf/useBookTurf";
import { useRouter } from "@/hooks";

interface Props {
  modal: UseModalHelper;
  scheduleInfo: Partial<ScheduleType>;
}

const BookedTurfModal = ({ modal, scheduleInfo }: Props) => {
  const { bookTurf, isLoading: isBookTurfLoading } = useBookTurf();
  const { query } = useRouter();
  const mode = useMemo(() => {
    return scheduleInfo.id ? "view" : "create";
  }, [scheduleInfo]);

  const onSubmit: SubmitHandler<Partial<ScheduleType>> = (data) => {
    bookTurf({
      ...data,
      start_time: new Date(data.start_time as string).toISOString(),
      end_time: new Date(data.end_time as string).toISOString(),
      turf_id: query.id ?? "",
    } as ScheduleBase);
  };

  useEffect(() => {
    modal.show && isBookTurfLoading && modal.closeModal();
  }, [isBookTurfLoading]);

  return (
    <Modal onCancel={modal.closeModal} open={modal.show}>
      <Box width={["400px", "450px", "500px"]}>
        <Text
          fontSize="lg"
          fontWeight="bold"
          lineHeight="large"
          color="text"
          textAlign="center"
          margin="0 0 20px"
        >
          {mode === "view" ? "View the scheduled calendar" : "Book Turf"}
        </Text>
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
