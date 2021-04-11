import {Card} from './Card.js';//импортировали класс кард из файла
import {FormValidator} from './FormValidator.js';//импортировали класс форм валидатор из файла
import {openPopup, closePopup} from './Utils.js';
import {initialCards} from './initial-cards.js';

const editButton = document.querySelector('.profile__edit-button');//нашли кнопку изменить
const addButton = document.querySelector('.profile__add-button');//нашли кнопку добавить

const popup = document.querySelector('.popup');
const popupList = document.querySelectorAll('.popup');
const popupEdit = document.querySelector('.popup_type_edit');
const popupAdd = document.querySelector('.popup_type_add');
const popupPhoto = document.querySelector('.popup_type_photo');

const closePopupEditButton = document.querySelector('#popup-edit__close-button');
const closePopupAddButton = document.querySelector('#popup-add__close-button');

const formEdit=document.querySelector('#form-edit');
const nameInput=formEdit.querySelector('.form__input_type_name');// Воспользуйтесь инструментом .querySelector()
const jobInput=formEdit.querySelector('.form__input_type_job');// Воспользуйтесь инструментом .querySelector()

const formAdd=document.querySelector('#form-add');
const titleInput=formAdd.querySelector('.form__input_type_title');// Воспользуйтесь инструментом .querySelector()
const linkInput=formAdd.querySelector('.form__input_type_link');// Воспользуйтесь инструментом .querySelector()

const profile=document.querySelector(".profile"); // Воспользуйтесь инструментом .querySelector()
const profileName=profile.querySelector(".profile__title"); // Воспользуйтесь инструментом .querySelector()
const profileJob=profile.querySelector(".profile__subtitle");// Воспользуйтесь инструментом .querySelector()

const elementList = document.querySelector('.elements__list');
const templateElement='#template';


const validationSettings={
  formSelector: '.form',
  fieldsetSelector: '.form__field',
  inputSelector: '.form__input',
  submitButtonSelector: '.form__save-button',
  inactiveButtonClass: 'form__save-button_disabled',
  inputErrorClass: 'form__input_type_error',
  errorClass: 'form__error_active',
  openFormButtonSelector: '.open-button'
}

const createCard=(element) => {
  const card = new Card(element, templateElement);
  const cardElement = card.generateCard();
  return cardElement;
}

const addCard = (element) => {
  const newCard = createCard(element);
  elementList.prepend(newCard);
}

initialCards.forEach(element => {
  const cardElement = createCard(element);
  elementList.prepend(cardElement);
})

function renderPopupEdit() { //открытие попапа для редактирования
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent; // Вставьте новые значения с помощью textContent
  openPopup(popupEdit);
}

function renderPopupAdd(){
  titleInput.value="";
  linkInput.value="";
  openPopup(popupAdd);
}

function formEditSubmitHandler(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value; // Вставьте новые значения с помощью textContent
  closePopup(popupEdit); //закрыли попап после сохранения
}

function formAddSubmitHandler(evt) {
  evt.preventDefault();
  const cardAdded = {name: titleInput.value, link: linkInput.value};
  addCard(cardAdded);
  closePopup(popupAdd); //закрыли попап после сохранения
}


const addCardFormValidator = (settings, formElement) => {
  const formValidator = new FormValidator(settings, formAdd);
  formValidator.enableValidation();//установили проверку валидности для каждой формы
}
const editCardFormValidator = (settings, formElement) => {
  const formValidator = new FormValidator(settings, formEdit);
  formValidator.enableValidation();//установили проверку валидности для каждой формы
}

const closePopupHandlers = () => {// универсальная закрывалка при нажатии на оверлей или кнопку
  popupList.forEach((popup) => {
    popup.addEventListener('click', (evt) => {
      if (evt.target.classList.contains('popup_opened')) {
        closePopup(popup);
      } if (evt.target.classList.contains('popup__close-button')) {
        closePopup(popup);
      }
    })
  })
}
closePopupHandlers();

editButton.addEventListener('click', function() {
  editCardFormValidator(validationSettings, formEdit);
  renderPopupEdit();
});


addButton.addEventListener('click', function() {
  addCardFormValidator(validationSettings, formAdd);
  renderPopupAdd();
});

closePopupEditButton.addEventListener('click', function(){closePopup(popupEdit)});
closePopupAddButton.addEventListener('click', function(){closePopup(popupAdd)});
formEdit.addEventListener('submit', formEditSubmitHandler);
formAdd.addEventListener('submit', formAddSubmitHandler);






