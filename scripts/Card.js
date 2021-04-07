   const picturePopup=document.querySelector('.popup__image');
   const captionPopup=document.querySelector('.popup__caption');
   const popupPhoto = document.querySelector('.popup_type_photo');

 export class Card{

 constructor(data, cardSelector) {
   this._cardSelector = cardSelector;
   this._name = data.name;
   this._link = data.link;

  }

  _getTemplate(){
    const cardElement = document
    .querySelector(this._cardSelector)
    .content
    .querySelector('.element')
    .cloneNode(true);

    this._element = cardElement;// нашли темплейт в разметке

    return cardElement;
  }
  generateCard() {     
    this._element = this._getTemplate();
    this._setEventListeners();
    this._element.querySelector('.element__image').src = this._link;
    this._element.querySelector('.element__image').alt = this._name;
    this._element.querySelector('.element__title').textContent = this._name;
    return this._element;//сгенерировали карточку
    } 

  _setEventListeners() {
    this._element.querySelector('.element__image').addEventListener('click', (evt) => {
      this._openPopupPhoto(evt);//слушатель нажатия на картинку для открывания большой картинки
    });
    this._element.querySelector('.element__delete').addEventListener('click', (evt) => {
      this._deleteCard(evt);//слушатель нажатия на помойку
    });
    this._element.querySelector('.element__like').addEventListener('click', (evt) => {
      this._likeCard(evt);//слушатель нажатия на лайк
    }); 
    popupPhoto.addEventListener('click', (evt) => {
     this._closePhotoPopup(evt);//слушатель нажатия на закрывание
    });
    document.addEventListener('keyup', (evt) => {
      this._closePhotoPopupEscUp(evt);
    });
  }
  _deleteCard(evt){
	    evt.target.closest('.element').remove();//удалятель карточки
  }
  _likeCard(evt) {
      evt.target.classList.toggle('element__like_is-active');//тоггл подключает/отключает закрашенное сердечко
  }
  _openPopupPhoto(evt){
      picturePopup.src=evt.target.src;//задаем значения, отталкиваясь от события (URL картинки копируем)
      captionPopup.textContent=evt.target.alt;//задаем значения, отталкиваясь от события (копируем заголовок)
      picturePopup.alt=evt.target.alt;
      popupPhoto.classList.add('popup_opened');
  }
  // _closePopup(element){ 
  //     element.classList.remove('popup_opened');//функция для закрытия попапов
  //     document.removeEventListener('keyup', handleEscUp);//убираем слушателя при закрытии попапа
  //     popupPhoto.classList.remove('popup_opened');
  //   }

  _closePhotoPopup(evt) {
    if (evt.target.classList.contains('popup_opened') || evt.target.classList.contains('popup__close-button')) {
      popupPhoto.classList.remove('popup_opened');//закрыватель попапа
    }
  }
  _closePhotoPopup(evt) {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      popupPhoto.classList.remove('popup_opened');//закрыватель попапа
    };
  }

}

  