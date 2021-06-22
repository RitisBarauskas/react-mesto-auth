import React from 'react';
import Card from './Card';
import {CurrentUserContext} from "../contexts/CurrentUserContext";

function Main({onCardClick, onEditProfile, onAddPlace, onEditAvatar, cards, onCardLike, onCardDelete}) {
    const currentUser = React.useContext(CurrentUserContext);

    return (
        <main className="main">
            <section className="profile">
                <div className="profile__group">
                    <div className="profile__avatar" >
                        <div className="profile__edit-avatar" onClick={onEditAvatar} style={{ backgroundImage: `url(${currentUser.avatar})` }} ></div>
                    </div>            
                    <div className="profile__info">
                        <h1 className="profile__title">{currentUser.name}</h1>
                        <button type="button" className="profile__edit-button" onClick={onEditProfile}></button>
                        <p className="profile__subtitle">{currentUser.about}</p>
                    </div>
                </div>
                <button type="button" className="profile__add-button" onClick={onAddPlace}></button>
            </section>
            <section className="places">
                <ul className="places__list">
                    
                    {cards.map((card, i) => (
                        <Card
                            key={card._id}
                            card={card}
                            onCardClick={onCardClick}
                            onCardLike={onCardLike}
                            onCardDelete={onCardDelete}
                        />
                    ))}
                </ul>
            </section>
            
        </main>        
    );
  }
  
  export default Main;