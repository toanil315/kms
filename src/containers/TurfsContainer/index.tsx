import { Box } from "@/components";
import { TurfCard } from "@/looks/components";
import { Col, Row } from "antd";
import React, { useEffect } from "react";
import { useOutletContext } from "react-router-dom";

const TurfsContainer = () => {
  const [containerTitle, setContainerTitle] = useOutletContext();

  useEffect(() => {
    setContainerTitle("Turf Detail");
  }, []);

  return (
    <Box>
      <Row gutter={[20, 20]}>
        <Col span={4}>
          <TurfCard />
        </Col>
        <Col span={4}>
          <TurfCard />
        </Col>
        <Col span={4}>
          <TurfCard />
        </Col>
        <Col span={4}>
          <TurfCard />
        </Col>
        <Col span={4}>
          <TurfCard />
        </Col>
        <Col span={4}>
          <TurfCard />
        </Col>
        <Col span={4}>
          <TurfCard />
        </Col>
      </Row>
    </Box>
  );
};

export default TurfsContainer;
