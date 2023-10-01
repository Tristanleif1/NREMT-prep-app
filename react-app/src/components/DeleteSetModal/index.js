import React, { useEffect, useState } from "react";
import { useModal } from "../../context/Modal";
import { removeFlashcardSet } from "../../store/flashcardSet";
import { useSelector, useDispatch } from 'react-redux'

const DeleteFlashcardSetModal = ({ flashcardSetId }) => {
    const dispatch = useDispatch();
    const { closeModal } = useModal();

    const handleDelete = () => {
        dispatch(removeFlashcardSet(flashcardSetId));
        closeModal()
    };

    return (
        <div className="delete-confirmation-modal">
            <p>Are you sure you want to delete this flashcard set?</p>
            <button onClick={handleDelete}>Yes, Delete them!</button> 
            <button onClick ={closeModal}>Cancel</button>
        </div>
    );
};

export default DeleteFlashcardSetModal
