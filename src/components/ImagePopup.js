import React from 'react';


function ImagePopup({card, onClose}) {
    
    return (
        <div className={`popup popup_view-pic ${card.link && 'popup_opened'}`}>               
            <div className="popup__container popup__container_view-pic">
                <h2 className="popup__title popup__title_view-pic">
                    {card?.name}
                </h2>
                <img src={card?.link} alt={card?.name} className="popup__image" />
                <button type="button" className="popup__close" onClick={onClose}></button>
            </div>
        </div>        
    );
}

export default ImagePopup;