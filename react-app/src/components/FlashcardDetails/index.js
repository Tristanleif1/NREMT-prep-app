import React, { useEffect, useState} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory, useParams } from "react-router-dom"
import { getSingleFlashcard } from '../../store/flashcard';
import "./FlashcardDetail.css"
import { BsCaretLeftFill, BsFillCaretRightFill } from "react-icons/bs";

function FlashcardDetails() {
    const { id } = useParams();
    const history = useHistory();
    const dispatch = useDispatch();
    const flashcard = useSelector(state => state.flashcard[id]);
    const flashcardIds = useSelector(state => Object.keys(state.flashcard).map(Number));

    const currentIndex = flashcardIds.indexOf(Number(id));

    useEffect(() => {
        dispatch(getSingleFlashcard(id))
    }, [dispatch, id])

    const goToPrevious = () => {
        if (currentIndex > 0) {
            history.push(`/flashcards/${flashcardIds[currentIndex - 1]}`);
        }
    };

    const goToNext = () => {
        if (currentIndex < flashcardIds.length - 1) {
            history.push(`/flashcards/${flashcardIds[currentIndex + 1]}`);
        }
    };

    if (!flashcard) return <div>Loading...</div>;

    return (
        <div className="flashcard-detail-page">
            <h1 className='project-detail-header'>Flashcard Review!</h1>
            <div className='flashcard-section'>
                <BsCaretLeftFill className='change-question-button' onClick={goToPrevious} />
                <div className='flashcard-detail'>
                    <h2>{flashcard.question}</h2>
                    <h3>{flashcard.answer}</h3>
                </div>
            <BsFillCaretRightFill className='change-question-button' onClick={goToNext} />
        </div>
    </div>
    );
}

export default FlashcardDetails;