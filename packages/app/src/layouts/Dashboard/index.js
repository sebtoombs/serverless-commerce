import React from "react";
import { Box } from "@chakra-ui/core";
import { Global, css } from "@emotion/core";
import { useTheme } from "@chakra-ui/core";
import Container from "../../components/Container";

import Header from "./DashboardHeader";
import SideNav from "./SideNav";

const MainContent = ({ children }) => {
  return (
    <Box ml="280px">
      <Header />
      {children}
    </Box>
  );
};

const Dashboard = ({ children }) => {
  const theme = useTheme();

  return (
    <>
      <Global
        styles={css`
          body {
            background: ${theme.colors.gray[`100`]};
          }
        `}
      />
      <Box>
        <SideNav />
        <MainContent>{children}</MainContent>
      </Box>
    </>
  );
};
export default Dashboard;
