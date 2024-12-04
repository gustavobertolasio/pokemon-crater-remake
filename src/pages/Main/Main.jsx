import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import styled from "styled-components";
import UserContext from "../../contexts/UserContext";
import { MenuOptions, onlyAuth } from "../../menu-options";
import Loader from "../../shared/Loader/Loader";
import { colors } from "../../UI/constants";
import Languages from "./components/Languages/Languages";
import Menu from "./components/Menu/Menu";
import { useLocation } from "react-router-dom/cjs/react-router-dom";
import { useHistory } from "react-router-dom/cjs/react-router-dom";

const Main = () => {
  const [user, setUser] = useState(null);
  const value = { user, setUser };
  const location = useLocation();
  const history = useHistory();

  const MainWrapper = styled.div`
    display: flex;
    align-items: center;
    flex-direction: column;
    width: 100vw;
    height: 100vh;
    overflow-y: auto;
    background-color: ${colors.complementary_blue_4};

    ::-webkit-scrollbar {
      width: 2px;
    }

    ::-webkit-scrollbar-track {
      background-color: transparent;
    }

    ::-webkit-scrollbar-thumb {
      background: lightgray;
      border-radius: 10px;
    }
  `;
  useEffect(() => {
    if (onlyAuth(location.pathname) && !user) {
      history.push('/login')
    }
  }, [location.pathname, user]);

  return (
    <MainWrapper>
      <UserContext.Provider value={value}>
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
      </UserContext.Provider>
    </MainWrapper>
  );
};
export default Main;
