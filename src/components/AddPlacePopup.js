import React from 'react';
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup({isOpen, onClose, onAddPlace, isLoading}) {
    const [nameInput, setNameInput] = React.useState({
        value: '',
        errorMessage: '',
        isValid: false
    });
    const [linkInput, setLinkInput] = React.useState({
        value: '',
        errorMessage: '',
        isValid: false
    });
    const submitButton = isLoading ? 'Сохранение...' : 'Создать';
    React.useEffect(() => {
        setNameInput({
            value: '',
            errorMessage: '',
            isValid: false
        });
        setLinkInput({
            value: '',
            errorMessage: '',
            isValid: false
        });
    }, [isOpen]);

    const handleNameChange = (evt) => {
        setNameInput({
            value: evt.target.value,
            errorMessage: evt.target.validationMessage,
            isValid: (evt.target.validationMessage ? false : true)
        });
    }

    const handleLinkChange = (evt) => {
        setLinkInput({
            value: evt.target.value,
            errorMessage: evt.target.validationMessage,
            isValid: (evt.target.validationMessage ? false : true)
        });
    }

    const handleSubmit = (evt) => {
        evt.preventDefault();
        const name = nameInput.value;
        const link = linkInput.value;
        onAddPlace({name, link})
    }
    return (
        <PopupWithForm
            isOpen={isOpen}
            name="new-card"
            nameButton={submitButton}
            title="Новое место"
            onClose={onClose}
            onSubmit={handleSubmit}
            submitDisabled={(!linkInput.isValid || !nameInput.isValid)}
        >
            <label className="popup__label">
                <input
                    className="popup__input"
                    id="place-input"
                    type="text"
                    name="name"
                    value={nameInput.value}
                    placeholder="Название"
                    required
                    minLength="2"
                    maxLength="30"
                    onChange={handleNameChange}
                />
                <span className="place-input-error popup__error popup__error_visible">{nameInput.errorMessage}</span>
            </label>
            <label className="popup__label">
                <input
                    className="popup__input"
                    id="url-input"
                    type="url"
                    name="link"
                    value={linkInput.value}
                    placeholder="Ссылка на картинку"
                    required
                    onChange={handleLinkChange}
                />
                <span className="url-input-error popup__error popup__error_visible">{linkInput.errorMessage}</span>
            </label>
        </PopupWithForm>
    )
}

export default AddPlacePopup;