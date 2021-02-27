let editButton = document.querySelector('.profile__edit-button');
let popup = document.querySelector('.popup');
let closePopupButton = document.querySelector('.popup__close-button');

// Находим форму в DOM
let formElement=document.querySelector('.edit-form');// Воспользуйтесь методом querySelector()
let nameInput=formElement.querySelector('.edit-form__input_type_name');// Воспользуйтесь инструментом .querySelector()
let jobInput=formElement.querySelector('.edit-form__input_type_job');// Воспользуйтесь инструментом .querySelector()
// Находим профиль в DOM
let profile=document.querySelector(".profile"); // Воспользуйтесь инструментом .querySelector()
let profileName=profile.querySelector(".profile__title"); // Воспользуйтесь инструментом .querySelector()
let profileJob=profile.querySelector(".profile__subtitle");// Воспользуйтесь инструментом .querySelector()

//функция открытия попапа: слушатель определяет клик и подмиксовывает селектор
function showPopup(){
    popup.classList.add('popup_opened');
    nameInput.value = profileName.textContent;
    jobInput.value = profileJob.textContent;
}

//функция закрытия попапа: слушатель определяет клик и подмиксовывает селектор
function closePopup(){
    popup.classList.remove('popup_opened');
}



function formSubmitHandler (evt) {
    evt.preventDefault();
     profileName.textContent = nameInput.value;
     profileJob.textContent = jobInput.value; // Вставьте новые значения с помощью textContent
}
 

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»

editButton.addEventListener('click', showPopup);
closePopupButton.addEventListener('click', closePopup);
formElement.addEventListener('submit', formSubmitHandler);
formElement.addEventListener('submit', closePopup);  
// editForm.addEventListener('submit', saveForm);