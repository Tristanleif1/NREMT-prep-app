import React, { useEffect, useState } from "react";
import { useModal } from "../../context/Modal";
import { removeQuiz } from "../../store/quiz";
import { useSelector, useDispatch } from "react-redux";
import "../DeleteCardModal/DeleteModal.css"

const DeleteQuizModal = ({ quizId }) => {
    const dispatch = useDispatch();
    const { closeModal } = useModal();

    const handleQuizDelete = () => {
        dispatch(removeQuiz(quizId));
        closeModal();
    };

    return (
        <div className="delete-confirmation-modal">
            <p className="delete-text"> Are you sure you want to delete this quiz? </p>
            <button className="delete-button" onClick={handleQuizDelete}>Yes, Delete!</button>
            <button className="cancel-button" onClick={closeModal}>Cancel</button>
        </div>
    )
}

export default DeleteQuizModal