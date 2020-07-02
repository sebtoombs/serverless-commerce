import React from "react";
import {
  Box,
  Flex,
  Menu,
  MenuButton,
  MenuList,
  MenuGroup,
  MenuItem,
  MenuDivider,
  Avatar,
  PseudoBox,
  Icon,
  IconButton,
  AvatarBadge,
  InputGroup,
  InputLeftElement,
  Input,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverArrow,
  PopoverCloseButton,
  PopoverHeader,
  PopoverBody,
  Text,
  Stack,
} from "@chakra-ui/core";
import Container from "../../components/Container";

export const AvatarButton = React.forwardRef(
  ({ children, name, ...props }, ref) => (
    <PseudoBox
      as="button"
      display="flex"
      alignItems="center"
      ref={ref}
      rounded="full"
      p="1"
      variant="ghost"
      color="white"
      _hover={{ bg: "transparent", color: "cyan.100" }}
      _focus={{ bg: "transparent" }}
      _active={{ bg: "cyan.300" }}
      {...props}
    >
      <Avatar name={name} size="sm" color="white" />
      <Box as="span" ml="2">
        {children}
      </Box>
    </PseudoBox>
  )
);

const Header = () => {
  return (
    <Box
      bg="cyan.400"
      py="4"
      borderBottom="1px solid"
      borderBottomColor="cyan.100"
    >
      <Container fluid>
        <Flex justify="space-between" align="center">
          <Box>
            <InputGroup>
              <InputLeftElement
                children={<Icon name="search" color="gray.300" />}
              />
              <Input type="search" placeholder="Search" rounded="full" />
            </InputGroup>
          </Box>
          <Flex alignItems="center" mx={-2}>
            <Box px="2">
              <Popover>
                <PopoverTrigger>
                  <IconButton
                    aria-label="Notifications"
                    icon="bell"
                    rounded="full"
                    variant="ghost"
                    color="white"
                    _hover={{ bg: "transparent", color: "cyan.100" }}
                    _focus={{ bg: "transparent" }}
                    _active={{ bg: "cyan.300" }}
                    fontSize="xl"
                    icon={() => (
                      <>
                        <Icon name="bell" />
                        <AvatarBadge
                          as="span"
                          size="0.65em"
                          bg="orange.500"
                          borderWidth="0.1em"
                          right="0.25em"
                          bottom="0.25em"
                        />
                      </>
                    )}
                  />
                </PopoverTrigger>
                <PopoverContent zIndex={4}>
                  <PopoverArrow />
                  <PopoverCloseButton />
                  <PopoverHeader>
                    <Text color="cyan.400" as="span" fontWeight="bold">
                      12
                    </Text>{" "}
                    Notifications
                  </PopoverHeader>
                  <PopoverBody>
                    <Stack>
                      <Box>Notification</Box>
                    </Stack>
                  </PopoverBody>
                </PopoverContent>
              </Popover>
            </Box>
            <Box px="2">
              <Menu>
                <MenuButton as={AvatarButton} name="Seb Toombs">
                  Profile
                </MenuButton>
                <MenuList>
                  <MenuGroup title="Profile">
                    <MenuItem>My Account</MenuItem>
                    <MenuItem>Payments </MenuItem>
                  </MenuGroup>
                  <MenuDivider />
                  <MenuGroup title="Help">
                    <MenuItem>Docs</MenuItem>
                    <MenuItem>FAQ</MenuItem>
                  </MenuGroup>
                </MenuList>
              </Menu>
            </Box>
          </Flex>
        </Flex>
      </Container>
    </Box>
  );
};
export default Header;
