import React from "react";
import Dashboard from "../../layouts/Dashboard";
import PageHeader from "../../layouts/Dashboard/PageHeader";
import Container from "../../components/Container";

import schema from "@serverless-commerce/core/schema";

import {
  Box,
  Flex,
  Stack,
  Switch,
  Input,
  FormLabel,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberDecrementStepper,
  NumberIncrementStepper,
  InputGroup,
  InputRightElement,
  Button,
} from "@chakra-ui/core";

export const FormContext = React.createContext();
export const useForm = () => useContext(FormContext);
export const FormProvider = ({ children, fields }) => {
  const [formState, setFormState] = React.useState();

  const getFieldValue = (fieldName) => {
    return typeof formState[fieldName] !== `undefined`
      ? formState[fieldName]
      : null;
  };
  const setFieldValue = (fieldName, value) => {
    setFormState({ ...formState, [fieldName]: value });
  };

  return (
    <FormContext.Provider
      value={{
        getFieldValue,
        setFieldValue,
      }}
    >
      {children}
    </FormContext.Provider>
  );
};

const isScalarField = (fieldType) =>
  ["String", "Float", "Boolean", "Int"].indexOf(fieldType) !== -1;

const resolveBaseFieldType = (fieldType) => {
  if (isScalarField(fieldType)) return fieldType;
  if (`Slug` === fieldType) return `String`;
  return fieldType;
};
const isKnownType = (fieldType) => {
  if (isScalarField(fieldType)) return true;
  if (typeof schema[fieldType.toLowerCase()] !== `undefined`) return true;
  return false;
};
const getFieldListType = (fieldType) => {
  const m = fieldType.match(/^\[(.*?)\]$/);
  return m ? m[1] : false;
};

const FieldWrap = ({ children, ...props }) => {
  return <Box {...props}>{children}</Box>;
};

const fieldPadding = { x: "5", y: "3" };

const ProductPage = () => {
  const renderField = (fieldName, index) => {
    const field = schema.product.fields[fieldName];

    const fieldBaseType = resolveBaseFieldType(field.type);

    const fieldListType = getFieldListType(fieldBaseType);

    const fieldSingleType = fieldListType ? fieldListType : fieldBaseType;

    if (!isKnownType(fieldSingleType)) {
      return (
        <FieldWrap key={index}>
          {renderUnknownFieldType({
            ...field,
            fieldName,
            fieldType: fieldSingleType,
          })}
        </FieldWrap>
      );
    }

    if (fieldListType) {
      if (
        isScalarField(fieldListType) ||
        (typeof field.listType !== `undefined` && field.listType === "nested")
      ) {
        return (
          <FieldWrap key={index}>
            {renderRepeaterField({
              ...FieldWrap,
              fieldName,
              fieldType: fieldListType,
            })}
          </FieldWrap>
        );
      } else {
        return (
          <FieldWrap key={index}>
            <p>Nested {fieldListType}</p>
          </FieldWrap>
        );
      }
    } else {
      return (
        <FieldWrap key={index}>
          {renderSingleFieldType({
            ...field,
            fieldName,
            fieldType: fieldSingleType,
          })}
        </FieldWrap>
      );
    }
  };

  const renderFieldLabel = (field) => {
    if (typeof field.label !== `undefined`) return field.label;
    return field.fieldName.charAt(0).toUpperCase() + field.fieldName.substr(1);
  };

  const renderRepeaterField = ({ fieldType, fieldName, ...field }) => {
    const [rows, setRows] = React.useState([{ value: null }]);
    const addRow = () => setRows([...rows, { value: null }]);
    const removeRow = (index) => {};
    return (
      <Box py={fieldPadding.y}>
        <FormLabel minWidth="xs" px={fieldPadding.x}>
          {renderFieldLabel({ fieldName, ...field })}
        </FormLabel>
        <Stack spacing={fieldPadding.y}>
          {rows.map((row, index) => (
            <Box px={fieldPadding.x} key={index}>
              {renderSingleFieldType({ fieldName, fieldType, ...field })}
            </Box>
          ))}
        </Stack>
      </Box>
    );
  };

  const renderSingleFieldType = ({ fieldType, fieldName, ...field }) => {
    if (fieldType === `Boolean`) {
      return (
        <Box px={fieldPadding.x} py={fieldPadding.y}>
          <FormLabel minWidth="xs" htmlFor={fieldName}>
            {renderFieldLabel({ fieldName, ...field })}
          </FormLabel>
          <Switch id={fieldName} />
        </Box>
      );
    }
    if (fieldType === `Float` || fieldType === `Int`) {
      return (
        <Flex px={fieldPadding.x} py={fieldPadding.y} align="center">
          <FormLabel minWidth="xs" htmlFor={fieldName}>
            {renderFieldLabel({ fieldName, ...field })}
          </FormLabel>
          <NumberInput
            precision={fieldType === `Float` ? 2 : 0}
            step={fieldType === `Float` ? 0.1 : 1}
          >
            <NumberInputField />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
        </Flex>
      );
    }
    return (
      <Flex px={fieldPadding.x} py={fieldPadding.y} align="center">
        <FormLabel minWidth="xs" htmlFor={fieldName}>
          {renderFieldLabel({ fieldName, ...field })}
        </FormLabel>
        {field.type === `Slug` ? (
          <InputGroup width="100%">
            <Input
              placeholder={
                typeof field.placeholder !== `undefined`
                  ? field.placeholder
                  : null
              }
            />
            <InputRightElement width="4.5rem">
              <Button h="1.75rem" size="sm">
                Auto
              </Button>
            </InputRightElement>
          </InputGroup>
        ) : null}
        {field.type !== `Slug` && (
          <Input
            placeholder={
              typeof field.placeholder !== `undefined`
                ? field.placeholder
                : null
            }
          />
        )}
      </Flex>
    );
  };

  const renderUnknownFieldType = ({ fieldName, fieldType }) => {
    return (
      <Box px={fieldPadding.x} py={fieldPadding.y} color="orange.600">
        Unknown field type <strong>{fieldType}</strong> for field{" "}
        <strong>{fieldName}</strong>
      </Box>
    );
  };

  return (
    <Dashboard>
      <PageHeader
        breadcrumbs={[
          { title: "Products", path: "/products" },
          { title: "Edit" },
        ]}
        actions={[
          {
            children: "Save",
            variantColor: "blue",
            variant: "solid",
            bg: "blue.500",
          },
        ]}
      ></PageHeader>
      <Container>
        <FormProvider>
          <Stack bg="white" shadow="md" rounded="md">
            {Object.keys(schema.product.fields).map((fieldName, index) =>
              renderField(fieldName, index)
            )}
          </Stack>
        </FormProvider>
      </Container>
    </Dashboard>
  );
};

export default ProductPage;
