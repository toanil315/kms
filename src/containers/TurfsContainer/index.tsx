import {
  Box,
  Center,
  Image,
  Pagination,
  PlaceholderLoading,
  Text,
} from "@/components";
import { usePagination, useRouter } from "@/hooks";
import { useGetTurfsByLocation } from "@/hooks/api";
import { TurfCard } from "@/looks/components";
import { DEFAULT_PAGE_SIZES } from "@/utils/constants";
import { Col, Row } from "antd";
import React, { useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import EmptyImage from "@/public/assets/pngs/empty.png";

const TurfsContainer = () => {
  const [containerTitle, setContainerTitle]: any = useOutletContext();
  const { query } = useRouter();
  const { data, isLoading } = useGetTurfsByLocation(
    query.id as string,
    query.page ? Number(query.page) : undefined
  );
  const pagination = usePagination({
    pageSize: DEFAULT_PAGE_SIZES.TURFS,
  });

  useEffect(() => {
    setContainerTitle("Turf Detail");
  }, []);

  const renderTurfs = () => {
    return data?.turfs?.map((turf) => {
      return (
        <Col key={turf.id} span={6}>
          <TurfCard turf={turf} />
        </Col>
      );
    });
  };

  if (isLoading) {
    return <PlaceholderLoading />;
  }

  return (
    <Box>
      <Row gutter={[20, 20]}>
        {data?.turfs?.length === 0 ? (
          <Center width="100%" style={{ flexFlow: "column nowrap" }}>
            <Image width="400px" height="400px" src={EmptyImage} alt="empty" />
            <Text
              fontSize="md"
              fontWeight="medium"
              lineHeight="xl"
              color="primary"
            >
              No turf was found in this location
            </Text>
          </Center>
        ) : (
          renderTurfs()
        )}
      </Row>
      <Box style={{ position: "absolute", bottom: 15, right: 15 }}>
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

export default TurfsContainer;
