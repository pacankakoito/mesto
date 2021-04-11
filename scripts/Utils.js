function openPopup(element){ 
    element.classList.add('popup_opened');//функция для открытия попапов
    document.addEventListener('keyup', handleEscUp);//Навешиваем слушателя при открытом попап для Esc
}

function closePopup(element){ 
    element.classList.remove('popup_opened');//функция для закрытия попапов
    document.removeEventListener('keyup', handleEscUp);//убираем слушателя при закрытии попапа
}

const handleEscUp = (evt) => { //при нажатом Escape закрываем попап
    if (evt.key === 'Escape' || evt.key === 'Esc') { 
      const activePopup = document.querySelector('.popup_opened');
      closePopup(activePopup);
    
    }
  };

export {openPopup, closePopup, handleEscUp};