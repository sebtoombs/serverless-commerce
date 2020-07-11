const Product = {
  name: "Product",
  title: "Product",
  pluralName: "Products",
  query: {
    by: ["_id", "name", "slug"],
  },
  fields: {
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
