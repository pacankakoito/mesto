const openFormButtonSelector = '.open-button';
const openFormButtonsList = Array.from(document.querySelectorAll(openFormButtonSelector));

export class FormValidator{
    constructor(settings, formElement) {
        this._settings = settings;
        this._formElement = formElement;
    }
    
    _showInputError(formElement, inputElement, errorMessage) {
        const errorElement = formElement.querySelector(`#${inputElement.id}-error`);//нашли спан с ошибкой по id
        inputElement.classList.add(this._settings.inputErrorClass);//добавили инпут с ошибкой (красная полосочка)
        errorElement.classList.add(this._settings.errorClass);//выводим сообщение об ошибке
        errorElement.textContent = errorMessage;//эррор элемент есть сообщение об ошибке
    }
    
    
    _hideInputError(formElement, inputElement) {
        const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
        inputElement.classList.remove(this._settings.inputErrorClass);//убрали инпут с ошибкой
          errorElement.textContent = '';//очистили эррор элемент
          errorElement.classList.remove(this._settings.errorClass);//убрали сообщение об ошибке
    }
 
    _hasInvalidInput(inputList) { //проверяем есть ли хоть одно неисправное поле
        return inputList.some(inputElement => {
          return !inputElement.validity.valid;
        })
    }
    
    _checkInputValidity(formElement, inputElement) {
        if (!inputElement.validity.valid) {
          this._showInputError(formElement, inputElement, inputElement.validationMessage);//если ошибка, выводим ошибку
        } else {
          this._hideInputError(formElement, inputElement);//если в норме, прячем ошибку
        }
    }
    
    _toggleButtonState = (inputList, buttonElement) => {
        if (this._hasInvalidInput(inputList)){
            buttonElement.disabled = true;
            buttonElement.classList.add(this._settings.inactiveButtonClass);//меняем состояние кнопки "сохранить" на неактивное
        } else {
            buttonElement.disabled = false;
            buttonElement.classList.remove(this._settings.inactiveButtonClass);//меняем состояние кнопки "сохранить" на активное
        }
    } 

         
    _setEventListeners(formElement) {
        openFormButtonSelector.addEventListener('click', () => {//проверяем и сбрасываем кнопку после ресета
        this._hideInputError();
         })
        const inputList = Array.from(formElement.querySelectorAll(this._settings.inputSelector));//массив из всех инпутов
        const formSubmitButton = formElement.querySelector(this._settings.submitButtonSelector);//нашли кнопку сохранить
        this._toggleButtonState(inputList, formSubmitButton);

        
        
        openFormButtonsList.forEach(button => { //после нажатия на кнопку открытия попапа обнуляем ошибки и сбрасываем кнопку
          button.addEventListener('click', () => {
            this._toggleButtonState(inputList, formSubmitButton);
          })
        })
        
        inputList.forEach(inputElement => {
          inputElement.addEventListener('input', () => {
            this._checkInputValidity(formElement, inputElement);//вызываем проверку
            this._toggleButtonState(inputList, formSubmitButton);//меняем состояние кнопки
          })
        })        
      }


    enableValidation() {
        this._formElement.addEventListener('submit', (evt) => {
            evt.preventDefault();
        })
        const fieldsetList = Array.from(this._formElement.querySelectorAll(this._settings.fieldsetSelector));
        fieldsetList.forEach(formElement => {
          this._setEventListeners(formElement);
        })
    }
}