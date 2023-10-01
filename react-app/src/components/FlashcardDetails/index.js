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
    const [flipped, setFlipped] = useState(false);

    const currentIndex = flashcardIds.indexOf(Number(id));

    useEffect(() => {
        dispatch(getSingleFlashcard(id))
    }, [dispatch, id])

    const goToPrevious = () => {
        if (currentIndex > 0) {
            setFlipped(false)
            history.push(`/flashcards/${flashcardIds[currentIndex - 1]}`);
        }
    };

    const goToNext = () => {
        if (currentIndex < flashcardIds.length - 1) {
            setFlipped(false)
            history.push(`/flashcards/${flashcardIds[currentIndex + 1]}`);
        }
    };

    if (!flashcard) return <div>Loading...</div>;

    return (
        <div className="detail-flashcard-detail-page">
            <h1 className='detail-flashcard-detail-header'>Flashcard Review!</h1>
            <div className='detail-flashcard-section'>
                <BsCaretLeftFill className='detail-change-question-button left' onClick={goToPrevious} />
                <div className={`detail-flashcard-detail ${flipped ? 'flipped' : ''}`} onClick={() => setFlipped(!flipped)}>
                    <div className="detail-flip-container">
                        <div className="detail-front">
                            <h2>{flashcard?.question}</h2>
                        </div>
                        <div className="detail-back">
                            <h3>{flashcard?.answer}</h3>
                        </div>
                    </div>
                </div>
                <BsFillCaretRightFill className='detail-change-question-button right' onClick={goToNext} />
            </div>
        </div>
    );
}

export default FlashcardDetails;