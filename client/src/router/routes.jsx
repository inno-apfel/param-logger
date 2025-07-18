import TankPage from "../pages/tank-page";
import LoginPage from "../pages/login-page";
import SignupPage from "../pages/signup-page";
import Error404 from "../pages/error-404";
import MyTanks from "../pages/my-tanks";
import LandingPage from "../pages/landing-page";

const routes = [
  {
    path: "my-tanks",
    element: <MyTanks />,
  },
  {
    path: "/dashboard/:tankId",
    element: <TankPage />,
    errorElement: <Error404 />,
  },
  {
    path: "login",
    element: <LoginPage />,
  },
  {
    path: "signup",
    element: <SignupPage />,
  },
  {
    path: "/",
    element: <LandingPage />,
  },
];

export default routes;