import React, { useContext, useState } from "react";
import styled from "styled-components";
import { DefaultPage, DefaultInput } from "../../UI";
import Button from "../../shared/Button/Button";
import Pokeball from "../../assets/pokeball.png";
import Link from "../../shared/Link/Link";
import {
  FormBuilder,
  FieldGroup,
  FieldControl,
  Validators,
} from "react-reactive-form";
import { logIn } from "../../api/Api.js";
import UserContext from "../../contexts/UserContext";
import { Redirect } from "react-router";
import { colors } from "../../UI/constants";

const LoginPage = styled(DefaultPage)`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Image = styled.img`
  height: 75px;
  opacity: 0.2;
`;

const LoginWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 24px 16px;
  width: 450px;
  height 500px;
  background-color: ${colors.complementary_blue_1};
  border-radius: 5px;
  box-shadow: 2px 2px 1px 1px grey;

  .line {
    display: flex;
    align-items:center;
    font-size: 14px;

    .input {
    width: 250px;
    margin-left: 16px;
    }
    .input-label{
        max-width:100px;
        text-align:center;
    }
}  

.line-area {
height: 50px;
justify-content: flex-end;
}

.image-wrapper{
  height: 150px;
  display: flex;
  align-items: center;
}

  .footer {
    justify-content: space-between;
    align-items: flex-end;
    padding: 0 32px;
    width: 90%;
    height: 150px;
  }
`;

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`;

const ControlWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  height: 70px;

  .error {
    color: red;
    width: 230px;
  }
`;
const Input = styled(DefaultInput)``;

const Login = () => {
  const { setUser } = useContext(UserContext);
  const [logged, setLogged] = useState(false);
  const loginForm = FormBuilder.group({
    username: ["", Validators.required],
    password: ["", Validators.required],
  });

  const TextInput = ({ handler, touched, hasError, meta }) => (
    <ControlWrapper>
      <div className="line-area line">
        <h2 className="input-label">{meta.label}</h2>
        <div className="input">
          <Input {...handler()} />
        </div>
      </div>
      <h6 className="error">
        {touched && hasError("required") && `${meta.label} is required`}
      </h6>
    </ControlWrapper>
  );

  const submit = () => {
    logIn(
      loginForm.get("username").value,
      loginForm.get("password").value,
      setUser
    ).then(() => {
      setLogged(true); //TODO: Fix login
    });
  };

  return (
    <LoginPage>
      <FieldGroup
        control={loginForm}
        render={({ get, invalid }) => (
          <LoginWrapper>
            <div className="image-wrapper">
              <Image src={Pokeball}></Image>
            </div>
            <InputWrapper>
              <FieldControl
                name="username"
                render={TextInput}
                meta={{ label: "Username", control: "username" }}
              />
              <FieldControl
                name="password"
                render={TextInput}
                meta={{ label: "Password", control: "password" }}
              />
            </InputWrapper>
            <div className="mt-16">
              <Link href="#" linkText="Forgot ur password?" />
            </div>
            <div className="footer line">
              <Button buttonTitle="Go back" isPrimary={false}></Button>
              <Button
                buttonTitle="Catch them all"
                isPrimary={true}
                disabled={invalid}
                clickCallback={submit}
              ></Button>
            </div>
          </LoginWrapper>
        )}
      ></FieldGroup>
      {logged ? <Redirect to="/home" /> : <></>}
    </LoginPage>
  );
};
export default Login;
