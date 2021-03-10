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
let closePopupEditButton = document.querySelector('#popup-edit__close-button');
let closePopupAddButton = document.querySelector('#popup-add__close-button');


let formEdit=document.querySelector('#form-edit');
let nameInput=formEdit.querySelector('.form-edit__input_type_name');// Воспользуйтесь инструментом .querySelector()
let jobInput=formEdit.querySelector('.form-edit__input_type_job');// Воспользуйтесь инструментом .querySelector()
// Находим профиль в DOM
let formAdd=document.querySelector('#form-add');
let titleInput=formAdd.querySelector('.form-add__input_type_title');// Воспользуйтесь инструментом .querySelector()
let linkInput=formAdd.querySelector('.form-add__input_type_link');// Воспользуйтесь инструментом .querySelector()

let profile=document.querySelector(".profile"); // Воспользуйтесь инструментом .querySelector()
let profileName=profile.querySelector(".profile__title"); // Воспользуйтесь инструментом .querySelector()
let profileJob=profile.querySelector(".profile__subtitle");// Воспользуйтесь инструментом .querySelector()


let elementList = document.querySelector('.elements__list');



function createCard(name, link) {
    const templateElement = document.querySelector('#template').content;//нашли темплейт
    const card = templateElement.cloneNode(true);//клонировали ноду
    card.querySelector('.element__image').src = link;//присвоили значения
    card.querySelector('.element__image').alt = name;
    card.querySelector('.element__title').textContent = name;
    elementList.prepend(card);//делаем список карточек, карточка добавляется с начала в конец
  }
function initElements(array) {//инициализировали заполнение
  array.forEach(function(item){
    createCard(item.name, item.link);
  });
}

function openEditPopup() { //открытие попапа для редактирования
    nameInput.value = profileName.textContent;
    jobInput.value = profileJob.textContent; // Вставьте новые значения с помощью textContent
    popupEdit.classList.toggle('popup_opened');
}
function openAddPopup(){
    popupAdd.classList.toggle('popup_opened');
    titleInput.value="";
    linkInput.value="";
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
function closePopup(element){ 
    element.classList.toggle('popup_opened');//функция для закрытия попапов
 }


 

editButton.addEventListener('click', openEditPopup);
addButton.addEventListener('click', openAddPopup);
closePopupEditButton.addEventListener('click', closePopupEdit);
closePopupAddButton.addEventListener('click', closePopupAdd);
formEdit.addEventListener('submit', formEditSubmitHandler);
formAdd.addEventListener('submit', formAddSubmitHandler);

initElements(initialCards);

let likeButton = document.querySelectorAll('.element__like');//объяаляем переменную здесь после инициализации стартовых карточек

likeButton.forEach(function(item){ //пробегаемся по всем лайкам, при нажатии меняем состояние
    item.addEventListener('click', 
        function likeToggle(){
            item.classList.toggle('element__like_is-active');
    });
});
