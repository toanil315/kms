import React, { useEffect } from "react";
import { Box } from "@/components/commons";
import { useOutletContext } from "react-router-dom";
import { LocationCard } from "@/looks/components";
import { Col, Row } from "antd";

const HomeContainer = () => {
  const [containerTitle, setContainerTitle]: any = useOutletContext();

  useEffect(() => {
    setContainerTitle("Turf List");
  }, []);

  return (
    <Box>
      <Row gutter={[20, 20]}>
        <Col span={6}>
          <LocationCard />
        </Col>
        <Col span={6}>
          <LocationCard />
        </Col>
        <Col span={6}>
          <LocationCard />
        </Col>
        <Col span={6}>
          <LocationCard />
        </Col>
        <Col span={6}>
          <LocationCard />
        </Col>
        <Col span={6}>
          <LocationCard />
        </Col>
      </Row>
    </Box>
  );
};

export default HomeContainer;
