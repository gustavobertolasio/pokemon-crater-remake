import React, { useEffect, useState } from "react";
import Menu from "./components/Menu/Menu";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import MenuOptions from "../../menu-options";
import { getUserInfo } from "../../api/Api.js";
import UserContext from "../../contexts/UserContext";
import Languages from "./components/Languages/Languages";
import Loader from "../../shared/Loader/Loader";

function Main() {
  const [user, setUser] = useState(null);
  const value = { user, setUser };

  useEffect(() => {
    getUserInfo(1, "ID USERNAME TRAINER REGION AGE VICTORIES LOSSES", setUser);
  }, []);

  return (
    <>
      <UserContext.Provider value={value}>
        <Router>
          <Loader />
          <Menu />
          <Switch>
            {MenuOptions.map((options, index) => (
              <Route key={index} exact path={options.path}>
                {options.component}
              </Route>
            ))}
          </Switch>
          <Languages />
        </Router>
      </UserContext.Provider>
    </>
  );
}
export default Main;
