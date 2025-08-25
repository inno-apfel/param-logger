import { Outlet, type RouteObject } from "react-router-dom";

import { ProtectedRoute } from '@/components/protected-route';
import { RedirectIfAuthenticated } from '@/components/redirect-if-authenticed';
import LandingPage from "@/pages/landing-page";
import Error404 from "@/pages/error-404";
import LoginPage from "@/pages/login-page";
import MyTanks from "@/pages/my-tanks";
import SignupPage from "@/pages/signup-page";
import TankPage from "@/pages/tank-page";
import Chat from "@/pages/chat";
import Account from "@/pages/account";


const routes: RouteObject[] = [
  {
    path: "/",
    element: <LandingPage/>,
  },
  {
    element: (
      <RedirectIfAuthenticated>
        <Outlet />
      </RedirectIfAuthenticated>
    ),
    children: [
      {
        path: "login",
        element: <LoginPage/>,
      },
      {
        path: "signup",
        element: <SignupPage/>,
      },
    ]
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
      {
        path: "/chat",
        element: <Chat/>,
      },
      {
        path: "/account",
        element: <Account/>,
      },
    ]
  },
];

export default routes;