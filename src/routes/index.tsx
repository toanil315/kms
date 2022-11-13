import DefaultLayout from "@/layouts/DefaultLayout";
import loadable from "@loadable/component";
import { useRoutes, RouteObject } from "react-router-dom";
import { basePath, PATHS } from "./constants";

const Home = loadable(() => import("@/containers/HomeContainer"));
const Turfs = loadable(() => import("@/containers/TurfsContainer"));

const routeList: RouteObject[] = [
  {
    path: basePath,
    element: <DefaultLayout />,
    children: [
      {
        path: PATHS.HOME,
        element: <Home />,
      },
      {
        path: PATHS.TURFS,
        element: <Turfs />,
      },
    ],
  },
];

const Routes = () => {
  const element = useRoutes(routeList);
  return element;
};

export default Routes;
