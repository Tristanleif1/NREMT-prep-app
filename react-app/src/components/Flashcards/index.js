import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { useHistory, useParams } from "react-router-dom"
import { loadFlashcards } from '../../store/flashcard';
import { loadFlashcardSets } from '../../store/flashcardSet';
import './Flashcards.css'

const Flashcards = () => {
    const history = useHistory()
    const dispatch = useDispatch()

    const [selectedOption, setSelectedOption ] = useState('flashcards')

    const handleOptionSwitch = (e) => {
        setSelectedOption(e.target.value)
    }

    const renderFlashcardColor = (topicId) => {
        const colors = {
            1: '#ADD8E6', // Light Blue
            2: '#90EE90', // Light Green
            3: '#FFFFE0', // Light Yellow
            4: '#FFB6C1', // Light Pink
            5: '#D8BFD8', // Light Purple
        };
        return colors[topicId] 
    }

    useEffect(() => {
        dispatch(loadFlashcards())
        dispatch(loadFlashcardSets())
    }, [dispatch])

    const flashcards = useSelector(state => Object.values(state.flashcard))
    const flashcardSets = useSelector(state => Object.values(state.flashcardSet))
    console.log(flashcardSets)

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

    const redirectToFlashcardSetDetails = (id) => {
        history.push(`flashcard-sets/${id}`)
    }

    return (
       <div className='flashcard-container'>
        <div className='option-container'>
        <label htmlFor="viewOptions" className='view-label'>What do you want to study?</label>
        <select id="viewOptions" value={selectedOption} onChange={handleOptionSwitch} className='option-select'>
            <option value="flashcards">Flashcards</option>
            <option value="flashcardSets">Flashcard Sets</option>
        </select>
        </div>
        {selectedOption === 'flashcards' && (
        <div className="flashcard-grid">
            {flashcards.map(flashcard => (
                <div 
                    key={flashcard.id} 
                    className={`flashcard ${flippedCardId === flashcard.id ? 'flipped' : ''}`} 
                    onClick={() => handleCardClick(flashcard.id)}
                >
                    <div className="flip-container">
                        <div className="front" style={{ backgroundColor: renderFlashcardColor(flashcard.topicId) }}>
                            <div className="flashcard-question" style={{ fontSize: handleFontSize(flashcard.question)}}>
                                {flashcard.question}
                            </div>
                        </div>
                        <div className="back" style={{ backgroundColor: renderFlashcardColor(flashcard.topicId) }}>
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
        )}

        {selectedOption === "flashcardSets" && (
        <div className='flashcard-sets-section'>
            <h2>Flashcard Sets</h2>
            <div className='flashcard-sets-grid'>
                {flashcardSets.map(set => (
                    <div key={set.id} className='flashcard-set' onClick={(e) => {e.stopPropagation(); redirectToFlashcardSetDetails(set.id)}}>
                        <h3>{set.title}</h3>
                        <p>{set.flashcards?.length} questions</p>
                        <p className='username'>{set?.user?.username}</p>
                        </div>
                ))}
            </div>
            </div>
            )}
        </div>
    );
};

export default Flashcards;