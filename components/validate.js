const config = {
  formSelector: '.form',
  inputSelector: '.form__item',
  submitButtonSelector: '.form__submit-button',
  inputErrorClass: 'form__item_error',
}

const isFormValid = inputList => {
  return inputList.every(inputElement => inputElement.validity.valid);
};

const hideInputError = inputElement => {
  const errorElement = document.querySelector(`#${inputElement.name}-error`);
  errorElement.textContent = '';
  inputElement.classList.remove(config.inputErrorClass);
};

const showInputError = inputElement => {
  const errorElement = document.querySelector(`#${inputElement.name}-error`);
  errorElement.textContent = inputElement.validationMessage;
  inputElement.classList.add(config.inputErrorClass);
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

const checkInputValidity = inputElement => {
  // if valid
  if (inputElement.validity.valid) {
    // hide error
    hideInputError(inputElement);
  } else {
    // else show error
    showInputError(inputElement);
  };
};

const setEventListeners = formElement => {
  // prevent page reload on form submit
  formElement.addEventListener('submit', event => {
    event.preventDefault();
  });

  // find all inputs
  const inputList = Array.from(formElement.querySelectorAll(config.inputSelector));

  // find submit buttons
  const submitButton = formElement.querySelector(config.submitButtonSelector);

  inputList.forEach(inputElement => {
    // add listeners for each input
    inputElement.addEventListener('input', () => {
      // check each input is valid
      checkInputValidity(inputElement);

      // toggle button state
      toggleButtonState(submitButton, inputList);
    });
  });
  // set initial button state
  toggleButtonState(submitButton, inputList);
};

export const enableValidation = () => {
  // find all forms
  const formList = Array.from(document.querySelectorAll(config.formSelector));
  // set event listeners each form
  formList.forEach(formElement => {
    setEventListeners(formElement);
  });
};
