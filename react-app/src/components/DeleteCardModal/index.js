import React, { useEffect, useState } from "react";
import { useModal } from "../../context/Modal";
import { removeFlashcard } from "../../store/flashcard";
import { useSelector, useDispatch } from 'react-redux'

const DeleteFlashcardModal = ({ flashcardId }) => {
    const dispatch = useDispatch();
    const { closeModal } = useModal();

    const handleDelete = () => {
        dispatch(removeFlashcard(flashcardId));
        closeModal()
    };

    return (
        <div className="delete-confirmation-modal">
            <p>Are you sure you want to delete this flashcard?</p>
            <button onClick={handleDelete}>Yes, Delete!</button> 
            <button onClick ={closeModal}>Cancel</button>
        </div>
    );
};

export default DeleteFlashcardModal
