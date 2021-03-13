const initialCards = [
    {
      name: 'Архыз',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
      name: 'Челябинская область',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
      name: 'Иваново',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
      name: 'Камчатка',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
      name: 'Холмогорский район',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
      name: 'Байкал',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
  ]; 

const editButton = document.querySelector('.profile__edit-button');//нашли кнопку изменить
const addButton = document.querySelector('.profile__add-button');//нашли кнопку добавить

const popup = document.querySelector('.popup');
const popupEdit = document.querySelector('.popup_type_edit');
const popupAdd = document.querySelector('.popup_type_add');
const popupPhoto = document.querySelector('.popup_type_photo');

const closePopupEditButton = document.querySelector('#popup-edit__close-button');
const closePopupAddButton = document.querySelector('#popup-add__close-button');
const closePopupPhotoButton = document.querySelector('#popup-photo__close-button');

const formEdit=document.querySelector('#form-edit');
const nameInput=formEdit.querySelector('.form__input_type_name');// Воспользуйтесь инструментом .querySelector()
const jobInput=formEdit.querySelector('.form__input_type_job');// Воспользуйтесь инструментом .querySelector()
// Находим профиль в DOM
const formAdd=document.querySelector('#form-add');
const titleInput=formAdd.querySelector('.form__input_type_title');// Воспользуйтесь инструментом .querySelector()
const linkInput=formAdd.querySelector('.form__input_type_link');// Воспользуйтесь инструментом .querySelector()

const profile=document.querySelector(".profile"); // Воспользуйтесь инструментом .querySelector()
const profileName=profile.querySelector(".profile__title"); // Воспользуйтесь инструментом .querySelector()
const profileJob=profile.querySelector(".profile__subtitle");// Воспользуйтесь инструментом .querySelector()

const elementList = document.querySelector('.elements__list');

const picturePopup=document.querySelector('.popup__image');
const captionPopup=document.querySelector('.popup__caption');


function createCard(name, link) {
    const templateElement = document.querySelector('#template').content;//нашли темплейт
    const card = templateElement.cloneNode(true);//клонировали ноду
    const likeButton = card.querySelector('.element__like');
	const deleteButton = card.querySelector('.element__delete');
    const image = card.querySelector('.element__image');
    image.src = link;//присвоили значения
    image.alt = name;
    card.querySelector('.element__title').textContent = name;
    likeButton.addEventListener('click', likeCard);//cслушаем кнопку и пользуемся функцией лайк
	deleteButton.addEventListener('click', deleteCard);//cслушаем кнопку и пользуемся функцией удалить
    image.addEventListener('click', renderPopupPhoto);
    addCard(card);
}
function addCard(card){
    elementList.prepend(card);
}

function initElements(array) {//инициализировали заполнение
  array.forEach(function(item){
    createCard(item.name, item.link);
  });
}

function renderPopupEdit() { //открытие попапа для редактирования
    nameInput.value = profileName.textContent;
    jobInput.value = profileJob.textContent; // Вставьте новые значения с помощью textContent
    openPopupEdit();
}
function renderPopupAdd(){
    titleInput.value="";
    linkInput.value="";
    openPopupAdd();
}

function renderPopupPhoto(evt){
    picturePopup.src=evt.target.src;//задаем значения, отталкиваясь от события (URL картинки копируем)
    captionPopup.textContent=evt.target.alt;//задаем значения, отталкиваясь от события (копируем заголовок)
    picturePopup.alt=evt.target.alt;
    openPopupPhoto();
}


function formEditSubmitHandler(evt) {
    evt.preventDefault();
    profileName.textContent = nameInput.value;
    profileJob.textContent = jobInput.value; // Вставьте новые значения с помощью textContent
    closePopupEdit(); //закрыли попап после сохранения
}
function formAddSubmitHandler(evt) {
    evt.preventDefault();
    createCard(titleInput.value, linkInput.value, 'prepend');
    closePopupAdd(); //закрыли попап после сохранения
}

function openPopupEdit(){
    openPopup(popupEdit);
}
function openPopupAdd(){
    openPopup(popupAdd);
}
function openPopupPhoto(){
    openPopup(popupPhoto);
}

function closePopupEdit(){
    closePopup(popupEdit);
}
function closePopupAdd(){
    closePopup(popupAdd);
}
function closePopupPhoto(){
    closePopup(popupPhoto);
}

function closePopup(element){ 
    element.classList.toggle('popup_opened');//функция для закрытия попапов
}

 function openPopup(element){ 
    element.classList.toggle('popup_opened');//функция для открытия попапов
}

function likeCard(evt) {
	evt.target.classList.toggle('element__like_is-active');//тоггл подключает/отключает закрашенное сердечко
}
function deleteCard(evt){
	evt.target.closest('.element').remove();
}

 

editButton.addEventListener('click', renderPopupEdit);
addButton.addEventListener('click', renderPopupAdd);

closePopupEditButton.addEventListener('click', closePopupEdit);
closePopupAddButton.addEventListener('click', closePopupAdd);
closePopupPhotoButton.addEventListener('click', closePopupPhoto);
formEdit.addEventListener('submit', formEditSubmitHandler);
formAdd.addEventListener('submit', formAddSubmitHandler);

initElements(initialCards);


