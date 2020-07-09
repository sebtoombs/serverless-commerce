const ProductVariant = {
  name: "ProductVariant",
  pluralName: "ProductVariants",
  fields: {
    selectedOptions: {
      label: "Options",
      type: "[ProductVariantSelectedOption]",
      listType: "nested",
    },
    sku: { label: "SKU", type: "String" },
    price: { type: "Float" },
    weight: { type: "Float" },
    weightUnit: { type: "String" },
  },
};
export default ProductVariant;
