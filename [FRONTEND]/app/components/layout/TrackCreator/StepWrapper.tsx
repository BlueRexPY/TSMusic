import { Steps } from "antd";
import React from "react";
import { ReactChild, ReactNode } from "react";

type Props = {
  children?: ReactChild | ReactNode;
  currentStep?: number;
  steps?: string[];
};

const StepWrapper = (props: Props) => {
  const { Step } = Steps;
  const { currentStep = 0, steps = ["Info", "Audio", "Photo"] } = props;
  return (
    <div className="paper container">
      <Steps size="default" current={props.currentStep}>
        {steps.map((title,i) => (
          <Step key={i} title={title} />
        ))}
      </Steps>
      <div className="container col jc_sa">{props.children}</div>
    </div>
  );
};

export default StepWrapper;
