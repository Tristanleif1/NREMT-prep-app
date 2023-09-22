import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { loadFlashcards } from '../../store/flashcard';
import './Flashcards.css'

const Flashcards = () => {
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
                            <div className="flashcard-question">
                                {flashcard.question}
                            </div>
                        </div>
                        <div className="back">
                            <div className="flashcard-answer">
                                {flashcard.answer}
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Flashcards;