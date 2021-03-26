const settings={
    formSelector: '.form',
    fieldsetSelector: '.form__field',
    inputSelector: '.form__input',
    submitButtonSelector: '.form__save-button',
    inactiveButtonClass: 'form__save-button_disabled',
    inputErrorClass: 'form__input_type_error',
    errorClass: 'form__error_active'
	
}
 
function showInputError(formElement, inputElement, errorMessage) {
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);//нашли спан с ошибкой по id
    inputElement.classList.add(settings.inputErrorClass);//добавили инпут с ошибкой (красная полосочка)
    errorElement.classList.add(settings.errorClass);//выводим сообщение об ошибке
    errorElement.textContent = errorMessage;//эррор элемент есть сообщение об ошибке
}


function hideInputError(formElement, inputElement) {
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.remove(settings.inputErrorClass);//убрали инпут с ошибкой
  	errorElement.textContent = '';//очистили эррор элемент
	  errorElement.classList.remove(settings.errorClass);//убрали сообщение об ошибке
}

function hasInvalidInput(inputList) { //проверяем есть ли хоть одно неисправное поле
    return inputList.some(inputElement => {
      return !inputElement.validity.valid;
    })
}
function checkInputValidity(formElement, inputElement) {
    if (!inputElement.validity.valid) {
      showInputError(formElement, inputElement, inputElement.validationMessage);//если ошибка, выводим ошибку
    } else {
      hideInputError(formElement, inputElement);//если в норме, прячем ошибку
    }
}

const toggleButtonState = (inputList, buttonElement) => {
    if (hasInvalidInput(inputList)){
        buttonElement.disabled = true;
        buttonElement.classList.add(settings.inactiveButtonClass);//меняем состояние кнопки "сохранить" на неактивное
    } else {
        buttonElement.disabled = false;
        buttonElement.classList.remove(settings.inactiveButtonClass);//меняем состояние кнопки "сохранить" на активное
    }
} 

function openedPopupCheckValidity(formElement) {
  const inputList  = Array.from(formElement.querySelectorAll(settings.inputSelector));
  const formSubmitButton = formElement.querySelector(settings.submitButtonSelector);
  inputList.forEach((inputElement) => {
    checkInputValidity(formElement, inputElement);//проверяем поля на валидность при запуске
    hideInputError(formElement, inputElement);// удаляем ошибку при открытии попапа
  });
  toggleButtonState(inputList, formSubmitButton);//меняем состояние кнопки на неактивное
};


function setEventListeners(formElement) {
  const inputList = Array.from(formElement.querySelectorAll(settings.inputSelector));//массив из всех инпутов
  const formSubmitButton = formElement.querySelector(settings.submitButtonSelector);//нашли кнопку сохранить
  toggleButtonState(inputList, formSubmitButton);
  inputList.forEach(inputElement => {
    inputElement.addEventListener('input', function () {
      checkInputValidity(formElement, inputElement);//вызываем проверку 
      toggleButtonState(inputList, formSubmitButton);//меняем состояние кнопки
    })
  })
}

function enableValidation(formSettings) {
    const formsList = Array.from(document.querySelectorAll(formSettings.formSelector));
    formsList.forEach(formElement => {
      formElement.addEventListener('submit', function (evt) {
        evt.preventDefault(formElement, configObject);
      })
        setEventListeners(formElement, formSettings);
      });
}
  
enableValidation(settings);
  

