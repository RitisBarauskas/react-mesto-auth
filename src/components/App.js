import React, { useState, useEffect } from 'react';
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
import {Route, Switch, useHistory} from 'react-router-dom';
import InfoTooltip from "./InfoTooltip";
import Login from "./Login";
import Register from "./Register";
import ProtectedRoute from "./ProtectedRoute";


function App() {
    const [loggedIn, setLoggedIn] = useState(false);
    const [userEmail, setUserEmail] = useState('');
    const [selectedCard, setSelectedCard] = useState({name: '', link: ''});
    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
    const [isDeleteCardPopupOpen, setIsDeleteCardPopupOpen] = useState(false);
    const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
    const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
    const [isInfoTooltipPopupOpen, setIsInfoTooltipPopupOpen] = useState(false);
    const [isInfoTooltipAuth, setIsInfoTooltipAuth] = useState(false);
    const [currentUser, setCurrentUser] = useState({})
    const [cards, setCards] = useState([]);
    const [isLoading, setLoading] = useState(false);
    const [cardDelete, setCardDelete] = useState({});

    const history = useHistory();

    useEffect(() => {
        api.getInitialData().then(([cards, userData]) => {
            setCards(cards);
            setCurrentUser(userData);
        }).catch((err) => console.log(err));
    }, [])

    useEffect(() => {
        tokenCheck();
    }, []);

    useEffect(() => {
        if (loggedIn) {
            history.push("/");
        }
    }, [history, loggedIn]);

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
        setIsInfoTooltipPopupOpen(false);
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

    const tokenCheck = () => {
        const jwt = localStorage.getItem('jwt');
        if (jwt) {
            apiAuth.getUser(jwt)
                .then((res) => {
                    if (res) {
                        setUserEmail(res.data.email);
                        setLoggedIn(true);
                        history.push('/');
                    }
                })
                .catch(err => console.log(err));
        }
    }

    const handleSignIn = (data) => {
        apiAuth.signIn(data)
            .then((res) => {
                if (res.token) {
                    localStorage.setItem('jwt', res.token);
                    setUserEmail(data.email);
                    setLoggedIn(true);
                    history.push('/');
                } else {
                    setIsInfoTooltipAuth(false);
                    setIsInfoTooltipPopupOpen(true);
                }
            })
            .catch(err => console.log(err));
    }

    const handleSignUp = data => {
        apiAuth.signUp(data)
            .then((res)=> {
                if (res.data.email === data.email){
                    setIsInfoTooltipAuth(true);
                    history.push('/sign-in')
                } else {
                    setIsInfoTooltipAuth(false);
                }
            })
            .catch(err => console.log(err))
            .finally(() => setIsInfoTooltipPopupOpen(true));
    }

    const handleLogout = () => {
        localStorage.removeItem('jwt');
        setUserEmail('');
        setLoggedIn(false);
        history.push('sign-in');
    }

    return (
        <CurrentUserContext.Provider value={currentUser}>
            <div className="body">
                <div className="page">
                    <Header
                        handleLogout={handleLogout}
                        email={userEmail}
                    />
                    <Switch>
                        <ProtectedRoute
                            exact
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
                        <Route path="/sign-in">
                            <Login
                                handleSignIn={handleSignIn}
                            />
                        </Route>
                        <Route path="/sign-up">
                            <Register
                                handleSignUp={handleSignUp}
                            />
                        </Route>
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
                <InfoTooltip
                    isOpen={isInfoTooltipPopupOpen}
                    isAuth={isInfoTooltipAuth}
                    onClose={closeAllPopups}
                />
            </div>
        </CurrentUserContext.Provider>
      );
}

export default App;
