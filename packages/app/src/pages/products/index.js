import React from "react";
import { useEffect, useMemo } from "react";
import useRouter from "../../lib/useRouter";

import {
  Box,
  PseudoBox,
  Text,
  Button,
  IconButton,
  Menu,
  MenuList,
  MenuButton,
  MenuItem,
  Flex,
} from "@chakra-ui/core";

import { MdMoreVert } from "react-icons/md";

import Dashboard from "../../layouts/Dashboard";
import Container from "../../components/Container";
import PageHeader from "../../layouts/Dashboard/PageHeader";

import {
  useTable,
  useGroupBy,
  useFilters,
  useSortBy,
  useExpanded,
  usePagination,
} from "react-table";

import { useQuery, useLazyQuery } from "@apollo/react-hooks";
import { NetworkStatus } from "apollo-client";
import gql from "graphql-tag";

import Link from "../../components/Link";

const ALL_PRODUCTS_QUERY = gql`
  query {
    products {
      _id
      name
    }
  }
`;

function Table({ columns, data, loading, error, refetch }) {
  // Use the state and functions returned from useTable to build your UI
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({
    columns,
    data,
  });

  const router = useRouter();

  // Render the UI for your table
  return (
    <Box bg="white" rounded="md" shadow="md">
      <Box py="2" px="4">
        <Text fontSize="xl">Products</Text>
      </Box>
      <Box as="table" width="100%" {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <PseudoBox
              as="tr"
              bg="gray.100"
              borderBottom="1px solid"
              borderBottomColor="gray.200"
              {...headerGroup.getHeaderGroupProps()}
            >
              {headerGroup.headers.map((column) => (
                <PseudoBox
                  as="th"
                  textAlign="left"
                  p="2"
                  fontSize="xs"
                  fontWeight="normal"
                  textTransform="uppercase"
                  color="gray.600"
                  _first={{ pl: "4" }}
                  _last={{ pr: "4" }}
                  {...column.getHeaderProps()}
                >
                  {column.render("Header")}
                </PseudoBox>
              ))}
            </PseudoBox>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {loading && (
            <PseudoBox as="tr">
              <PseudoBox as="td" colspan="1000" py="2" px="4" color="gray.900">
                <Box>Loading</Box>
              </PseudoBox>
            </PseudoBox>
          )}
          {error && (
            <PseudoBox as="tr">
              <PseudoBox as="td" colspan="1000" py="2" px="4" color="gray.900">
                <Flex align="center" color="orange.700">
                  Error loading products{" "}
                  <Button size="sm" ml="3" onClick={() => refetch()}>
                    Try again
                  </Button>
                </Flex>
              </PseudoBox>
            </PseudoBox>
          )}
          {rows.map((row, i) => {
            prepareRow(row);
            return (
              <PseudoBox
                as="tr"
                borderBottom="1px solid"
                borderBottomColor="gray.200"
                _last={{ borderBottomWidth: 0 }}
                _hover={{ cursor: "pointer", bg: "gray.100" }}
                {...row.getRowProps()}
              >
                {row.cells.map((cell) => {
                  return (
                    <PseudoBox
                      as="td"
                      px="2"
                      py="2"
                      width="100%"
                      color="gray.900"
                      _first={{ pl: "4" }}
                      _last={{ pr: "4" }}
                      {...cell.getCellProps()}
                    >
                      {cell.render("Cell")}
                    </PseudoBox>
                  );
                })}
              </PseudoBox>
            );
          })}
        </tbody>
      </Box>
    </Box>
  );
}

export default function Product() {
  const columns = React.useMemo(() => [
    {
      Header: "Name",
      accessor: "name",
      Cell: ({ row }) => <Text fontWeight="bold">{row.values.name}</Text>,
    },
    {
      accessor: "_id",
      Cell: ({ row }) => (
        <Menu>
          <MenuButton
            as={IconButton}
            icon={MdMoreVert}
            variant="ghost"
            rounded="full"
            size="sm"
            fontSize="lg"
            color="gray.500"
          ></MenuButton>
          <MenuList>
            <MenuItem>Download</MenuItem>
            <MenuItem>Create a Copy</MenuItem>
            <MenuItem>Mark as Draft</MenuItem>
            <MenuItem color="red.500">Delete</MenuItem>
          </MenuList>
        </Menu>
      ),
    },
  ]);

  /*const {
    loading,
    error,
    data,
    fetchMore,
    networkStatus,
    refetch: _refetch,
  } = useQuery(ALL_PRODUCTS_QUERY, {
    //variables: allPostsQueryVars,
    // Setting this value to true will make the component rerender when
    // the "networkStatus" changes, so we are able to know if it is fetching
    // more data
    notifyOnNetworkStatusChange: true,
  });
  //console.log(refetch());
  //console.log(_data);
  //const data = [{ name: "Test" }, { name: "test2" }];*/

  const [getProducts, { loading, data, error }] = useLazyQuery(
    ALL_PRODUCTS_QUERY
  );

  const refetch = () => {
    getProducts();
  };

  React.useEffect(() => {
    getProducts();
  }, []);

  return (
    <Dashboard>
      <PageHeader
        actions={[{ children: "New", as: Link, href: `/products/new` }]}
      ></PageHeader>
      <Container>
        <Table
          columns={columns}
          data={(data && data.products) || []}
          loading={loading}
          error={error}
          refetch={refetch}
        />
      </Container>
    </Dashboard>
  );
}
