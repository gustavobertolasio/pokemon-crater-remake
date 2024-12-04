import React, { useContext, useState } from "react";
import styled from "styled-components";
import { DefaultPage } from "../../UI";
import Pokeball from "../../assets/pokeball.png";
import { Stepper, Step, StepLabel } from "@material-ui/core";
import { useTranslation } from "react-i18next";
import TrainerData from "./components/TrainerData/TrainerData";
import Button from "../../shared/Button/Button";
import AccountData from "./components/AccountData/AccountData";
import Initial from "./components/Initial/Initial";
import { signUp } from "../../api/Api";
import UserContext from "../../contexts/UserContext";
import { useHistory } from "react-router-dom/cjs/react-router-dom";

const RegisterPage = styled(DefaultPage)`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const RegisterWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 24px 16px;
  width: 450px;
  height 700px;
  background-color: lightblue;
  border-radius: 5px;
  box-shadow: 2px 2px 1px 1px grey;
  
.image-wrapper{
  height: 150px;
  display: flex;
  align-items: center;
}

.stepper{
  background-color:transparent;
  width: 400px;
}

.stepper-label {
  color: white;
  font-size: 14px
}
`;

const Image = styled.img`
  height: 75px;
  opacity: 0.2;
`;

const StepperArea = styled.div``;

const FormArea = styled.div`
  height: 400px;
`;

const Footer = styled.div`
  display: flex;
  justify-content: flex-end;
  padding-right: 20px;
  width: 100%;
  height: 40px;
`;

const Register = () => {
  const { t } = useTranslation();
  const { setUser } = useContext(UserContext);
  const [canProceed, setCanProceed] = useState(false);
  const [newUser, setNewUser] = useState({});
  const [step, setStep] = useState(0);

  const history = useHistory();

  const setData = (user) => {
    setNewUser({ ...newUser, ...user });
  };

  const nextForm = () => {
    setCanProceed(false);
    setStep(step + 1);
  };

  const sendSignUpData = () => {
    signUp(newUser, setUser).then((_) => history.push("/login"));
  };

  const formList = [
    <AccountData setData={setData} proceed={setCanProceed}></AccountData>,
    <TrainerData setData={setData} proceed={setCanProceed}></TrainerData>,
    <Initial setData={setData} proceed={setCanProceed}></Initial>,
  ];

  const buttonAction = () => {
    const states = {
      next: {
        text: "Next",
        action: nextForm,
      },
      finish: {
        text: "Go!",
        action: sendSignUpData,
      },
    };

    return step === formList.length - 1 ? states.finish : states.next;
  };

  return (
    <RegisterPage>
      <RegisterWrapper>
        <div className="image-wrapper">
          <Image src={Pokeball}></Image>
        </div>
        <StepperArea>
          <Stepper className="stepper" activeStep={step} alternativeLabel>
            <Step>
              <StepLabel className="stepper-label">
                {t("register.first-step")}
              </StepLabel>
            </Step>
            <Step>
              <StepLabel className="stepper-label">
                {t("register.second-step")}
              </StepLabel>
            </Step>
            <Step>
              <StepLabel className="stepper-label">
                {t("register.third-step")}
              </StepLabel>
            </Step>
          </Stepper>
        </StepperArea>
        <FormArea>{formList[step]}</FormArea>
        <Footer>
          <Button
            buttonTitle={buttonAction().text}
            disabled={!canProceed}
            clickCallback={buttonAction().action}
          />
        </Footer>
      </RegisterWrapper>
    </RegisterPage>
  );
};
export default Register;
