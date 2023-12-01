import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from "react-router-dom";
import { getMyQuizzes } from "../../store/quiz";
import { useModal } from "../../context/Modal";
import DeleteQuizModal from "../DeleteQuizModal";
import { removeQuiz } from "../../store/quiz";
import "./MyQuizzes.css"

const MyQuizzes = () => {
    const history =  useHistory();
    const dispatch = useDispatch();
    const user = useSelector((state) => state.session.user);
    if(!user){
        history.push("/")
    }

    const { setModalContent } = useModal()

    useEffect(() => {
        dispatch(getMyQuizzes())
    }, [dispatch])

    const quizzes = useSelector(state => Object.values(state.quiz.quizzes));

    const redirectToQuizDetails = (id) => {
        history.push(`/quizzes/${id}`)
    }

    const redirectToUpdate = (id) => {
        history.push(`/quizzes/${id}/edit`)
    }

    const handleQuizDelete = (quizId, e) => {
        e.stopPropagation();
        setModalContent(<DeleteQuizModal quizId={quizId} />)
    }

    return (
        <div className='my-quizzes-section'>
            <h2>My Quizzes:</h2>
            <div className='quizzes-grid'>
                {quizzes.map(quiz => (
                    <div key={quiz.id} className='my-individual-quiz' onClick={(e) => {
                        e.stopPropagation();
                         redirectToQuizDetails(quiz.id);}}>
                        <h3>{quiz.title}</h3>
                        {/* <p>{set.flashcards?.length} questions</p> */}
                        {/* <p className='username'>{set?.user?.username}</p> */}
                        <div className="trash-icon" onClick={(e) => handleQuizDelete(quiz.id, e)}>
                        🗑️
                    </div>
                    <div className='quiz-edit-icon' onClick={(e) => {
                            e.stopPropagation();
                            redirectToUpdate(quiz.id, e);
                        }}>🖉</div> 
                </div>
                ))}
            </div>
        </div>
    )


}

export default MyQuizzes