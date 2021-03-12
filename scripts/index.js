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

let editButton = document.querySelector('.profile__edit-button');//нашли кнопку изменить
let addButton = document.querySelector('.profile__add-button');//нашли кнопку добавить

let popup = document.querySelector('.popup');
let popupEdit = document.querySelector('.popup_type_edit');
let popupAdd = document.querySelector('.popup_type_add');
let popupPhoto = document.querySelector('.popup_type_photo');

let closePopupEditButton = document.querySelector('#popup-edit__close-button');
let closePopupAddButton = document.querySelector('#popup-add__close-button');
let closePopupPhotoButton = document.querySelector('#popup-photo__close-button');

let formEdit=document.querySelector('#form-edit');
let nameInput=formEdit.querySelector('.form__field_type_name');// Воспользуйтесь инструментом .querySelector()
let jobInput=formEdit.querySelector('.form__field_type_job');// Воспользуйтесь инструментом .querySelector()
// Находим профиль в DOM
let formAdd=document.querySelector('#form-add');
let titleInput=formAdd.querySelector('.form__field_type_title');// Воспользуйтесь инструментом .querySelector()
let linkInput=formAdd.querySelector('.form__field_type_link');// Воспользуйтесь инструментом .querySelector()

let profile=document.querySelector(".profile"); // Воспользуйтесь инструментом .querySelector()
let profileName=profile.querySelector(".profile__title"); // Воспользуйтесь инструментом .querySelector()
let profileJob=profile.querySelector(".profile__subtitle");// Воспользуйтесь инструментом .querySelector()


let elementList = document.querySelector('.elements__list');



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
    likeButton.addEventListener('click', likeCard);
	deleteButton.addEventListener('click', deleteCard);//cслушаем кнопку и пользуемся функцией удалить
    image.addEventListener('click', openPopupPhoto);
    elementList.prepend(card);//делаем список карточек, карточка добавляется с начала в конец
  }
function initElements(array) {//инициализировали заполнение
  array.forEach(function(item){
    createCard(item.name, item.link);
  });
}

function openPopupEdit() { //открытие попапа для редактирования
    nameInput.value = profileName.textContent;
    jobInput.value = profileJob.textContent; // Вставьте новые значения с помощью textContent
    popupEdit.classList.toggle('popup_opened');
}
function openPopupAdd(){
    titleInput.value="";
    linkInput.value="";
    popupAdd.classList.toggle('popup_opened');
}

function openPopupPhoto(evt){
    let picturePopup=document.querySelector('.popup__image');
    let captionPopup=document.querySelector('.popup__caption');
    let dataPopup=evt.path[1];
    let imageCard = dataPopup.querySelector('.element__image');
    let titleCard = dataPopup.querySelector('.element__title')
    picturePopup.src=imageCard.src;//задаем значения, отталкиваясь от события
    captionPopup.textContent=titleCard.textContent;
    popupPhoto.classList.toggle('popup_opened');
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

function likeCard(evt) {
	evt.target.classList.toggle('element__like_is-active');//тоггл подключает/отключает закрашенное сердечко
}
function deleteCard(evt){
	evt.target.closest('.element').remove();
}

 

editButton.addEventListener('click', openPopupEdit);
addButton.addEventListener('click', openPopupAdd);
closePopupEditButton.addEventListener('click', closePopupEdit);
closePopupAddButton.addEventListener('click', closePopupAdd);
closePopupPhotoButton.addEventListener('click', closePopupPhoto);
formEdit.addEventListener('submit', formEditSubmitHandler);
formAdd.addEventListener('submit', formAddSubmitHandler);

initElements(initialCards);


