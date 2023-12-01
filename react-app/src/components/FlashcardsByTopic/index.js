import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useParams, useHistory } from "react-router-dom";

function FlashcardsByTopic({ searchBar }){
    const flashcards = useSelector(state => Object.values(state.flashcard))
    const [topicFlashcards, setTopicFlashcards] = useState([])
    const [isLoaded, setIsLoaded] = useState(false)
    const [flippedCardId, setFlippedCardId] = useState(null);
    const history = useHistory();
    const { topicId}  = useParams()

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

    const redirectToDetails = (id) => {
        history.push(`/flashcards/${id}`)
    }

    const redirectToFlashcardSetDetails = (id) => {
        history.push(`flashcard-sets/${id}`)
    }

    useEffect(() => {
        fetch(`/api/flashcards/topic/${topicId}`)
        .then((res) => res.json())
        .then((data) => {
            setTopicFlashcards(data.flashcards);
            setIsLoaded(true);
        })
        .catch(error => console.error("Error:", error));
    }, [topicId]);

    const filteredFlashcards = searchBar ? topicFlashcards.filter(flashcard =>
        flashcard.question.toLowerCase().includes(searchBar.toLowerCase()) ||
        flashcard.answer.toLowerCase().includes(searchBar.toLowerCase()) 
    ) : topicFlashcards;





return (
    <div className='flashcard-container'>
     <div className="flashcard-grid">
            {filteredFlashcards.map(flashcard => (
                <div 
                    key={flashcard.id} 
                    className={`flashcard ${flippedCardId === flashcard.id ? 'flipped' : ''}`} 
                    onClick={() => handleCardClick(flashcard.id)}
                >
                    <div className="flip-container">
                        <div className="front"  style={{ backgroundColor: renderFlashcardColor(flashcard.topicId) }}>
                            <div className="flashcard-question" style={{ fontSize: handleFontSize(flashcard.question)}}>
                                {flashcard.question}
                            </div>
                        </div>
                        <div className="back"  style={{ backgroundColor: renderFlashcardColor(flashcard.topicId) }}>
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
     </div>
)}

export default FlashcardsByTopic