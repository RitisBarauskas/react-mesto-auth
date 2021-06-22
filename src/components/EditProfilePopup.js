import React from 'react';
import PopupWithForm from "./PopupWithForm";
import {CurrentUserContext} from "../contexts/CurrentUserContext";

function EditProfilePopup({isOpen, onClose, onUpdateUser, isLoading}) {
    const currentUser = React.useContext(CurrentUserContext);
    const submitButton = isLoading ? 'Обновление...' : 'Редактировать';
    const [nameInput, setNameInput] = React.useState({
        value: '',
        isValid: false,
        errorMessage: ''
    });
    const [descriptionInput, setDescriptionInput] = React.useState({
        value: '',
        isValid: false,
        errorMessage: ''
    });
    React.useEffect(() => {
        setNameInput({
            value: currentUser.name,
            isValid: true,
            errorMessage: ''
        });
        setDescriptionInput({
            value: currentUser.about,
            isValid: true,
            errorMessage: ''
        });
    }, [currentUser, isOpen]);

    const handleNameChange = (evt) => {
        setNameInput({
            value: evt.target.value,
            errorMessage: evt.target.validationMessage,
            isValid: (evt.target.validationMessage ? false : true)
        });
    }

    const handleDescriptionChange = (evt) => {
        setDescriptionInput({
            value: evt.target.value,
            errorMessage: evt.target.validationMessage,
            isValid: (evt.target.validationMessage ? false : true)
        });
    }

    const handleSubmit = (evt) => {
        evt.preventDefault();
        const name = nameInput.value;
        const description = descriptionInput.value;

        onUpdateUser({
            name,
            about: description,
        });
    }

    return (
        <PopupWithForm
            isOpen={isOpen}
            name="edit-profile"
            nameButton={submitButton}
            title="Редактировать профиль"
            onClose={onClose}
            onSubmit={handleSubmit}
            submitDisabled={(!nameInput.isValid || !descriptionInput.isValid)}
        >
            <label className="popup__label">
                <input
                    className="popup__input"
                    id="name-input"
                    type="text"
                    name="title"
                    value={nameInput.value || ''}
                    placeholder="Имя"
                    required
                    maxLength="40"
                    minLength="2"
                    onChange={handleNameChange}
                />
                <span className="name-input-error popup__error popup__error_visible">{nameInput.errorMessage}</span>
            </label>
            <label className="popup__label">
                <input
                    className="popup__input"
                    id="profession-input"
                    type="text"
                    name="subtitle"
                    defaultValue={descriptionInput.value || ''}
                    placeholder="Профессия"
                    required
                    minLength="2"
                    maxLength="200"
                    onChange={handleDescriptionChange}
                />
                <span className="profession-input-error popup__error popup__error_visible">{descriptionInput.errorMessage}</span>
            </label>
        </PopupWithForm>
    )
}

export default EditProfilePopup;