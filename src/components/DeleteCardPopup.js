import React from 'react';
import PopupWithForm from "./PopupWithForm";

function DeleteCardPopup({isOpen, onClose, onDeleteCard, isLoading, card}) {
    const submitButton = isLoading ? 'Удаление...' : 'Да';

    const handleSubmit = (evt) => {
        evt.preventDefault();
        onDeleteCard(card);
    }

    return (
        <PopupWithForm
            isOpen={isOpen}
            name="delete-card"
            nameButton={submitButton}
            title="Вы уверены?"
            onClose={onClose}
            onSubmit={handleSubmit}
        />
    )
}

export default DeleteCardPopup;