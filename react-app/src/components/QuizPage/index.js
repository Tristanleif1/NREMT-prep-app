import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./QuizPage.css"
import { BsTextCenter } from 'react-icons/bs';
import rightAnswer from "../../assets/correct_answer.mp3";
import incorrectAnswer from "../../assets/incorrect_answer.mp3";


function QuizPage() {
    const { id } = useParams();
    const [quizQuestions, setQuizQuestions] = useState([]);
    const [isPlaying, setIsPlaying] = useState(false);
    const [title, setTitle] = useState("")
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [correctAnswers, setCorrectAnswers] = useState(0);
    const [score, setScore] = useState(0);
    const [numberOfQuestionsAnswered, setNumberOfQuestionsAnswered] =  useState(0);
    const [wrongAnswers, setWrongAnswers] = useState(0);
    const [time, setTime] = useState({
        minutes: 5,
        seconds: 0
    })

    const correctAnswerSound = new Audio(rightAnswer)
    const incorrectAnswerSound =  new Audio(incorrectAnswer)

    toast.configure()

    const history = useHistory()


    useEffect(() => {
        fetch(`/api/quizzes/${id}/questions`)
        .then(response => {
            if (!response.ok) {
                throw new Error("Failed to fetch questions.");
            }
            return response.json();
        })
        .then(data => setQuizQuestions(data.quizQuestions))
        .catch(error => console.error(error));}, [id]);

    useEffect(() => {
        fetch(`/api/quizzes/${id}`)
        .then(response => response.json())
        .then(data => setTitle(data.title))
    }, [id]);

    useEffect(() => {
        let interval;
        if(isPlaying){
            quizTimer()
        }
        return () => {
            if(interval)clearInterval(interval)
        }
    }, [isPlaying])

    const startQuiz = () => {
        setIsPlaying(true);
        quizTimer();
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


    const correctAnswer = () => {
        toast.success('Correct Answer!', {
            className: 'toast-valid',
            position: 'top-right',
            autoClose: 1500,
            closeOnClick: true

        })
        setScore(prevScore => prevScore + 1);
        setCorrectAnswers(prevCorrect => prevCorrect + 1);
        setCurrentQuestionIndex(prevIndex => prevIndex + 1);
        setNumberOfQuestionsAnswered(prevAnswered => prevAnswered + 1)
        correctAnswerSound.play()
    }

    const wrongAnswer = () => {
        toast.error('Incorrect Answer!', {
            className: 'toast-invalid',
            position: 'top-right',
            autoClose: 1500,
            closeOnClick: true

        })
        setWrongAnswers(prevCorrect => prevCorrect + 1);
        setCurrentQuestionIndex(prevIndex => prevIndex + 1);
        setNumberOfQuestionsAnswered(prevAnswered => prevAnswered + 1)
        incorrectAnswerSound.play()
    }

    const handleAnswerClick = (e) => {
        const selectedAnswer = e.target.innerHTML.toLowerCase();
        const correctAnswerValue = quizQuestions[currentQuestionIndex].correct_answer.toLowerCase();

        if(selectedAnswer === correctAnswerValue){
            correctAnswer()
        } else {
            wrongAnswer()
        }
    } 

    const handleQuitSelect = () => {
        history.push('/')
    }

    const quizTimer = () => {
        const countDownTime =  Date.now() + 300000;   // <-- 5 minutes in milliseconds
        const interval = setInterval(() => {
            const now = new Date();
            const distance = countDownTime - now;

            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);

            if(distance < 0){
                clearInterval(interval);
                setTime({
                    minutes: 0,
                    seconds: 0
                });

                endGame()
            } else {
                setTime({
                    minutes,
                    seconds
                })
            }
        }, 1000);
    }


    const endGame = () => {
        setIsPlaying(false);
        toast.warn("Time's up!", {
            positon: 'top-center',
            autoClose: 1800
        })
    }

    if (isPlaying) {
        const currentQuestion = quizQuestions[currentQuestionIndex]
        if(!currentQuestion){
            return <div>Loading...</div>
        }
        return (
            <div className="quiz">
                <div className='quiz-mode'>Quiz Mode</div>       
                    <div className="question">
                        <div className="timer" style={{ color: 'black', position: 'absolute', top: '10px', right: '10px' }}>
                        {time.minutes}:{time.seconds < 10 ? `0${time.seconds}` : time.seconds}
                        </div>
                        <div className='current-question'>
                            {currentQuestionIndex + 1} of {quizQuestions.length}
                        </div>
                        <h5>{currentQuestion.question}</h5>
                        <div className="option-container">
                            <button className="option" onClick={handleAnswerClick}>{currentQuestion.option1}</button>
                        </div>
                        <div className="option-container">
                            <button className="option" onClick={handleAnswerClick}>{currentQuestion.option2}</button>
                        </div>
                        <div className="option-container">
                            <button className="option" onClick={handleAnswerClick}>{currentQuestion.option3}</button>
                        </div>
                        <div className="option-container">
                            <button className="option" onClick={handleAnswerClick}>{currentQuestion.option4}</button>
                        </div>
                        <div className='navigation-buttons'>
                            <div className='prev-question-button'> {currentQuestionIndex > 0 && <button onClick={goToPrev}>Previous</button>} </div>
                            <div className='quit-quiz-button'>< button onClick={handleQuitSelect}>Quit</button></div>
                            <div className='next-question-button'>{currentQuestionIndex < quizQuestions.length - 1 && <button onClick={goToNext}>Next</button>}</div>
                        </div>
                    </div>
            </div>
        );
    }

    return (
        <div className="quiz">
            <ToastContainer />
            <div className='quiz-content'>
                 <h1>Quiz: {title}</h1>
                 <div className="buttonContainer">
                    <ul>
                        <li>
                    <button className="play-button" onClick={startQuiz}>Quiz Me!</button>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default QuizPage;