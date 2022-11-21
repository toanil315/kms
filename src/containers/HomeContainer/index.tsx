import React, { useEffect } from "react";
import { Box } from "@/components/commons";
import { useOutletContext } from "react-router-dom";
import { LocationCard } from "@/looks/components";
import { Col, Row } from "antd";
import { usePagination, useRouter } from "@/hooks";
import { useGetAllLocations } from "@/hooks/api";
import { Pagination, PlaceholderLoading } from "@/components";
import { DEFAULT_PAGE_SIZES } from "@/utils/constants";

const HomeContainer = () => {
  const [containerTitle, setContainerTitle]: any = useOutletContext();
  const { query } = useRouter();
  const { data, isLoading } = useGetAllLocations(
    query.page ? Number(query.page) : undefined
  );
  const pagination = usePagination({
    pageSize: DEFAULT_PAGE_SIZES.TURF_LOCATION,
  });

  useEffect(() => {
    setContainerTitle("Turf List");
  }, []);

  const renderTurfLocations = () => {
    return data?.turfLocations?.map((turfLocation) => {
      return (
        <Col key={turfLocation.id} span={6}>
          <LocationCard turfLocation={turfLocation} />
        </Col>
      );
    });
  };

  if (isLoading) {
    return <PlaceholderLoading />;
  }

  return (
    <Box width="100%" height="100%" style={{ position: "relative" }}>
      <Row gutter={[20, 20]}>{renderTurfLocations()}</Row>
      <Box style={{ position: "absolute", bottom: 15, right: 0 }}>
        <Pagination
          total={data?.meta?.total_count}
          current={pagination.page}
          pageSize={pagination.pageSize}
          pagination={pagination}
        />
      </Box>
    </Box>
  );
};

export default HomeContainer;
