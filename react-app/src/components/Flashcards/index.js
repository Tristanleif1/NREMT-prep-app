import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { useHistory, useParams } from "react-router-dom"
import { loadFlashcards } from '../../store/flashcard';
import { loadFlashcardSets } from '../../store/flashcardSet';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import './Flashcards.css';
import '../MyFlashcardSets/MyFlashcardSets.css';
import Footer from '../Footer';

const Flashcards = ({ searchBar }) => {
    const history = useHistory()
    const dispatch = useDispatch()

    const [quizzes, setQuizzes] = useState([]);
    useEffect(() => {
        fetch('/api/quizzes/')
            .then(response => response.json())
            .then(data => setQuizzes(data.quizzes))
    }, [])
    const [selectedOption, setSelectedOption ] = useState('flashcards')

    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [flashcards, setFlashcards] = useState([])


    const handleOptionSwitch = (e) => {
        setSelectedOption(e.target.value)
    }

    const randomizeFlashcards = () => {
        const arrOfFlashcards = [...flashcards]
        for(let i = arrOfFlashcards.length - 1; i > 0; i--){
            let j = Math.floor(Math.random() * (i + 1));
            [arrOfFlashcards[i], arrOfFlashcards[j]] = [arrOfFlashcards[j], arrOfFlashcards[i]]

        }
        setFlashcards(arrOfFlashcards)
    }

    const renderFlashcardColor = (topicId) => {
        if (topicId) {
            const colors = {
                1: '#ADD8E6', // Light Blue
                2: '#90EE90', // Light Green
                3: '#FFFFE0', // Light Yellow
                4: '#FFB6C1', // Light Pink
                5: '#D8BFD8', // Light Purple
            };
            return colors[topicId];
        } else {
            return '#FFFFFF'; // White
        }
    };

    useEffect(() => {
        const fetchFlashcards = async () => {
            const response = await dispatch(loadFlashcards(currentPage));
            if (response) {
                setFlashcards(response.flashcards);
                setTotalPages(Math.ceil(response.total / 24));
            }

        };
    
        fetchFlashcards();
        dispatch(loadFlashcardSets());
    }, [currentPage, dispatch]);


    // const flashcards = useSelector(state => Object.values(state.flashcard))
    // randomizeFlashcards(flashcards)
    // console.log(flashcards);
    const flashcardSets = useSelector(state => Object.values(state.flashcardSet))

    const filteredFlashcards = searchBar ? flashcards.filter(flashcard =>
        flashcard.question.toLowerCase().includes(searchBar.toLowerCase()) ||
        flashcard.answer.toLowerCase().includes(searchBar.toLowerCase()) 
    ) : flashcards;

    const filteredFlashcardSets = searchBar ? flashcardSets.filter(set =>
        set.flashcards.some(flashcard =>
            flashcard.question.toLowerCase().includes(searchBar.toLowerCase()) ||
            flashcard.answer.toLowerCase().includes(searchBar.toLowerCase())
        )
    ) : flashcardSets;

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

    const redirectToQuiz = (id) => {
        history.push(`/quizzes/${id}`)
    }

    // Pagination navigation handlers
    const goToPreviousPage = () => setCurrentPage(currentPage => Math.max(1, currentPage - 1))
    const goToNextPage = () => setCurrentPage(currentPage => Math.min(totalPages, currentPage + 1))

    const isFlashcardsOrAllSelected = selectedOption === 'flashcards' || selectedOption === 'all';

    return (
       <>
       <div className='flashcard-container'>
        <div className='pagingation-and-filter-options-container'>
            <div className='spacer'></div>
            <div className='filter-option-container'>
            <label htmlFor="viewOptions" className='options-view-label'>What do you want to study?</label>
            <select id="viewOptions" value={selectedOption} onChange={handleOptionSwitch} className='option-select'>
                <option value="flashcards">Flashcards</option>
                <option value="flashcardSets">Flashcard Sets</option>
                <option value="quizzes">Quizzes</option>
                <option value="all">All</option>
            </select>
            </div>
            <div className='pagination-controls'> 
                {isFlashcardsOrAllSelected && (
                    <>
                        <button className='shuffle-button' onClick={randomizeFlashcards}>Shuffle</button>
                        <div className='page-navigator-container'>
                            <button className='pagination-button' onClick={goToPreviousPage} disabled={currentPage === 1}> <FontAwesomeIcon icon={faArrowLeft}/></button>
                            <span>Page {currentPage} of {totalPages}</span>
                            <button className='pagination-button' onClick={goToNextPage} disabled={currentPage === totalPages}><FontAwesomeIcon icon={faArrowRight}/></button>
                        </div>
                    </>
                )}
            </div>
        </div>
        {(selectedOption === 'flashcards' || selectedOption === "all") && (
        <div className="flashcard-grid">
            {filteredFlashcards.map(flashcard => (
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

        {(selectedOption === "flashcardSets" || selectedOption ==="all") && (
        <div className='flashcard-sets-section'>
            <h2>Flashcard Sets</h2>
            <div className='flashcard-sets-grid'>
                {filteredFlashcardSets.map(set => (
                    <div key={set.id} className='flashcard-set' onClick={(e) => {e.stopPropagation(); redirectToFlashcardSetDetails(set.id)}}>
                        <h3>{set.title}</h3>
                        <p>{set.flashcards?.length} questions</p>
                        <p className='username'>{set?.user?.username}</p>
                        </div>
                ))}
            </div>
            </div>
            )}
            {(selectedOption === "quizzes" || selectedOption ==="all") && (
            <div className='quizzes-section'>
                <h2>Quizzes</h2>
                <div className='quiz-sets-grid'>
                    {quizzes.map(quiz => (
                        <div key={quiz.id} className='individual-quiz' onClick={(e) => {e.stopPropagation(); redirectToQuiz(quiz.id)}}>
                            <h3>{quiz.title}</h3>
                            </div>
                    ))}
                </div>
                </div>
            )} 
        </div>
        <Footer />
       </>
    );
};

export default Flashcards;