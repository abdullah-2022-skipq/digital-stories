import { useSelector } from "react-redux";

const SignUp = () => {
  const steps = useSelector((state) => state.multiStepForm.steps);
  const currentStep = useSelector((state) => state.multiStepForm.currentStep);
  const CurrentStep = steps[currentStep];

  return <CurrentStep />;
};

export default SignUp;
