import React, { useState } from "react";
import type Step from "./Step";
import { ArrowLeft, ArrowRight } from "react-bootstrap-icons";
import { Button } from "react-bootstrap";

type StepperProps = {
  children: React.ReactElement<typeof Step> | React.ReactElement<typeof Step>[];
  activeStep: number;
  onStepClick?: (stepIndex: number) => void;
  nextButtonText?: string;
  previousButtonText?: string;
  finishButtonText?: string;
};

const Stepper: React.FC<StepperProps> = ({
  children,
  nextButtonText,
  previousButtonText,
  activeStep,
  finishButtonText,
  /* activeStep,
  onStepClick, */
}) => {
  const [step, setStep] = useState<number>(activeStep);

  return (
    <div className="border container-fuid p-4">
      <br />
      <div className="row">
        <div className="col-12 text-center">
          <h4>
            Paso {step + 1} de {React.Children.count(children)}
          </h4>
        </div>
      </div>
      <div className="w-100">
        <div className="row">
          <div className="col-12">
            <Button
              type="button"
              className={
                "btn btn-dark float-start " + (step > 0 ? "d-block" : "d-none")
              }
              onClick={() => setStep(step === 0 ? 0 : step - 1)}
            >
              <ArrowLeft /> &nbsp;
              {previousButtonText ? previousButtonText : "Previous"}
            </Button>
            &nbsp; &nbsp;
            <Button
              className={"btn btn-success float-end "}
              onClick={() => setStep(step + 1)}
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
      <div className="row">
        <div className="steps col-12 ">
          {React.Children.toArray(children).map((child, index) => (
            <div
              className={index === step ? "step active" : "step d-none"}
              key={"step-" + index}
            >
              {/* <div className="step-number">{index + 1}</div> */}
              <div className="step-content">{child}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Stepper;
