import React, { useEffect } from "react";
import styled from "styled-components";
import { Stepper, Step, StepLabel } from "@material-ui/core";
import { useTranslation } from "react-i18next";
import { comparePassword } from "../../../../validators/ConfirmPassword";

import {
  FormBuilder,
  FieldGroup,
  FieldControl,
  Validators,
} from "react-reactive-form";
import { DefaultInput } from "../../../../UI";

const AccountDataWrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  align-items: center;
  padding: 24px 16px;
  width: 450px;

  .line {
    display: flex;
    align-items: center;
    font-size: 14px;

    .input {
      width: 250px;
      margin-left: 16px;
    }
    .input-label {
      max-width: 100px;
      text-align: center;
    }
  }

  .line-area {
    height: 50px;
    justify-content: flex-end;
  }
  .error {
    color: red;
    width: 230px;
  }
`;

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`;

const Input = styled(DefaultInput)``;

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

const AccountData = ({ proceed, setData }) => {
  const accountDataForm = FormBuilder.group(
    {
      username: ["", Validators.required],
      email: ["", Validators.required],
      password: ["", Validators.required],
      confirmPassword: ["", Validators.required],
    },
    { validators: [comparePassword] }
  );

  let formSubscribe = accountDataForm.valueChanges.subscribe((value) => {
    setData(value);
    proceed(accountDataForm.valid);
  });

  useEffect(() => {
    return () => {
      if (formSubscribe) {
        formSubscribe.unsubscribe();
      }
    };
  }, [formSubscribe]);

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
  const { t } = useTranslation();

  return (
    <AccountDataWrapper>
      <FieldGroup
        control={accountDataForm}
        render={({ touched, hasError }) => (
          <InputWrapper>
            <FieldControl
              name="username"
              render={TextInput}
              meta={{ label: "Username", control: "username" }}
            />
            <FieldControl
              name="email"
              render={TextInput}
              meta={{ label: "Email", control: "email" }}
            />
            <FieldControl
              name="password"
              render={TextInput}
              meta={{ label: "Password", control: "password" }}
            />
            <FieldControl
              name="confirmPassword"
              render={TextInput}
              meta={{ label: "Confirm password", control: "confirmPassword" }}
            />
            <h6 className="error">
              {touched &&
                hasError("notConfirmedPassword") &&
                `Password is different`}
            </h6>
          </InputWrapper>
        )}
      />
    </AccountDataWrapper>
  );
};
export default AccountData;
