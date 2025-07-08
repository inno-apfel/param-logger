import TankPage from "../pages/tank-page";
import LoginPage from "../pages/login-page";
import SignupPage from "../pages/signup-page";
import Error404 from "../pages/error-404";

const routes = [
  {
    path: "/",
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
];

export default routes;