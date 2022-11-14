import { Box, Button, Center, Form, Modal, Text } from "@/components";
import { ScheduleType } from "@/data-model/Schedule";
import { UseModalHelper } from "@/hooks/useModal";
import { Col, Row } from "antd";
import React, { useMemo } from "react";
import { scheduleTurfSchema } from "./constants";
import { SubmitHandler } from "react-hook-form";

interface Props {
  modal: UseModalHelper;
  scheduleInfo: Partial<ScheduleType>;
}

const BookedTurfModal = ({ modal, scheduleInfo }: Props) => {
  const mode = useMemo(() => {
    return scheduleInfo.id ? "view" : "create";
  }, [scheduleInfo]);

  const onSubmit: SubmitHandler<Partial<ScheduleType>> = (data) =>
    console.log(data);

  console.log(scheduleInfo);

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
                    label="Orderer Name"
                    control={control}
                    name="title"
                    placeholder="Enter your name..."
                  />
                </Col>
                <Col span={12}>
                  <Form.DatePicker
                    allowClear={false}
                    label="Start Date"
                    control={control}
                    name="start"
                  />
                </Col>
                <Col span={12}>
                  <Form.DatePicker
                    allowClear={false}
                    label="End Date"
                    control={control}
                    name="end"
                  />
                </Col>
                <Col span={24}>
                  <Form.Input
                    label="Note"
                    control={control}
                    name="desc"
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
                      <Button padding="10px 30px">Save</Button>
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
