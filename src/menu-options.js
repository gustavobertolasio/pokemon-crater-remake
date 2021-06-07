import Home from "../src/pages/Home/Home";
import Newsletter from "../src/pages/Newsletter/Newsletter";
import PageNotFound from "../src/pages/PageNotFound/PageNotFound";
import Login from "../src/pages/Login/Login";
import Play from "../src/pages/Play/Play";

const MenuOptions = [
  {
    optionName: "Home",
    name: "home",
    path: "/home",
    component: <Home></Home>,
    menuItem: true,
  },
  {
    optionName: "News",
    name: "news",
    path: "/news",
    component: <Newsletter></Newsletter>,
    menuItem: true,
  },
  {
    optionName: "Play!",
    name: "play",
    path: "/play",
     component: <Play></Play>,
    menuItem: true,
  },
  {
    path: "/",
    component: <Home></Home>,
    menuItem: false,
  },
  {
    path: "/login",
    component: <Login></Login>,
    menuItem: false,
  },
  {
    path: "*",
    component: <PageNotFound></PageNotFound>,
    menuItem: false,
  },
];
export default MenuOptions;
