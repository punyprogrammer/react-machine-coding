import FileExplorerContainer from "../assets/components/file-explorer/FileExplorerContainer";
import Home from "../assets/components/home/Home";
import StarRatingContainer from "../assets/components/star-rating/StarRatingContainer";
import Switch from "../assets/components/switch/SwitchContainer";
import TimerContainer from "../assets/components/timer/TimerContainer";

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
];
