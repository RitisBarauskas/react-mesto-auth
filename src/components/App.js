import React from 'react';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import DeleteCardPopup from "./DeleteCardPopup";
import ImagePopup from './ImagePopup';
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import api from '../utils/api';
import apiAuth from "../utils/apiAuth";
import {CurrentUserContext} from '../contexts/CurrentUserContext';
import AddPlacePopup from "./AddPlacePopup";
import { Route, Switch } from 'react-router-dom';
import InfoTooltip from "./InfoTooltip";
import Login from "./Login";
import Register from "./Register";
import ProtectedRoute from "./ProtectedRoute";


function App() {
    const [selectedCard, setSelectedCard] = React.useState({name: '', link: ''});
    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
    const [isDeleteCardPopupOpen, setIsDeleteCardPopupOpen] = React.useState(false);
    const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
    const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
    const [currentUser, setCurrentUser] = React.useState({})
    const [cards, setCards] = React.useState([]);
    const [isLoading, setLoading] = React.useState(false);
    const [cardDelete, setCardDelete] = React.useState({});
    const loggedIn = true;

    React.useEffect(() => {
        api.getInitialData().then(([cards, userData]) => {
            setCards(cards);
            setCurrentUser(userData);
        }).catch((err) => console.log(err));

    }, [])

    const handleCardLike = (card) => {
        const isLiked = card.likes.some(i => i._id === currentUser._id);
        api.changeLikeCardStatus(card._id, !isLiked)
            .then((newCard) => {
                setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
            })
            .catch((err) => console.log(err));
    }
    const handleCardDeleteClick = (card) => {
        setIsDeleteCardPopupOpen(true);
        setCardDelete(card);
    }
    const handleCardDelete = (card) => {
        setLoading(true)
        api.deleteCard(card._id)
            .then(() => {
                const newCards = cards.filter(function (deleteCard) {
                    return card !== deleteCard;
                });
                setCards(newCards);
                closeAllPopups();
            })
            .catch((err) => console.log(err))
            .finally(() => setLoading(false));
    }
    
    const handleCardClick = (card) => setSelectedCard(card);

    const closeAllPopups = () => {
        setSelectedCard({name: '', link: ''});
        setIsAddPlacePopupOpen(false);
        setIsEditAvatarPopupOpen(false);
        setIsEditProfilePopupOpen(false);
        setIsDeleteCardPopupOpen(false);
    };

    const handleEditAvatarClick = () => {
        setIsEditAvatarPopupOpen(true);
    }

    const handleEditProfileClick = () => {
        setIsEditProfilePopupOpen(true);
    }

    const handleAddPlaceClick = () => {
        setIsAddPlacePopupOpen(true);
    }

    const handleUpdateUser = (data) => {
        setLoading(true)
        api.editProfile(data)
            .then((res) => {
                setCurrentUser(res);
                closeAllPopups();
            })
            .catch((err) => console.log(err))
            .finally(() => setLoading(false));
    }

    const handleUpdateAvatar = (data) => {
        setLoading(true);
        api.udateAvatar(data)
            .then((res) => {
                setCurrentUser(res);
                closeAllPopups();
            })
            .catch((err) => console.log(err))
            .finally(() => setLoading(false));
    }

    const handleAddPlaceSubmit = (data) => {
        setLoading(true)
        api.addCard(data)
            .then((newCard) => {
                setCards([newCard, ...cards]);
                closeAllPopups();
            })
            .catch((err) => console.log(err))
            .finally(() => setLoading(false));
    }

    return (
        <CurrentUserContext.Provider value={currentUser}>
            <div className="body">
                <div className="page">
                    <Header />
                    <Switch>
                        <Route path="/sign-in">
                            <Login />
                        </Route>
                        <Route path="/sign-up">
                            <Register />
                        </Route>
                        <ProtectedRoute
                            path="/"
                            onCardClick={handleCardClick}
                            onEditProfile={handleEditProfileClick}
                            onAddPlace={handleAddPlaceClick}
                            onEditAvatar={handleEditAvatarClick}
                            cards={cards}
                            onCardLike={handleCardLike}
                            onCardDelete={handleCardDeleteClick}
                            component={Main}
                            loggedIn={loggedIn}
                        />
                    </Switch>
                    <Footer />
                </div>
                <ImagePopup
                    card={selectedCard}
                    onClose={closeAllPopups}
                />
                <EditProfilePopup
                    isOpen={isEditProfilePopupOpen}
                    onClose={closeAllPopups}
                    onUpdateUser={handleUpdateUser}
                    isLoading={isLoading}
                />
                <EditAvatarPopup
                    isOpen={isEditAvatarPopupOpen}
                    onClose={closeAllPopups}
                    onUpdateAvatar={handleUpdateAvatar}
                    isLoading={isLoading}
                />
                <AddPlacePopup
                    isOpen={isAddPlacePopupOpen}
                    onClose={closeAllPopups}
                    onAddPlace={handleAddPlaceSubmit}
                    isLoading={isLoading}
                />
                <DeleteCardPopup
                    isOpen={isDeleteCardPopupOpen}
                    onClose={closeAllPopups}
                    onDeleteCard={handleCardDelete}
                    isLoading={isLoading}
                    card={cardDelete}
                />
                <InfoTooltip />
            </div>
        </CurrentUserContext.Provider>
      );
}

export default App;
