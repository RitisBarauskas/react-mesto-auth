import React from 'react';
import ImageAuthOk from '../images/auth_ok.svg';
import ImageAuthNo from '../images/auth_no.svg'

function InfoTooltip({isAuth, isOpen, onClose}) {

    return (
        <div className={`popup popup_auth ${isOpen && 'popup_opened'}`}>
            <div className="popup__container popup__container_auth">
                <img src={isAuth ? ImageAuthOk : ImageAuthNo} className="popup__image-auth" alt={isAuth ? 'Все прошло успешно!' : 'Что-то пошло не так'} />
                <h2 className="popup__title popup__title_auth">
                    {isAuth ? 'Все прошло успешно!' : 'Что-то пошло не так'}
                </h2>
                <button type="button" className="popup__close" onClick={onClose}> </button>
            </div>
        </div>
    );
}

export default InfoTooltip;