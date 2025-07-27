import { Outlet, type RouteObject } from "react-router-dom";

import { ProtectedRoute } from '@/components/protected-route';
import LandingPage from "@/pages/landing-page";
import Error404 from "@/pages/error-404";
import LoginPage from "@/pages/login-page";
import MyTanks from "@/pages/my-tanks";
import SignupPage from "@/pages/signup-page";
import TankPage from "@/pages/tank-page";


const routes: RouteObject[] = [
  {
    path: "login",
    element: <LoginPage/>,
  },
  {
    path: "signup",
    element: <SignupPage/>,
  },
  {
    path: "/",
    element: <LandingPage/>,
  },
  {
    element: (
      <ProtectedRoute>
        <Outlet />
      </ProtectedRoute>
    ),
    children: [
      {
        path: "my-tanks",
        element: <MyTanks/>,
      },
      {
        path: "/dashboard/:tankId",
        element: <TankPage/>,
        errorElement: <Error404 />,
      },
    ]
  },
];

export default routes;