import React from 'react';
import { useHistory } from 'react-router-dom';
import "./QuizResults.css"

function QuizResults(props){
    const history = useHistory();
    const { score, numberOfQuestions, numberOfQuestionsAnswered, correctAnswers, wrongAnswers, id, resetQuiz} = props;

    const retry = () => {
        resetQuiz();
        history.push(`/quizzes/${id}`)
    }

    const home = () => {
        history.push('/')
    }

    const scorePercentage = ((score / numberOfQuestions) * 100).toFixed(0);

    let comment;
    if(score <= 5){
        comment = "You need more practice";
    } else if(score > 5 && score <= 6){
        comment = "Better luck next try";
    } else if (score > 6 && score <= 8){
        comment = "Good try, there is room for improvement"
    } else if (score > 8 && score <= 9){
        comment = "Great Job!"
    } else {
        comment = "Flawless!!!"
    }

    return (
        <div className='results'>
            <h1>Congratulations you made it!</h1>
            
            <div className='quiz-results'>
                <h3>{comment}</h3>
                <div className='quiz-stats-section'>
                    <div className="stat">
                        <span className="left">Your Score:</span> 
                        <span className="right">{scorePercentage}%</span>
                    </div>
                    <div className="stat">
                        <span className="left">Total Number of Questions:</span> 
                        <span className="right">{numberOfQuestions}</span>
                    </div>
                    <div className="stat">
                        <span className="left">Number of attempted questions:</span> 
                        <span className="right">{numberOfQuestionsAnswered}</span>
                    </div>
                    <div className="stat">
                        <span className="left">Number of Correct Answers:</span> 
                        <span className="right">{correctAnswers}</span>
                    </div>
                    <div className="stat">
                        <span className="left">Number of Wrong Answers:</span> 
                        <span className="right">{wrongAnswers}</span>
                    </div>
                </div>
            </div>

            <section className="button-section">
                <button className="play-again-button" onClick={retry}>Play Again!</button>
                <button className='home-button' onClick={home}>Home</button>
            </section>
        </div>
    )
}

export default QuizResults;