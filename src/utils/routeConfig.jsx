import Home from "../assets/components/home/Home";
import Switch from "../assets/components/switch/SwitchContainer";

export const routesConfig = [
  {
    path: "/",
    heading: "This is the home page",
    element: <Home />,
  },
  {
    path: "/switch",
    heading: "Build a switch component in react",
    element: <Switch />,
  },
];
