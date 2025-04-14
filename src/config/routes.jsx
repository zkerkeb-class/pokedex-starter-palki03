import {
  createBrowserRouter,
} from "react-router";


import Home from "../Pages/Home";
import Pokemon from "../Pages/Pokemon";
import Menu from "../Pages/Menu";
import login from "../Pages/login";
import Nvcompte from "../Pages/Nvcompte";
import Donner from "../Pages/Donner";



let router = createBrowserRouter([
  {
    path: "/",
    Component: login,
  },
  {
    path: "/Home",
    Component: Home,
  },
  {
    path: "/pokemon/:id",
    Component: Pokemon,
  },
  {
      path: "/menu",
      Component: Menu,
    },
    {
      path: "/Nvcompte",
      Component: Nvcompte,
    },
    {
      path: "/Donner",
      Component: Donner,
    },
]);

export default router;