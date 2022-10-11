import { lazy, Suspense } from "react";
import { Route } from "react-router-dom";
import { SolutionOutlined, ScheduleOutlined } from "@ant-design/icons";
export const routes = [
  { key: "*", element: lazy(() => import("../components/404")) },
  {
    key: "addword/",
    element: lazy(() => import("../pages/AddWord")),
    label: "添加单词",
  },
  {
    key: "",
    element: lazy(() => import("../pages/GetWord")),
    label: "首页",
    index: 1,
  },
  {
    key: "login/",
    element: lazy(() => import("../pages/UserLogin")),
    label: "登录",
  },
  {
    key: "user/",
    element: lazy(() => import("../pages/User")),
    children: [
      {
        key: "",
        element: lazy(() => import("../pages/User/UserProfile")),
        label: "个人资料",
        index: 1,
        icon: <SolutionOutlined />,
      },
      {
        key: "/user/profile/",
        element: lazy(() => import("../pages/User/UserProfile")),
        label: "个人资料",
        icon: <SolutionOutlined />,
      },
      {
        key: "/user/session/:key",
        element: lazy(() => import("../pages/User/UserSession")),
        label: "进度管理",
        icon: <ScheduleOutlined />,
      },
    ],
  },
];

function deepMapRouter(router) {
  return router.map((e) => (
    <Route
      index={e.index === 1}
      key={e.key}
      path={e.key}
      element={
        <Suspense fallback={<>加载中</>}>
          <e.element />
        </Suspense>
      }
    >
      {e.children && deepMapRouter(e.children)}
    </Route>
  ));
}

export const mapRoutes = deepMapRouter(routes);
