import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  FieldControl,
  FieldGroup,
  FormBuilder,
  Validators,
} from "react-reactive-form";
import styled from "styled-components";
import { DefaultInput } from "../../../../UI";
import { Checkbox } from "@material-ui/core";
import Trainer from "../../../../shared/Trainer/Trainer";

const TrainerDataWrapper = styled.div`
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

const TrainerControlWrapper = styled(ControlWrapper)`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 150px;

  .error {
    color: red;
    width: 230px;
  }

  .input-label {
    width: 100%;
    text-align: center;
  }

  .trainer-line {
    display: flex;
    flex-direction: column;
    width: 100%;

    .trainers-tochoose {
      display: flex;
      justify-content: space-evenly;
      overflow-x: auto;
    }
  }
`;

const TrainerImage = styled.img`
  width: 70px;
  height: 95px;
`;

const TrainerWrapper = styled.div`
  width: 70px;
  height: 95px;
  cursor: pointer;
  opacity: ${(prop) => (prop.isSelected ? "1" : "0.3")};
`;

const TrainerData = ({ proceed, setData }) => {
  const [chosenTrainer, setChosenTrainer] = useState(null);
  const trainerDataForm = FormBuilder.group({
    trainerName: ["", Validators.required],
    region: ["", Validators.required],
    age: ["", Validators.required],
  });

  let formSubscribe = trainerDataForm.valueChanges.subscribe((value) => {
    setData(value);
    proceed(!!chosenTrainer || trainerDataForm.valid);
  });

  useEffect(() => {
    return () => {
      if (formSubscribe) {
        formSubscribe.unsubscribe();
      }
    };
  }, [formSubscribe]);

  const setSelectedTrainer = (trainerName) => {
    setChosenTrainer(trainerName);
    setData({ trainer: trainerName });
  };

  const TextInput = ({
    value = "",
    hidden = false,
    handler,
    touched,
    hasError,
    meta,
  }) => (
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
  const trainers = Object.keys(Trainer);

  const { t } = useTranslation();

  const isSelected = (trainer) => {
    return chosenTrainer ? chosenTrainer === trainer : true;
  };

  return (
    <TrainerDataWrapper>
      <FieldGroup
        control={trainerDataForm}
        render={() => (
          <InputWrapper>
            <FieldControl
              name="trainerName"
              render={TextInput}
              meta={{ label: "Trainer name", control: "trainerName" }}
            />
            <FieldControl
              name="region"
              render={TextInput}
              meta={{ label: "Region", control: "region" }}
            />
            <FieldControl
              name="age"
              render={TextInput}
              meta={{ label: "Age", control: "age" }}
            />
          </InputWrapper>
        )}
      />
      <TrainerControlWrapper>
        <div className="trainer-line">
          <h2 className="input-label">Trainer</h2>
          <div className="trainers-tochoose mt-16">
            {trainers?.map((trainer, index) => (
              <TrainerWrapper
                onClick={() => setSelectedTrainer(trainer)}
                isSelected={isSelected(trainer)}
              >
                <TrainerImage key={index} src={Trainer[trainer]} />
              </TrainerWrapper>
            ))}
          </div>
        </div>
      </TrainerControlWrapper>
    </TrainerDataWrapper>
  );
};
export default TrainerData;
