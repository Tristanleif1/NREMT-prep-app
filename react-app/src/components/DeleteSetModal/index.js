import React, { useEffect, useState } from "react";
import { useModal } from "../../context/Modal";
import { removeFlashcardSet } from "../../store/flashcardSet";
import { useSelector, useDispatch } from 'react-redux'
import "../DeleteCardModal/DeleteModal.css"

const DeleteFlashcardSetModal = ({ flashcardSetId }) => {
    const dispatch = useDispatch();
    const { closeModal } = useModal();

    const handleDelete = () => {
        dispatch(removeFlashcardSet(flashcardSetId));
        closeModal()
    };

    return (
        <div className="delete-confirmation-modal">
            <p className="delete-text">Are you sure you want to delete this flashcard set?</p>
            <button className="delete-button" onClick={handleDelete}>Yes, Delete them!</button> 
            <button className="cancel-button" onClick ={closeModal}>Cancel</button>
        </div>
    );
};

export default DeleteFlashcardSetModal
