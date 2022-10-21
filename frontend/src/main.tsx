import { ChakraProvider } from "@chakra-ui/react";
import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { RouterProvider } from "react-router-dom";
import appRoutes from "./App";
import store from "./Store/Auth";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ChakraProvider>
      <Provider store={store}>
        <RouterProvider router={appRoutes} />
      </Provider>
    </ChakraProvider>
  </React.StrictMode>
);
