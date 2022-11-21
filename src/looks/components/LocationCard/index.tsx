import { Box, Image, Text } from "@/components";
import React from "react";
import TurfImage from "@/public/assets/pngs/turf.png";
import { StarIcon } from "@/public/assets/svgs";
import { Link } from "react-router-dom";
import { PATHS } from "@/routes/constants";
import { TurfLocation } from "@/data-model";

interface Props {
  turfLocation: TurfLocation;
}

const LocationCard = ({ turfLocation }: Props) => {
  return (
    <Box borderRadius="large" overflow="hidden">
      <Image
        src={turfLocation.image_link}
        fallback=""
        height="120px"
        width="100%"
      />
      <Box padding="15px" bg="secondary">
        <Text fontSize="md" fontWeight="bold" lineHeight="large" color="white">
          {turfLocation.name}
        </Text>
        <Text
          fontSize="xs"
          fontWeight="regular"
          lineHeight="md"
          color="textLight"
          margin="10px 0    "
        >
          {turfLocation.address}
        </Text>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Box>
            <StarIcon />
            <StarIcon />
            <StarIcon />
            <StarIcon />
          </Box>
          <Link to={`${PATHS.TURFS}/${turfLocation.id}`}>
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
