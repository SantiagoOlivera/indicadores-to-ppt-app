import React from "react";

export type StepProps = {
  id: string;
  children: React.ReactNode;
  title?: string;
};

const Step: React.FC<StepProps> = ({ id, title, children }) => {
  return (
    <>
      <div className="w-100" id={id}>
        <h1 className="text-center">{title}</h1>
        <div className="w-100">{children}</div>
      </div>
    </>
  );
};

export default Step;
