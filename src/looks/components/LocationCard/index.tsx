import { Box, Image, Text } from "@/components";
import React from "react";
import TurfImage from "@/public/assets/pngs/turf.png";
import { StarIcon } from "@/public/assets/svgs";
import { Link } from "react-router-dom";
import { PATHS } from "@/routes/constants";

const LocationCard = () => {
  return (
    <Box borderRadius="large" overflow="hidden">
      <Image src={TurfImage} fallback="" height="120px" width="100%" />
      <Box padding="15px" bg="secondary">
        <Text fontSize="md" fontWeight="bold" lineHeight="large" color="white">
          Sân bóng đá Chuyên Việt
        </Text>
        <Text
          fontSize="xs"
          fontWeight="regular"
          lineHeight="md"
          color="textLight"
          margin="10px 0    "
        >
          98 Tiểu La, Hòa Thuận Đông, Hải Châu, Đà Nẵng 550000
        </Text>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Box>
            <StarIcon />
            <StarIcon />
            <StarIcon />
            <StarIcon />
          </Box>
          <Link to={`${PATHS.TURFS}/1`}>
            <Text fontSize="xs" fontWeight="bold" color="textLight">
              Detail
            </Text>
          </Link>
        </Box>
      </Box>
    </Box>
  );
};

export default LocationCard;
