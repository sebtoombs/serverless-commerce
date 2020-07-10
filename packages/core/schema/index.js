import Product from "./Product";
import ProductVariant from "./ProductVariant";
import ProductOption from "./ProductOption";
import ProductVariantSelectedOption from "./ProductVariantSelectedOption";

const schema = {
  Product,
  ProductVariant,
  ProductOption,
  ProductVariantSelectedOption,
  Slug: {
    fields: {
      value: { type: "String" },
    },
  },
};

export default schema;
