import { useContext } from "react";
import { globalContext } from "../../App";

const MultiStepCreateStoryEntry = () => {
  const { steps, step, onNextHandler } = useContext(globalContext);
  const CurrentStep = steps[step];

  return <CurrentStep onNext={onNextHandler} />;
};

export default MultiStepCreateStoryEntry;