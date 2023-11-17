import React, { useEffect, useState } from "react";
import { useModal } from "../../context/Modal";
import { removeQuiz } from "../../store/quiz";
import { useSelector, useDispatch } from "react-redux";

const DeleteQuizModal = ({ quizId }) => {
    const dispatch = useDispatch();
    const { closeModal } = useModal();

    const handleQuizDelete = () => {
        // console.log("Deleting quiz with id:", quiz.id)
        dispatch(removeQuiz(quizId));
        closeModal();
    };

    return (
        <div className="delete-confirmation-modal">
            <p> Are you sure you want to delete this quiz? </p>
            <button onClick={handleQuizDelete}>Yes, Delete!</button>
            <button onClick={closeModal}>Cancel</button>
        </div>
    )
}

export default DeleteQuizModal