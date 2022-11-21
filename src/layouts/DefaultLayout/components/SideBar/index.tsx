import { Box, Text } from "@/components";
import { useRouter } from "@/hooks";
import { PATHS } from "@/routes/constants";
import React, { useMemo } from "react";
import { HomeIcon } from "@/public/assets/svgs";

const SideBar = () => {
  const sidebarList = useMemo(
    () => [
      {
        id: 1,
        content: "Home",
        to: PATHS.HOME,
        icon: <HomeIcon fill="white" />,
      },
    ],
    []
  );

  const renderSidebarItems = () => {
    return sidebarList.map(({ id, ...sidebarProps }) => {
      return <SideBarItem key={id} {...sidebarProps} />;
    });
  };

  return (
    <Box height="100%" bg="secondary" padding="10px">
      {renderSidebarItems()}
    </Box>
  );
};

interface SideBarItemProps {
  content: string;
  to: string;
  icon?: JSX.Element;
}

const SideBarItem = ({ content, to, icon }: SideBarItemProps) => {
  const { navigate } = useRouter();
  return (
    <Box
      onClick={() => navigate(to)}
      padding="10px"
      display="flex"
      alignItems="center"
      style={{ cursor: "pointer" }}
    >
      {icon}
      <Box padding="0 0 0 8px">
        <Text
          fontSize="base"
          fontWeight="medium"
          lineHeight="large"
          color="white"
        >
          {content}
        </Text>
      </Box>
    </Box>
  );
};

export default SideBar;
