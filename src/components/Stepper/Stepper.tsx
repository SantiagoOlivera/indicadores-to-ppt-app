import React, { useState } from "react";
import type { StepProps } from "./Step";
import { ArrowLeft, ArrowRight } from "react-bootstrap-icons";
import { Button } from "react-bootstrap";

type StepperProps = {
  children: React.ReactElement<StepProps> | React.ReactElement<StepProps>[];
  currentStep: number;
  onStepClick?: (stepIndex: number) => void;
  nextButtonText?: string;
  previousButtonText?: string;
  finishButtonText?: string;
  onClickNextStep?: (step: number, idStep: string) => void;
  maxWidth?: number;
};

const Stepper: React.FC<StepperProps> = ({
  children,
  nextButtonText,
  previousButtonText,
  currentStep,
  finishButtonText,
  onClickNextStep,
  maxWidth = 2000,
}) => {
  const [step, setStep] = useState<number>(currentStep);
  const handleNextButton = () => {
    //const childrenArray = React.Children.toArray(children);
    const childrenArray = React.Children.toArray(
      children
    ) as React.ReactElement<StepProps>[];
    if (step < childrenArray.length - 1) {
      setStep(step + 1);
    }
    onClickNextStep?.(step + 1, childrenArray[step]?.props.id);
  };

  return (
    <div className="border container-fuid p-4">
      <br />
      <div className="row">
        <div
          className="col-12"
          style={{ maxWidth: maxWidth, margin: "0 auto" }}
        >
          <div className="row">
            <div className="col-12">
              <h4 className="text-center">
                Paso {step + 1} de {React.Children.count(children)}
              </h4>
              <div className="col-12">
                <Button
                  type="button"
                  className={
                    "btn btn-dark float-start " +
                    (step > 0 ? "d-block" : "d-none")
                  }
                  onClick={() => setStep(step === 0 ? 0 : step - 1)}
                >
                  <ArrowLeft /> &nbsp;
                  {previousButtonText ? previousButtonText : "Previous"}
                </Button>
                &nbsp; &nbsp;
                <Button
                  className={"btn btn-success float-end "}
                  onClick={() => {
                    handleNextButton();
                  }}
                >
                  {step + 1 === React.Children.count(children)
                    ? finishButtonText
                    : nextButtonText
                    ? nextButtonText
                    : "Next"}
                  &nbsp;
                  <ArrowRight />
                </Button>
              </div>
            </div>
          </div>
          <br />
          <div className="row">
            <div className="steps col-12 ">
              {React.Children.toArray(children).map((child, index) => {
                return (
                  <div
                    className={index === step ? "step active" : "step d-none"}
                    key={"step-" + index}
                  >
                    {child}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Stepper;
