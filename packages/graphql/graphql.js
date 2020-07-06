const { ApolloServer, gql } = require("apollo-server-lambda");
const jwt = require("jsonwebtoken");
const graphql = require("graphql");
//const { addResolversToSchema } = require("graphql-tools");
const { makeExecutableSchema } = require("@graphql-tools/schema");

const JWT_SECRET = process.env.JWT_SECRET;

const connection = require("./database/connection");
const buildObjectType = require("./graphql/util/buildObjectType");
const buildFilters = require("./graphql/util/buildFilters");

const {
  StringFilterType,
  IntFilterType,
  FloatFilterType,
  BooleanFilterType,
} = require("./graphql/util/scalarFilterTypes");

const ProductType = require("./graphql/types/Product");
const ProductVariation = require("./graphql/types/ProductVariation");
const ProductOptions = require("./graphql/types/ProductOptions");
const ProductVariationSelectedOption = require("./graphql/types/ProductVariationSelectedOption");
const { ObjectId } = require("mongodb");

/**
 * For each type need
 * - the typeDef
 * - field resolvers
 * - root resolver?
 * - input type def
 * - filter type def
 */

/**
 * Documents
 * - Shop [ URL, Name, ]
 * - Product [ Variations ]
 * - User [ Role, Team_IDs ]
 * - Team [ Roles ]
 * - Order [ Items, Payments, Shipments, User_ID? ]
 * - Customer [ Order_IDs ]
 * - Cart [ Items, User_ID? ]
 *
 *
 * Mutations
 * - product CRUD
 * - user register
 * - team CRUD
 *
 *
 * Queries
 *
 */

/*const typeDefs = gql`
  type Shop {
    _id: String
    name: String
    url: String
    name: String
    products: [Product]
  }
  type Product {
    name: String
    slug: String
    variations: [ProductVariation]
    options: [ProductOptions]
  }
  type ProductVariation {
    selectedOptions: [ProductSelectedOption]
    sku: String
    price: Float
    weight: Float
    weightUnit: String

  }
  type ProductOptions {
    name: String
    values: [String]
  }
  type ProductSelectedOption {
    name: String
    value: String
  }

  type Mutation {

  }
  type Query {
    shop(_id: String): Shop
    product(shopId: String, _id: String, slug: String) : Product
  }
`;*/

const ProductVariationInputType = new graphql.GraphQLInputObjectType({
  name: "ProductVariationInputType",
  fields: () => ({
    price: {
      type: graphql.GraphQLFloat,
    },
  }),
  type: graphql.GraphQLInputType,
});

const ProductInputType = new graphql.GraphQLInputObjectType({
  name: "ProductInputType",
  fields: () => ({
    name: {
      type: graphql.GraphQLString,
    },
    variations: {
      type: graphql.GraphQLList(ProductVariationInputType),
    },
  }),
  type: graphql.GraphQLInputType,
});

/*const mutationType = new graphql.GraphQLObjectType({
  name: "Mutation",
  fields: () => ({
    createProduct: {
      type: ProductType,
      args: {
        product: { type: ProductInputType },
      },
      resolve: async (value, { product }) => {
        const { db, client } = await connection();
        const r = await db.collection("products").insertOne(product);
        client.close();
        return r;
      },
    },
  }),
});

var schema = new graphql.GraphQLSchema({
  query: queryType,
  mutation: mutationType,
});*/

const types = {
  //Basic scalar input filters
  StringFilterType: buildObjectType(StringFilterType),
  FloatFilterType: buildObjectType(FloatFilterType),
  IntFilterType: buildObjectType(IntFilterType),
  BooleanFilterType: buildObjectType(BooleanFilterType),
  //Types
  Product: buildObjectType(ProductType),
  ProductFilterType: buildObjectType(buildFilters(ProductType)),
  ProductVariation: buildObjectType(ProductVariation),
  ProductVariationFilterType: buildObjectType(buildFilters(ProductVariation)),
  ProductOptions: buildObjectType(ProductOptions),
  ProductOptionsFilterType: buildObjectType(buildFilters(ProductOptions)),
  ProductVariationSelectedOption: buildObjectType(
    ProductVariationSelectedOption
  ),
  ProductVariationSelectedFilterType: buildObjectType(
    buildFilters(ProductVariationSelectedOption)
  ),
};

const typeDefsAuto = Object.keys(types).map((typeName) => {
  return types[typeName].typeDef;
}, []);

const typeDefs = [
  ...typeDefsAuto,
  buildObjectType(ProductInputType).typeDef,
  buildObjectType(ProductVariationInputType).typeDef,
  `type Query {
    products(filter: ProductFilterType): [Product]
    product(_id: String) : Product
  }`,
  `type Mutation {
    createProduct(product: ProductInputType): Product
    deleteProduct(_id:String) : Boolean
  }`,
];

/*
Build resolvers from types
This is for the case where a type has a resolver for a specific field
*/
const resolversAuto = Object.keys(types).reduce((a, typeName) => {
  if (types[typeName].resolve) a[typeName] = types[typeName].resolve;
  return a;
}, {});

const resolvers = {
  ...resolversAuto,
  Query: {
    products: async (parent, args, context, info) => {
      // Turn the args.filter into something mongodb can use
      // luckily our filter type is pretty much a straight plug into mongodb
      const filter = {};
      if (args.filter) {
        Object.keys(args.filter).map((key) => {
          filter[key] = {};
          Object.keys(args.filter[key]).map((compareKey) => {
            filter[key][`$${compareKey}`] = args.filter[key][compareKey];
          });
        });
      }

      //Query the databse
      const { db, client } = await connection();
      const r = await db.collection("products").find(filter);

      const results = await r.toArray();

      client.close();
      return results;
    },
    product: async (_, { _id }) => {
      const { db, client } = await connection();
      const r = await db.collection("products").findOne({ _id });
      client.close();
      return r;
    },
  },

  Mutation: {
    createProduct: async (_, { product }) => {
      delete product._id;
      const { db, client } = await connection();
      const r = await db.collection("products").insertOne(product);
      client.close();
      return r.ops[0];
    },
    deleteProduct: async (_, { _id }) => {
      const { db, client } = await connection();
      const r = await db
        .collection("products")
        .deleteOne({ _id: ObjectId(_id) });
      client.close();
      return r.deletedCount === 1;
    },
  },
};

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

const server = new ApolloServer({
  context: ({ req }) => {
    let user = null;
    try {
      const token = req.headers.authorization.replace("Bearer ", "");
      user = jwt.verify(token, JWT_SECRET);
    } catch (error) {}
    return { user };
  },
  //typeDefs,
  //resolvers,
  schema: schema,
  playground: {
    endpoint: "/dev/graphql",
  },
});

exports.handler = server.createHandler();
