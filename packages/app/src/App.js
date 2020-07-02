import React from "react";

import { CacheProvider } from "@emotion/core";
import { ApolloProvider } from "@apollo/react-hooks";
import { useApollo } from "./lib/apolloClient";
import { ThemeProvider, CSSReset } from "@chakra-ui/core";

import { cache } from "emotion";

//import { globalStyles } from "../shared/styles";
import theme from "./theme";

//import Home from "./pages/index";

import { Router as ReachRouter } from "@reach/router";

import Home from "./pages/index";
import Products from "./pages/products";
import Product from "./pages/products/[product]";

const Router = () => (
  <ReachRouter>
    <Home path="/" />
    <Products path="/products" />
    <Product path="/products/:product" />
  </ReachRouter>
);

export default function App({ Comonent }) {
  const apolloClient = useApollo({});

  return (
    <ApolloProvider client={apolloClient}>
      <CacheProvider value={cache}>
        <ThemeProvider theme={theme}>
          {/*globalStyles*/}
          <CSSReset />
          <Router />
        </ThemeProvider>
      </CacheProvider>
    </ApolloProvider>
  );
}
