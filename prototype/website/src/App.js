import "./styles/App.scss";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MapPage from "./MapPage";
import HomePage from "./HomePage";

const router = createBrowserRouter([
  { path: "/", Component: HomePage },
  { path: "/map", Component: MapPage },
]);

const UUNetwork = true
if (UUNetwork) {
  window.apiUrl = 'hydeprod.geo.uu.nl'
} else {
  window.apiUrl = 'localhost'
}

export default function App() {
  return <RouterProvider router={router} />;
}
