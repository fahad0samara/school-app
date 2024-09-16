interface InputState {
  inputValues: { [key: string]: string };
  inputValidities: { [key: string]: boolean | string };
  formIsValid: boolean;
}

interface Action {
  type: string;
  inputId: string;
  inputValue: string;
  validationResult: boolean | string;
}

export const reducer = (state: InputState, action: Action): InputState => {
  const { validationResult, inputId, inputValue } = action;

  const updatedValues = {
    ...state.inputValues,
    [inputId]: inputValue,
  };

  const updatedValidities = {
    ...state.inputValidities,
    [inputId]: validationResult,
  };

  let updatedFormIsValid = true;

  // Check if all inputs are valid
  for (const key in updatedValidities) {
    if (updatedValidities[key] !== true) {
      updatedFormIsValid = false;
      break;
    }
  }

  return {
    inputValues: updatedValues,
    inputValidities: updatedValidities,
    formIsValid: updatedFormIsValid,
  };
};
