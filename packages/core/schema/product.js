const Product = {
  name: "Product",
  pluralName: "Products",
  fields: {
    test: {
      label: "Do you want to do the thing?",
      type: "Boolean",
      hidden: true,
    },
    prices: {
      type: "[Int]",
    },
    name: {
      type: "String",
    },
    slug: {
      type: "Slug",
      generate: {
        from: "name",
      },
    },
    variants: {
      type: "[ProductVariant]",
      listType: "nested", //or relation. nested is a sub-document
    },
    options: {
      type: "[ProductOption]",
    },
  },
};
export default Product;
