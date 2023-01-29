import React, { createContext, useState } from 'react';
import StepChooseMediaType from '../pages/MultiStepCreateStoryForm/StepChooseMediaType/StepChooseMediaType';
import StepStoryContent from '../pages/MultiStepCreateStoryForm/StepStoryContent/StepStoryContent';

export const globalContext = createContext();

export function GlobalContextProvider({ children }) {
  // for context use in MultiStepCreateStoryForm
  const [mediaType, setMediaType] = useState('Text');
  const [isPrivate, setIsPrivate] = useState(true);

  // for story content
  const blue = '#0077ff';
  const green = '#33b357';
  const pink = '#de1b55';

  const [font, setFont] = useState('Times New Roman');
  const [fontColor, setFontColor] = useState(blue);
  const [caption, setCaption] = useState('');

  const [image, setImage] = useState('/images/default-image-story.png');

  const [videoPreview, setVideoPreview] = useState('');
  const [video, setVideo] = useState('');

  const steps = {
    1: StepChooseMediaType,
    2: StepStoryContent,
  };

  const [step, setStep] = useState(1);

  const onNextHandler = () => {
    setStep(step + 1);
  };

  const onPrevHandler = () => {
    setStep(step - 1);
  };

  const [isDraft, setIsDraft] = useState(false);

  const clearContext = () => {
    setStep(1);
    setMediaType('Text');
    setIsPrivate(true);
    setFont('Times New Roman');
    setCaption('');
    setFontColor(blue);
    setImage('/images/default-image-story.png');
    setVideoPreview('');
    setVideo('');
    setIsDraft(false);
  };

  // eslint-disable-next-line react/jsx-no-constructed-context-values
  const value = {
    mediaType,
    setMediaType,
    steps,
    step,
    setStep,
    onNextHandler,
    onPrevHandler,
    clearContext,
    isPrivate,
    setIsPrivate,
    caption,
    font,
    fontColor,
    setCaption,
    setFont,
    setFontColor,
    blue,
    green,
    pink,
    video,
    setVideo,
    videoPreview,
    setVideoPreview,
    image,
    setImage,
    isDraft,
    setIsDraft,
  };

  return (
    <globalContext.Provider value={value}>{children}</globalContext.Provider>
  );
}
