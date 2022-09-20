import { lazy } from "react";

const routes = [
  { path: "/", element: lazy(() => import("../pages/GetWord")) },
  { path: "/addword", element: lazy(() => import("../pages/AddWord")) },
  { path: "/getword", element: lazy(() => import("../pages/GetWord")) },
];

export default routes;
