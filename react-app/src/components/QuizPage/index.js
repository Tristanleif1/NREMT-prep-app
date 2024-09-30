import React, { useState, useEffect, useRef } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./QuizPage.css"
import { BsTextCenter } from 'react-icons/bs';
import rightAnswer from "../../assets/correct_answer.mp3";
import incorrectAnswer from "../../assets/incorrect_answer.mp3";
import QuizResults from '../QuizResults';


function QuizPage() {
    const { id } = useParams();
    const timeRef = useRef(null);
    const [rearrangedQuestions, setRearrangedQuestions] = useState([]);
    const [isPlaying, setIsPlaying] = useState(false);
    const [title, setTitle] = useState("")
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [correctAnswers, setCorrectAnswers] = useState(0);
    const [score, setScore] = useState(0);
    const [numberOfQuestionsAnswered, setNumberOfQuestionsAnswered] =  useState(0);
    const [wrongAnswers, setWrongAnswers] = useState(0);
    const [isTimeOut, setIsTimeOut] = useState(false);
    const [isQuizLoaded, setIsQuizLoaded] = useState(false);
    const [time, setTime] = useState({
        minutes: 5,
        seconds: 0
    })

    useEffect(() => {
        fetch(`/api/quizzes/${id}/questions`)
        .then(response => {
            if (!response.ok) {  
                throw new Error("Failed to fetch questions.");
            }
            return response.json();
        })
        .then(data => {
             const rearrangedQuestions = shuffleQuestions(data.quizQuestions);
             setRearrangedQuestions(rearrangedQuestions);
             setIsQuizLoaded(true)
        })
        .catch(error => console.error(error));}, [id]);

    const correctAnswerSound = new Audio(rightAnswer)
    const incorrectAnswerSound =  new Audio(incorrectAnswer)

    const resetQuizQuestions = () => {

        if (timeRef.current) {
            clearInterval(timeRef.current);
            timeRef.current = null; 
        }

        setCurrentQuestionIndex(0);
        setCorrectAnswers(0);
        setScore(0);
        setNumberOfQuestionsAnswered(0);
        setWrongAnswers(0);
        setTime({
            minutes: 5,
            seconds: 0
        });
    };

    const shuffleQuestions = (arr) => {
        let currentInd = arr.length, randomIndex;
        while( currentInd !== 0){
            randomIndex = Math.floor(Math.random() * currentInd);
            currentInd --;

            [arr[currentInd], arr[randomIndex]] = [
                arr[randomIndex], arr[currentInd]
            ];
        }
        return arr
    }

    const checkEndGame = () => {
        if(numberOfQuestionsAnswered === rearrangedQuestions.length){
            setIsPlaying(false);
            if(timeRef.current) clearInterval(timeRef.current)
        }
    }

    toast.configure()

    const history = useHistory();




    useEffect(() => {
        fetch(`/api/quizzes/${id}`)
        .then(response => response.json())
        .then(data => setTitle(data.title))
    }, [id]);

    useEffect(() => {
        let interval;
        if (isPlaying) {
            if (timeRef.current) clearInterval(timeRef.current);
            quizTimer();
        } else {
            if (timeRef.current) clearInterval(timeRef.current);
        }
        return () => {
            if (timeRef.current) clearInterval(timeRef.current);
        };
    }, [isPlaying]);

    const numberOfQuestions = rearrangedQuestions.length

    const startQuiz = () => {
        setIsPlaying(true);
        quizTimer();
    }

    const goToNext = () => {
        if (currentQuestionIndex < rearrangedQuestions.length - 1){
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
        setNumberOfQuestionsAnswered(prevAnswered => prevAnswered + 1);
        correctAnswerSound.play();
        checkEndGame()
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
        setNumberOfQuestionsAnswered(prevAnswered => prevAnswered + 1);
        incorrectAnswerSound.play();
        checkEndGame()
    }

    const handleAnswerClick = (e) => {
        const selectedAnswer = e.target.innerHTML.toLowerCase();
        const correctAnswerValue = rearrangedQuestions[currentQuestionIndex].correct_answer.toLowerCase();

        if(selectedAnswer === correctAnswerValue){
            correctAnswer()
        } else {
            wrongAnswer()
            
        }
    } 

    const handleQuitSelect = () => {
        setIsPlaying(false);
        if(timeRef.current) clearInterval(timeRef.current)
        history.push('/home')
    }

    const quizTimer = () => {
        const countDownTime =  Date.now() + 300000;   // <-- 5 minutes in milliseconds
        timeRef.current = setInterval(() => {
            const now = new Date();
            const distance = countDownTime - now;

            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);

            if(distance < 0){
                clearInterval(timeRef.current);
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
        setIsTimeOut(true);
        if(timeRef.current) clearInterval(timeRef.current)
        toast.warn("Time's up!", {
            positon: 'top-center',
            autoClose: 1800
        })
    }

    if((numberOfQuestionsAnswered === rearrangedQuestions.length || isTimeOut) && isQuizLoaded){
        return <QuizResults
                id={id}
                score={score}
                numberOfQuestions={numberOfQuestions}
                numberOfQuestionsAnswered={numberOfQuestionsAnswered}
                correctAnswers={correctAnswers}
                wrongAnswers={wrongAnswers}
                resetQuiz={resetQuizQuestions}
                setIsPlaying={setIsPlaying}
                />
    }

    if (isPlaying) {
        const currentQuestion = rearrangedQuestions[currentQuestionIndex]
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
                            {currentQuestionIndex + 1} of {rearrangedQuestions.length}
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
                            <div className='prev-question-button'> {currentQuestionIndex > 0 && <button className="quiz-buttons"onClick={goToPrev}>Previous</button>} </div>
                            <div className='quit-quiz-button'>< button  className="quiz-buttons"onClick={handleQuitSelect}>Quit</button></div>
                            <div className='next-question-button'>{currentQuestionIndex < rearrangedQuestions.length - 1 && <button className="quiz-buttons"onClick={goToNext}>Next</button>}</div>
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