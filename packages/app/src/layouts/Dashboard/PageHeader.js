import React from "react";
import {
  Box,
  Text,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Icon,
  Flex,
  Button,
} from "@chakra-ui/core";
import Container from "../../components/Container";
import Link from "../../components/Link";

const PageHeader = ({ actions = null, breadcrumbs = [] }) => {
  const renderActions = () => {
    if (!actions) return null;
    if (typeof actions === `function`) return actions();
    if (actions.length) {
      return actions.map((action, index) => {
        if (typeof action === `function`)
          return (
            <Box px="2" key={index}>
              {action()}
            </Box>
          );
        const { children } = action;
        return (
          <Box px="2" key={index}>
            <Button
              rounded="md"
              size="sm"
              shadow="md"
              variantColor="blue"
              variant="ghost"
              bg="white"
              {...action}
            >
              {children}
            </Button>
          </Box>
        );
      });
    }
  };
  return (
    <Box bg="cyan.400" py="4" pb="8rem" mb="-7rem">
      <Container>
        <Flex alignItems="center" justifyContent="space-between">
          <Box>
            {breadcrumbs.length || breadcrumbs === true ? (
              <Breadcrumb
                color="white"
                spacing="8px"
                separator={<Icon color="gray.300" name="chevron-right" />}
              >
                <BreadcrumbItem fontWeight="bold">
                  <BreadcrumbLink as={Link} href="/">
                    Dashboard
                  </BreadcrumbLink>
                </BreadcrumbItem>

                {breadcrumbs.length &&
                  breadcrumbs.map((breadcrumb, index) => (
                    <BreadcrumbItem key={index}>
                      {breadcrumb.path ? (
                        <BreadcrumbLink as={Link} href={breadcrumb.path}>
                          {breadcrumb.title}
                        </BreadcrumbLink>
                      ) : (
                        <Text as="span" color="gray.200">
                          {breadcrumb.title}
                        </Text>
                      )}
                    </BreadcrumbItem>
                  ))}
              </Breadcrumb>
            ) : null}
          </Box>
          <Flex mx={-2}>{renderActions()}</Flex>
        </Flex>
      </Container>
    </Box>
  );
};
export default PageHeader;
