import { createBrowserRouter } from "react-router-dom";
import Home from "./Pages/Home";
import Users from "./Pages/Users";

const App = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/users",
    element: <Users />,
  },
]);

export default App;
