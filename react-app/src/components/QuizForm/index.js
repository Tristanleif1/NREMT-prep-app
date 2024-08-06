import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { createQuiz } from '../../store/quiz';
import { FiXSquare } from "react-icons/fi";
import './QuizForm.css'

function QuizForm() {
    const history = useHistory();
    const dispatch = useDispatch();
    const user = useSelector(state => state.session.user);
    
    const [title, setTitle] = useState('');
    const [questions, setQuestions] = useState([
        { question: '', option1: '', option2: '', option3: '', option4: '', correct_answer: '' },
        { question: '', option1: '', option2: '', option3: '', option4: '', correct_answer: '' }
    ]);

    const handleRemoveQuestion = (index) => {
        const newQuestions = questions.filter((_, i) => i !== index);
        setQuestions(newQuestions)
    }

    const [errors, setErrors] = useState({});

    if (!user) {
        history.push("/");
    }

    const handleQuestionChange = (index, field, value) => {
        const newQuestions = [...questions];
        newQuestions[index][field] = value;
        setQuestions(newQuestions);
    };

    const handleAddQuestion = () => {
        setQuestions([
            ...questions,
            { question: '', option1: '', option2: '', option3: '', option4: '', correct_answer: '' }
        ]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        let formErrors = {};
        if (!title) formErrors.title = "Title is required";

        if(questions.length < 2){
            formErrors.questions = "At least two questions are required"
        }
        questions.forEach((q, index) => {
            if (!q.question) formErrors[`question${index}`] = `Question ${index + 1} is required`;
            if (!q.correct_answer) formErrors[`correct_answer${index}`] = `Correct answer for question ${index + 1} is required`;
        });

        if (Object.keys(formErrors).length > 0) {
            setErrors(formErrors);
            return;
        }

        const quizForm = { title, questions };
        const newQuiz = await dispatch(createQuiz(quizForm));
        
        // Assume response includes quiz ID upon successful creation
        if (newQuiz.id) {
            history.push(`/quizzes/${newQuiz.id}`);
        } else {
            // Handle backend validation errors
            setErrors(newQuiz.formErrors);
        }
    };

    return (
        <div className="quiz-form-container">
            <form className="quiz-form" onSubmit={handleSubmit}>
                <div className='quiz-title-wrapper'>
                    <label className='quiz-title-label'>Quiz Title</label>
                    <input className='quiz-title-input' type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
                    {errors?.title && <div className="error-validation">{errors?.title}</div>}
                </div>

                {questions.map((q, index) => (
                    <div key={index} className="question-block">
                        {index >= 2 && (
                            <FiXSquare
                                className="delete-question-icon"
                                onClick={() => handleRemoveQuestion(index)}
                            />
                        )}
                        <label>Question {index + 1}</label>
                        <input 
                            className='quiz-question-input'
                            type="text" 
                            value={q.question} 
                            onChange={(e) => handleQuestionChange(index, 'question', e.target.value)}
                        />
                        {errors?.[`question${index}`] && <div className="error-validation">{errors[`question${index}`]}</div>}

                        {['option1', 'option2', 'option3', 'option4'].map(option => (
                            <div className='option-label-and-input-container' key={option}>
                                <label className='quiz-option-label'>{`Option ${option.charAt(option.length - 1)}`}</label>
                                <input 
                                    className='quiz-option-input'
                                    type="text" 
                                    value={q[option]} 
                                    onChange={(e) => handleQuestionChange(index, option, e.target.value)}
                                />
                                {errors?.[`${option}${index}`] && <div className="error-validation">{errors[`${option}${index}`]}</div>}
                            </div>
                        ))}

                        <div className='correct-label-and-answer-wrapper'>
                            <label className='correct-answer-label'>Correct Answer</label>
                            <input 
                                className='quiz-correct-answer-input'
                                type="text" 
                                value={q.correct_answer} 
                                onChange={(e) => handleQuestionChange(index, 'correct_answer', e.target.value)}
                            />
                            {errors?.[`correct_answer${index}`] && <div className="error-validation">{errors[`correct_answer${index}`]}</div>}
                        </div>
                    </div>
                ))}

                <button className="quiz-button-add-question-btn" type="button" onClick={handleAddQuestion}>+</button>
                <button className="quiz-create-button" type="submit" onClick={handleSubmit}>Create Quiz</button>
            </form>
        </div>
    );
}


export default QuizForm;