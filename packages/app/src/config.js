const config = {
  navigation: {
    dashboard: {
      path: "/",
      component: "dashboard",
      title: "Dashboard",
      text: "D",
    },
    products: {
      path: "/products",
      title: "Products",
      text: "P",
      items: [
        {
          title: "Products",
          path: "",
        },
        {
          title: "New",
          path: "/new",
        },
      ],
    },
  },
};
export default config;
