/* eslint-disable no-unused-vars */
import { createSlice } from '@reduxjs/toolkit';
import StepContactDetails from '../pages/MultiStepForm/StepContactDetails/StepContactDetails';
import StepPassword from '../pages/MultiStepForm/StepPassword/StepPassword';
import StepUsername from '../pages/MultiStepForm/StepUsername/StepUsername';
import StepProfilePicture from '../pages/MultiStepForm/StepProfilePicture/StepProfilePicture';

const initialState = {
  currentStep: 1,

  steps: {
    1: StepContactDetails,
    2: StepUsername,
    3: StepPassword,
    4: StepProfilePicture,
  },
};

export const multiStepFormSlice = createSlice({
  name: 'multiStepForm',
  initialState,
  reducers: {
    setStep: (state, action) => {
      state.currentStep += 1;
    },
    delStep: (state, action) => {
      state.currentStep -= 1;
    },
    resetStep: (state, action) => {
      state.currentStep = 1;
    },
  },
});

export const { setStep, delStep, resetStep } = multiStepFormSlice.actions;

export default multiStepFormSlice.reducer;
