const isFormValid = inputList => {
  return inputList.every(inputElement => inputElement.validity.valid);
};

const hideInputError = (inputElement, configValidate) => {
  const errorElement = document.querySelector(`#${inputElement.name}-error`);
  errorElement.textContent = '';
  inputElement.classList.remove(configValidate.inputErrorClass);
};

const showInputError = (inputElement, configValidate) => {
  const errorElement = document.querySelector(`#${inputElement.name}-error`);
  errorElement.textContent = inputElement.validationMessage;
  inputElement.classList.add(configValidate.inputErrorClass);
};

const toggleButtonState = (buttonElement, inputList) => {
  // if form valid
  if (isFormValid(inputList)) {
    // enable button
    buttonElement.disabled = false;
  } else {
    // else disable
    buttonElement.disabled = true;
  }
};

const checkInputValidity = (inputElement, configValidate) => {
  // if valid
  if (inputElement.validity.valid) {
    // hide error
    hideInputError(inputElement, configValidate);
  } else {
    // else show error
    showInputError(inputElement, configValidate);
  };
};

const setEventListeners = (formElement, configValidate) => {
  // prevent page reload on form submit
  formElement.addEventListener('submit', event => {
    event.preventDefault();
  });

  // find all inputs
  const inputList = Array.from(formElement.querySelectorAll(configValidate.inputSelector));

  // find submit buttons
  const submitButton = formElement.querySelector(configValidate.submitButtonSelector);

  inputList.forEach(inputElement => {
    // add listeners for each input
    inputElement.addEventListener('input', () => {
      // check each input is valid
      checkInputValidity(inputElement, configValidate);
      // toggle button state
      toggleButtonState(submitButton, inputList);
    });
  });
  // set initial button state
  toggleButtonState(submitButton, inputList);
};

export const enableValidation = (configValidate) => {
  // find all forms
  const formList = Array.from(document.querySelectorAll(configValidate.formSelector));
  // set event listeners each form
  formList.forEach(formElement => {
    setEventListeners(formElement, configValidate);
  });
};
