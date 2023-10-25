import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import "./QuizPage.css"

function QuizPage() {
    const { id } = useParams();
    const [quizQuestions, setQuizQuestions] = useState([]);
    const [isPlaying, setIsPlaying] = useState(false);
    const [title, setTitle] = useState("")
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

    useEffect(() => {
        fetch(`/api/quizzes/${id}/questions`)
            .then(response => response.json())
            .then(data => setQuizQuestions(data.quizQuestions));
    }, [id]);

    useEffect(() => {
        fetch(`/api/quizzes/${id}`)
        .then(response => response.json())
        .then(data => setTitle(data.title))
    })

    const startQuiz = () => {
        setIsPlaying(true);
    }

    const goToNext = () => {
        if (currentQuestionIndex < quizQuestions.length - 1){
            setCurrentQuestionIndex(prevIndex => prevIndex + 1)
        }
    }

    const goToPrev = () => {
        if (currentQuestionIndex > 0){
            setCurrentQuestionIndex(prevIndex => prevIndex - 1)
        }
    }

    if (isPlaying) {
        const currentQuestion = quizQuestions[currentQuestionIndex]
        return (
            <div className="quiz">
                <div className="question">
                    <h5>{currentQuestion.question}</h5>
                    <div className="option-container">
                        <button className="option">{currentQuestion.option1}</button>
                    </div>
                    <div className="option-container">
                        <button className="option">{currentQuestion.option2}</button>
                    </div>
                    <div className="option-container">
                        <button className="option">{currentQuestion.option3}</button>
                    </div>
                    <div className="option-container">
                        <button className="option">{currentQuestion.option4}</button>
                    </div>
                    <div className='navigation-buttons'>
                       <div className='prev-quesiton-button'> {currentQuestionIndex > 0 && <button onClick={goToPrev}>Previous</button>} </div>
                        <div className='next-question-button'>{currentQuestionIndex < quizQuestions.length - 1 && <button onClick={goToNext}>Previous</button>}</div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="quiz">
            <h1>Quiz: {title}</h1>
            <div className="buttonContainer">
                <button onClick={startQuiz}>Play</button>
            </div>
        </div>
    );
}

export default QuizPage;