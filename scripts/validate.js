// enableValidation({
//     formSelector: '.form',
//     inputSelector: '.form__input',
//     submitButtonSelector: '.form__save-button',
//     inactiveButtonClass: 'form__save-button_disabled',
//     inputErrorClass: 'form__input_type_error',
//     errorClass: 'form__error_active'
//   }); 


// //   function enableValidation(settingsObject) {
// //     const formsList = Array.from(document.querySelectorAll(formSelector));//нашли формы в DOM и записали все в массив formList

// //     formsList.forEach(formElement => {
// //       formElement.addEventListener('submit', function (evt) {
// //         evt.preventDefault();
// //       })
// //       const fieldsetList = Array.from(formElement.querySelectorAll(settingsObject.fieldsetSelector));
// //       fieldsetList.forEach(fieldset => {
// //         setEventListeners(fieldset);
// //       })
// //     })
// //   }  