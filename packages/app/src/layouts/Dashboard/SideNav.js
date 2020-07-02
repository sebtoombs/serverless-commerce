import React from "react";
import { Box, Stack } from "@chakra-ui/core";
import Link from "../../components/Link";
import useRouter from "../../lib/useRouter";

import SideNavItem from "./SideNavItem";
import SideNavSubItem from "./SideNavSubItem";

import config from "../../config";
const navigation = config.navigation;

const SideNav = () => {
  const router = useRouter();

  const pathMatch = (path) => {
    return path.toLowerCase() === router.pathname.toLowerCase();
  };

  const isActiveItem = (items, path) => {
    if (!items.length && pathMatch(path)) return true;
    else if (items.length) {
      const activeChild = items.find((item) => {
        const subPath = path ? `${path}${item.path}` : item.path;
        return pathMatch(subPath);
      });
      if (activeChild) return true;
    }
    return false;
  };

  return (
    <Box
      as="nav"
      position="fixed"
      top="0"
      left="0"
      maxWidth="280px"
      width="100%"
      overflowY="auto"
      bg="white"
      height="100%"
      px="2"
      py="1"
    >
      <Stack>
        {navigation &&
          Object.keys(navigation).map((key, index) => {
            const item = navigation[key];
            const {
              icon = null,
              text = null,
              path = null,
              title,
              items = [],
            } = item;

            const subItems = items.map((item) => {
              const { title } = item;
              const subPath = path ? `${path}${item.path}` : item.path;
              return ({ index }) => (
                <SideNavSubItem key={index} as={Link} href={subPath}>
                  {title}
                </SideNavSubItem>
              );
            });

            return (
              <SideNavItem
                key={index}
                icon={icon}
                text={text}
                as={path && !items.length ? Link : null}
                href={path && !items.length ? path : null}
                items={subItems}
                active={isActiveItem(items, path)}
              >
                {title}
              </SideNavItem>
            );
          })}
      </Stack>
    </Box>
  );
};

export default SideNav;
