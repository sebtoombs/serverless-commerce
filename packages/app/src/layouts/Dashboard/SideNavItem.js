import React from "react";
import { Box, Button, Icon, Stack, Collapse } from "@chakra-ui/core";
import Link from "../../components/Link";

const SideNavItem = React.forwardRef(
  ({ children, icon, text, items, ...props }, ref) => {
    const [showItems, setShowItems] = React.useState(props.active);

    return (
      <Box>
        <Button
          variant="ghost"
          leftIcon={
            icon
              ? () => (
                  <Icon
                    name={icon}
                    color="gray.900"
                    position="absolute"
                    left="4"
                  />
                )
              : null
          }
          rounded="sm"
          display="flex"
          width="100%"
          justifyContent="flex-start"
          fontWeight="normal"
          color="gray.700"
          pl="12"
          pr="12"
          position="relative"
          cursor="pointer"
          ref={ref}
          onClick={() => setShowItems(!showItems)}
          {...props}
        >
          {!icon && text && (
            <Box
              as="span"
              mr="5"
              ml="1"
              color="gray.900"
              position="absolute"
              left="4"
            >
              {text}
            </Box>
          )}
          <Box as="span">{children}</Box>
          {items && items.length ? (
            <Icon
              name={"chevron-right"}
              color="gray.400"
              position="absolute"
              right="4"
              transform={showItems ? "rotate(90deg)" : ""}
              transition="0.2s ease"
            />
          ) : null}
        </Button>
        {items && items.length ? (
          <Collapse isOpen={showItems}>
            <Stack py="3px">
              {items.map((item, index) => item({ index }))}
            </Stack>
          </Collapse>
        ) : null}
      </Box>
    );
  }
);

export default SideNavItem;
