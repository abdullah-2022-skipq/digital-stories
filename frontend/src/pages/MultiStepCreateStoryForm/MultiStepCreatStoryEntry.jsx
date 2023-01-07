import { useState } from "react";
import StepChooseMediaType from "./StepChooseMediaType/StepChooseMediaType";
import StepStoryContent from "./StepStoryContent/StepStoryContent";

const MultiStepCreateStoryEntry = () => {
  const steps = {
    1: StepChooseMediaType,
    2: StepStoryContent,
  };

  const [step, setStep] = useState(1);
  const CurrentStep = steps[step];

  const onNextHandler = () => {
    setStep(step + 1);
  };

  return <CurrentStep onNext={onNextHandler} />;
};

export default MultiStepCreateStoryEntry;
