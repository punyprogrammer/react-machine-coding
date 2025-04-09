import { createBrowserRouter, RouterProvider } from "react-router";

import "./App.css";
import { routesConfig } from "./utils/routeConfig.jsx";
const routerConfig = createBrowserRouter(routesConfig);
function App() {
  return (
    <>
      <RouterProvider router={routerConfig} />
    </>
  );
}

export default App;
