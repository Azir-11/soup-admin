const about: AuthRoute.Route = {
  path: "/about",
  name: "about",
  component: "self",
  meta: {
    singleLayout: "basic",
    title: "关于",
    icon: "fluent:book-information-24-regular",
    order: 8,
  },
};

export default about;
