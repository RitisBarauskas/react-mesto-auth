import React, { useState, useEffect } from 'react';
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup({isOpen, onClose, onUpdateAvatar, isLoading}) {
    const [avatarLink, setAvatarLink] = useState('');
    const [isValid, setIsValid] = useState(false);
    const [errorMessage, setErrorMessage] = useState('')
    const submitButton = isLoading ? 'Обновление...' : 'Обновить';

    useEffect(() => {
        setAvatarLink('');
        setIsValid(false);
        setErrorMessage('');
    }, [isOpen]);

    const handleSubmit = (evt) => {
        evt.preventDefault();
        onUpdateAvatar({
            avatar: avatarLink,
        });
    }

    const handleChangeLink = (evt) => {
        setAvatarLink(evt.target.value);
        setErrorMessage(evt.target.validationMessage);
        setIsValid(evt.target.validationMessage ? false : true);
    }

    return (
        <PopupWithForm
            isOpen={isOpen}
            name="edit-avatar"
            nameButton={submitButton}
            title="Обновить аватар"
            onClose={onClose}
            onSubmit={handleSubmit}
            buttonTitle={submitButton}
            submitDisabled={!isValid}
        >
            <label className="popup__label">
                <input
                    className="popup__input"
                    id="link-input"
                    type="url"
                    name="linkAvatar"
                    defaultValue=""
                    placeholder="Ссылка на аватар"
                    required
                    value={avatarLink || ''}
                    onChange={handleChangeLink}
                />
                <span className="link-input-error popup__error popup__error_visible">{errorMessage}</span>
            </label>
        </PopupWithForm>
    )
}

export default EditAvatarPopup;