type StepProps = {
  children: React.ReactNode;
  title?: string;
};

const Step: React.FC<StepProps> = ({ children, title }) => {
  return (
    <>
      <div className="w-100">
        <h1 className="text-center">{title}</h1>
        <div className="w-100">{children}</div>
      </div>
    </>
  );
};

export default Step;
