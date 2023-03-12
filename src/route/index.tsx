import { lazy } from "react";

import { Navigate } from "react-router-dom";

import Login from "@/pages/Login/Login";
const Layout = lazy(() => import("@/pages/Layout"));
const My = lazy(() => import("@/pages/My"));
const Video = lazy(() => import("@/pages/Video"));
const Qa = lazy(() => import("@/pages/Qa"));
const Home = lazy(() => import("@/pages/Home"));

const route = [
  {
    path: "/",
    element: <Navigate to="/home"></Navigate>,
  },
  {
    path: "/home",
    element: <Layout></Layout>,
    children: [
      {
        path: "/home",
        element: <Navigate to="/home/index"></Navigate>,
      },
      {
        path: "/home/index",
        element: <Home></Home>,
      },
      {
        path: "/home/video",
        element: <Video></Video>,
      },
      {
        path: "/home/qa",
        element: <Qa></Qa>,
      },

      {
        path: "/home/my",
        element: <My></My>,
      },
    ],
  },
  {
    path: "/login",
    element: <Login></Login>,
  },

  {
    path: "*",
    element: <Navigate to="/home"></Navigate>,
  },
];

export default route;
