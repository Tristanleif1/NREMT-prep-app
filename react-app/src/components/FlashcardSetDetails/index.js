import React, { useEffect, useState} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory, useParams } from "react-router-dom"
import { getSingleFlashcardSet } from '../../store/flashcardSet'
import { BsCaretLeftFill, BsFillCaretRightFill} from "react-icons/bs";
import "./FlashcardSetDetails.css"

function FlashcardSetDetails() {
    const { id } = useParams();
    const history = useHistory();
    const dispatch = useDispatch();

    useEffect(() => {
        if (id) {
            dispatch(getSingleFlashcardSet(id));
        }
    }, [dispatch, id]);
    // const flashcardSets = useSelector((state) => Object.values(state.flashcardSet));
    // console.log(flashcardSets);

    const flashcardSet = useSelector(state => state.flashcardSet[id]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [flipped, setFlipped] = useState(false);

    const goToPrevious = () => {
        if (currentIndex > 0) {
            setFlipped(false);
            setCurrentIndex(currentIndex - 1);
        }
    };

    const goToNext = () => {
        if (currentIndex < flashcardSet.flashcards.length - 1) {
            setFlipped(false);
            setCurrentIndex(currentIndex + 1);
        }
    };

    if (!flashcardSet) return <div>Loading...</div>;

    const currentFlashcard = flashcardSet.flashcards[currentIndex];

    return (
        <div className="set-detail-page">
            <h1 className='set-detail-header'>Flashcard Set Review!</h1>
            <div className='set-flashcard-section'>
                <BsCaretLeftFill className='change-question-button left' onClick={goToPrevious} />
                <div className={`set-flashcard-detail ${flipped ? 'flipped' : ''}`} onClick={() => setFlipped(!flipped)}>
                    <div className="flip-container">
                        <div className="front">
                            <h2>{currentFlashcard.question}</h2>
                        </div>
                        <div className="back">
                            <h3>{currentFlashcard.answer}</h3>
                        </div>
                    </div>
                </div>
                <BsFillCaretRightFill className='change-question-button right' onClick={goToNext} />
            </div>
            <div className='card-info'>
                Card {currentIndex + 1} / {flashcardSet.flashcards.length}
            </div>
        </div>
    );
}

export default FlashcardSetDetails;