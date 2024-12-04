import Home from "../src/pages/Home/Home";
import Newsletter from "../src/pages/Newsletter/Newsletter";
import PageNotFound from "../src/pages/PageNotFound/PageNotFound";
import Login from "../src/pages/Login/Login";
import Play from "../src/pages/Play/Play";
import Register from "../src/pages/Register/Register";
import Store from "./pages/Store/Store";

export const MenuOptions = [
  {
    optionName: "Home",
    name: "home",
    path: "/home",
    component: <Home></Home>,
    menuItem: true,
    onlyAuthenticated: true,
  },
  {
    optionName: "News",
    name: "news",
    path: "/news",
    component: <Newsletter></Newsletter>,
    menuItem: true,
    onlyAuthenticated: false,
  },
  {
    optionName: "Play!",
    name: "play",
    path: "/play",
    component: <Play></Play>,
    menuItem: true,
    onlyAuthenticated: true,
  },
  {
    optionName: "Pokécenter",
    name: "store",
    path: "/store",
    component: <Store></Store>,
    menuItem: true,
    onlyAuthenticated: true,
  },
  {
    path: "/",
    component: <Newsletter></Newsletter>,
    menuItem: false,
    onlyAuthenticated: false,
  },
  {
    path: "/login",
    component: <Login></Login>,
    menuItem: false,
    onlyAuthenticated: false,
  },
  {
    path: "/register",
    component: <Register></Register>,
    menuItem: false,
    onlyAuthenticated: false,
  },
  {
    path: "*",
    component: <PageNotFound></PageNotFound>,
    menuItem: false,
  },
];

export const onlyAuth = (path) => {
  return (
    MenuOptions.find((option) => option.path === path)?.onlyAuthenticated ||
    false
  );
};



