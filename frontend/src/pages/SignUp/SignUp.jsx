import { useState } from "react";
import StepContactDetails from "../MultiStepForm/StepContactDetails/StepContactDetails";
import StepUsername from "../MultiStepForm/StepUsername/StepUsername";
import StepPassword from "../MultiStepForm/StepPassword/StepPassword";
import StepProfilePicture from "../MultiStepForm/StepProfilePicture/StepProfilePicture";

const steps = {
  1: StepContactDetails,
  2: StepUsername,
  3: StepPassword,
  4: StepProfilePicture,
};

const SignUp = () => {
  const [step, setStep] = useState(1);
  const CurrentStep = steps[step];

  const nextHandler = () => {
    setStep(step + 1);
  };

  return <CurrentStep onNext={nextHandler} />;
};

export default SignUp;
