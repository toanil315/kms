import { Box, Image, Text } from "@/components";
import React from "react";
import TurfDetail from "@/public/assets/pngs/turf-detail.png";
import { Link } from "react-router-dom";
import { PATHS } from "@/routes/constants";
import { TurfType } from "@/data-model";
import { TURF_SIDES } from "@/utils/constants";

interface Props {
  turf: TurfType;
}

const TurfCard = ({ turf }: Props) => {
  return (
    <Box borderRadius="large" overflow="hidden">
      <Image src={turf.image_link} fallback="" height="120px" width="100%" />
      <Box padding="15px" bg="secondary">
        <Text
          fontSize="md"
          fontWeight="bold"
          lineHeight="large"
          color="white"
          textAlign="center"
          margin="10px 0 15px"
        >
          {turf.name}
        </Text>
        <Text
          fontSize="sm"
          fontWeight="bold"
          lineHeight="large"
          color="textLight"
          textAlign="center"
          margin="10px 0 15px"
        >
          {TURF_SIDES[turf.type as keyof typeof TURF_SIDES]}
        </Text>
        <Box display="flex" justifyContent="flex-end" alignItems="center">
          <Link to={`${PATHS.BOOK_TURF}/${turf.id}`}>
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
