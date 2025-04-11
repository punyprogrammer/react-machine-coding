import FileExplorerContainer from "../assets/components/file-explorer/FileExplorerContainer";
import Home from "../assets/components/home/Home";
import StarRatingContainer from "../assets/components/star-rating/StarRatingContainer";
import Switch from "../assets/components/switch/SwitchContainer";
import ThemeSwitch from "../assets/components/theme-switch/ThemeSwitch";
import TimerContainer from "../assets/components/timer/TimerContainer";
import TrafficLight from "../assets/components/traffic-lights/TrafficLight";

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
  {
    path: "/star-rating",
    heading: "Build a star rating component",
    element: <StarRatingContainer />,
  },
  {
    path: "/timer",
    heading: "Build a stop watch in react",
    element: <TimerContainer />,
  },
  {
    path: "/file-explorer",
    heading: "Build a file explorer",
    element: <FileExplorerContainer />,
  },
  {
    path: "theme-switch",
    heading: "Build a Theme Swicther",
    element: <ThemeSwitch />,
  },
  {
    path: "traffic-lights",
    heading: "Build a traffic light system",
    element: <TrafficLight />,
  },
];
