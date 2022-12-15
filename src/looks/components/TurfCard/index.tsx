import { Box, Image, Text } from "@/components";
import { Link } from "react-router-dom";
import { PATHS } from "@/routes/constants";
import { TurfType } from "@/data-model";
import { TURF_SIDES } from "@/utils/constants";
import { formatNumber } from "@/utils/helpers";

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
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Text fontSize="xs" fontWeight="bold" color="textLight">
            {formatNumber(turf.hourly_fee)}/h
          </Text>
          <Link to={`${PATHS.BOOK_TURF}/${turf.id}`}>
            <Text fontSize="xs" fontWeight="bold" color="white">
              Book Now
            </Text>
          </Link>
        </Box>
      </Box>
    </Box>
  );
};

export default TurfCard;
