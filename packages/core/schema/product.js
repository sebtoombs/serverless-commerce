const product = {
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
    variations: {
      type: "[ProductVariation]",
      listType: "nested",
    },
    options: {
      type: "[ProductOption]",
    },
  },
};
export default product;
