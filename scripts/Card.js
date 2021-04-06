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

    this._cardItem = cardElement;

    return cardElement;
  }
  generateCard() {     
    this._cardItem = this._getTemplate();
    // this._setEventListeners();
    this._cardItem.querySelector('.element__image').src = this._link;
    this._cardItem.querySelector('.element__image').alt = this._name;
    this._cardItem.querySelector('.element__title').textContent = this._name;
    return this._cardItem;
    } 
  }

  