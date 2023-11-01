import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from "react-router-dom"
import { loadFlashcards } from "../../store/flashcard";
import DeleteFlashcardModal from "../DeleteCardModal";
import { useModal } from "../../context/Modal"
import "../Flashcards/Flashcards.css"

const MyFlashcards = () => {
    const history = useHistory()
    const dispatch = useDispatch()
    const user = useSelector((state) => state.session.user);
    if (!user) {
        history.push("/");
      }
    // const [showModal, setShowModal] = useState(false);
    const { setModalContent } = useModal()

    useEffect(() => {
        dispatch(loadFlashcards())
    }, [dispatch])

    const flashcards = useSelector(state => Object.values(state.flashcard).filter(card => card.userId === user.id))

    const [flippedCardId, setFlippedCardId] = useState(null);

    const handleCardClick = (id) => {
        setFlippedCardId(prevId => prevId === id ? null : id);
    };

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

    const redirectToEdit = (id) => {
        history.push(`/flashcards/${id}/edit`);
    }

    const handleDeleteClick = (flashcardId, e) => {
        e.stopPropagation();
        setModalContent(<DeleteFlashcardModal flashcardId={flashcardId} />)
    }



    return (
       <div className="myflashcards-container">
        <div className="myflashcards-heading">
            Hello! Here are your flashcards: 
        </div>
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
                          <div className='edit-icon' onClick={(e) => {
                            e.stopPropagation();
                            redirectToEdit(flashcard.id, e);
                        }}>🖉</div> 
                        <div className="delete-icon" onClick={(e) => handleDeleteClick(flashcard.id, e)}>
                        🗑️
                    </div>
                </div>
            </div>
            ))}
        </div>
        </div>
    );
};

export default MyFlashcards;