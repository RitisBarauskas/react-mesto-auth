import React from 'react';
import {CurrentUserContext} from "../contexts/CurrentUserContext";

function Card({card, onCardClick, onCardLike, onCardDelete}) {
    const currentUser = React.useContext(CurrentUserContext);
    const isOwn = card.owner._id === currentUser._id;
    const cardDeleteButtonClassName = (
        `element__trash ${isOwn ? 'element__trash_visible' : 'element__trash_hidden'}`
    );
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    const cardLikeButtonClassName = `element__like ${isLiked && 'element__like_active'}`;

    return(
        <li className="places__item element">
            <button type="button" className={cardDeleteButtonClassName} onClick={_ => onCardDelete(card)}></button>
            <img src={card.link} alt={card.name} className="element__image" onClick={_ => onCardClick(card)}/>
            <div className="element__info">
                <h2 className="element__title">{card.name}</h2>        
                <div className="element__likes">
                <button type="button" className={cardLikeButtonClassName} onClick={_ => onCardLike(card)}></button>
                <div className="element__likes-count">{card.likes.length}</div>
                </div>
            </div>
        </li>
    );
}

export default Card;