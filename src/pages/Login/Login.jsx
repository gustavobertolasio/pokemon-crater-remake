import React from "react";
import styled from "styled-components";
import { DefaultPage } from "../../UI";
import Button from "../../shared/Button/Button";
import Input from "../../shared/Input/Input";
import Pokeball from "../../assets/pokeball.png";
import Link from "../../shared/Link/Link";

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
  height 450px;
  background-color: white;
  border-radius: 5px;
  box-shadow: 2px 2px 1px 1px grey;

  .line {
      display: flex;
      font-size: 14px;
      margin-bottom: 16px;

      .input {
       width: 250px;
       margin-left: 16px;
      }
  }  

.image-wrapper{
  height: 250px;
  display: flex;
  align-items: center;
}

  .top {
    height: 50px;
    justify-content: flex-end;
  }

  .middle {
    height: 50px;
    justify-content: flex-end;
  }

  .footer {
    justify-content: space-between;
    align-items: flex-end;
    padding: 0 32px;
    width: 90%;
    height: 150px;
  }
`;

const Login = () => {
  return (
    <LoginPage>
      <LoginWrapper>
        <div className="image-wrapper">
          <Image src={Pokeball}></Image>
        </div>
        <div className="line-wrapper">
          <div className="top line">
            <h2>Username: </h2>
            <div className="input">
              <Input />
            </div>
          </div>
          <div className="middle line">
            <h2>Password: </h2>
            <div className="input">
              <Input />
            </div>
          </div>
        </div>
        <Link href="#" linkText="Forgot ur password?"></Link>
        <div className="footer line">
          <Button buttonTitle="Go back" isPrimary={false}></Button>
          <Button buttonTitle="Catch them all" isPrimary={true}></Button>
        </div>
      </LoginWrapper>
    </LoginPage>
  );
};
export default Login;
