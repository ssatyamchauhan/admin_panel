import React from "react";
import { Redirect } from "react-router-dom";

// Layout Types
import { DefaultLayout } from "./layouts";

import Category from "./views/Category";
import News from "./views/News";
import Notifications from "./views/Notifications";
import Users from "./views/Users";

export default [
  {
    path: "/",
    exact: true,
    layout: DefaultLayout,
    component: () => <Redirect to="/category" />
  },
  {
    path: "/users",
    layout: DefaultLayout,
    component: Users
  },
  {
    path: "/category",
    layout: DefaultLayout,
    component: Category
  },
  {
    path: "/news",
    layout: DefaultLayout,
    component: News
  },
  {
    path: "/notification",
    layout: DefaultLayout,
    component: Notifications
  },
];
