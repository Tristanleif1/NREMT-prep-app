import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { useHistory, useParams } from "react-router-dom"
import { loadFlashcards } from '../../store/flashcard';
import './Flashcards.css'

const Flashcards = () => {
    const history = useHistory()
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(loadFlashcards())
    }, [dispatch])

    const flashcards = useSelector(state => Object.values(state.flashcard))

    const [flippedCardId, setFlippedCardId] = useState(null);

    const handleCardClick = (id) => {
        // Toggle the card. If it's already flipped, set to null. Otherwise, set to the clicked card's ID.
        setFlippedCardId(prevId => prevId === id ? null : id);
    };

    const handleFontSize = (text) => {
        const length =  text.length;
        if(length <= 10) return '1.5rem';
        if(length <= 50) return '1.2rem';
        if(length <= 100) return '1rem';
        if(length <= 150) return '0.8rem';
        return '0.6rem'
    }

    const redirectToDetails = (id) => {
        history.push(`/flashcards/${id}`)
    }

    return (
        <div className="flashcard-grid">
            {flashcards.map(flashcard => (
                <div 
                    key={flashcard.id} 
                    className={`flashcard ${flippedCardId === flashcard.id ? 'flipped' : ''}`} 
                    onClick={() => handleCardClick(flashcard.id)}
                >
                    <div className="flip-container">
                        <div className="front">
                            <div className="flashcard-question" style={{ fontSize: handleFontSize(flashcard.question)}}>
                                {flashcard.question}
                            </div>
                        </div>
                        <div className="back">
                            <div className="flashcard-answer" style={{ fontSize: handleFontSize(flashcard.answer)}}>
                                {flashcard.answer}
                            </div>
                        </div>
                        <div className='ellipsis' onClick={(e) => {
                        e.stopPropagation();
                         redirectToDetails(flashcard.id);}}>...</div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Flashcards;