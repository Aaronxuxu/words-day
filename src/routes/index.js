import { lazy } from "react";

const routes = [
  { path: "/", element: lazy(() => import("../pages/GetWord")) },
  { path: "/addword", element: lazy(() => import("../pages/AddWord")) },
  { path: "/getword", element: lazy(() => import("../pages/GetWord")) },
  { path: "/login", element: lazy(() => import("../pages/UserLogin")) },
  { path: "/userInfo", element: lazy(() => import("../pages/UserInfo")) },
];

export default routes;
