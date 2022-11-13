import DefaultLayout from "@/layouts/DefaultLayout";
import loadable from "@loadable/component";
import { useRoutes, RouteObject } from "react-router-dom";
import { basePath, PATHS } from "./constants";

const Home = loadable(() => import("@/containers/HomeContainer"));
const Turfs = loadable(() => import("@/containers/TurfsContainer"));
const BookTurf = loadable(() => import("@/containers/BookTurfContainer"));

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
        path: `${PATHS.TURFS}/:id`,
        element: <Turfs />,
      },
      {
        path: `${PATHS.BOOK_TURF}/:id`,
        element: <BookTurf />,
      },
    ],
  },
];

const Routes = () => {
  const element = useRoutes(routeList);
  return element;
};

export default Routes;
