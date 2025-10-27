import { validationConfig } from "../../config";

export function enableValidation(validationConfig) {
  const formList = Array.from(document.forms);

  formList.forEach((formElement) =>
    setValidationListeners(formElement, validationConfig)
  );
}

export function setValidationListeners(formElement, validationConfig) {
  const inputList = Array.from(
    formElement.querySelectorAll(validationConfig.inputSelector)
  );
  const buttonElement = formElement.querySelector(
    validationConfig.submitButtonSelector
  );

  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", () => {
      isValid({ formElement, inputElement, validationConfig});
      toggleButtonState(
        inputList,
        buttonElement,
        validationConfig.inactiveButtonClass
      );
    });
  });
}

export function clearValidation(
  formElement,
  {
    inputSelector,
    inputErrorClass,
    submitButtonSelector,
    errorSelector,
    inactiveButtonClass,
  }
) {
  const inputList = Array.from(formElement.querySelectorAll(inputSelector));
  inputList.forEach((inputElement) => {
    inputElement.classList.remove(inputErrorClass);
    inputElement.setCustomValidity("");
  });
  const errorList = Array.from(formElement.querySelectorAll(errorSelector));
  errorList.forEach((errorElement) => (errorElement.textContent = ""));
  const buttonElement = formElement.querySelector(submitButtonSelector);
  toggleButtonState(inputList, buttonElement, inactiveButtonClass);
}

const isValid = ({
  formElement,
  inputElement,
  validationConfig: { inputErrorClass, errorActiveClass },
}) => {
  if (inputElement.validity.patternMismatch) {
    inputElement.setCustomValidity(inputElement.dataset.errorMessage);
  } else {
    inputElement.setCustomValidity("");
  }

  if (!inputElement.validity.valid) {
    showInputError({
      formElement,
      inputElement,
      errorMessage: inputElement.validationMessage,
      inputErrorClass,
      errorActiveClass,
    });
  } else {
    hideInputError({
      formElement,
      inputElement,
      inputErrorClass,
      errorActiveClass,
    });
  }
};

const showInputError = ({
  formElement,
  inputElement,
  errorMessage,
  inputErrorClass,
  errorActiveClass,
}) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(errorActiveClass);
};

const hideInputError = ({
  formElement,
  inputElement,
  inputErrorClass,
  errorActiveClass,
}) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(inputErrorClass);
  errorElement.classList.remove(errorActiveClass);
  errorElement.textContent = "";
};

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

const toggleButtonState = (inputList, buttonElement, inactiveButtonClass) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.disabled = true;
    buttonElement.classList.add(inactiveButtonClass);
  } else {
    buttonElement.disabled = false;
    buttonElement.classList.remove(inactiveButtonClass);
  }
};
