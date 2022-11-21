import { Box, Image, Text } from "@/components";
import React from "react";
import TurfDetail from "@/public/assets/pngs/turf-detail.png";
import { Link } from "react-router-dom";
import { PATHS } from "@/routes/constants";

const TurfCard = () => {
  return (
    <Box borderRadius="large" overflow="hidden">
      <Image src={TurfDetail} fallback="" height="120px" width="100%" />
      <Box padding="15px" bg="secondary">
        <Text
          fontSize="md"
          fontWeight="bold"
          lineHeight="large"
          color="white"
          textAlign="center"
          margin="10px 0 15px"
        >
          Sân 5
        </Text>
        <Box display="flex" justifyContent="flex-end" alignItems="center">
          <Link to={`${PATHS.BOOK_TURF}/1`}>
            <Text fontSize="xs" fontWeight="bold" color="textLight">
              Book Now
            </Text>
          </Link>
        </Box>
      </Box>
    </Box>
  );
};

export default TurfCard;
