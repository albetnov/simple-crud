import { createBrowserRouter } from "react-router-dom";
import CheckForAuth from "./Components/CheckForAuth";
import Login from "./Pages/Auth/Login";
import Register from "./Pages/Auth/Register";
import Home from "./Pages/Home";
import NotFound from "./Pages/NotFound";
import Users from "./Pages/Users";

const App = createBrowserRouter([
  {
    path: "*",
    element: <NotFound />,
  },
  {
    path: "*",
    element: <CheckForAuth />,
    children: [
      {
        path: "users",
        element: <Users />,
      },
    ],
  },
  {
    path: "/auth",
    element: <CheckForAuth inverse />,
    children: [
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
    ],
  },
  {
    path: "/",
    element: <Home />,
  },
]);

export default App;
