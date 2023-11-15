import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { createQuiz } from '../../store/quiz';

function QuizForm() {
    const history = useHistory();
    const dispatch = useDispatch();
    const user = useSelector(state => state.session.user);
    
    const [title, setTitle] = useState('');
    const [questions, setQuestions] = useState([
        { question: '', option1: '', option2: '', option3: '', option4: '', correct_answer: '' },
        { question: '', option1: '', option2: '', option3: '', option4: '', correct_answer: '' }
    ]);

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

        if(questions.length > 2){
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

        const quizData = { title, questions };
        const response = await dispatch(createQuiz(quizData));
        
        // Assume response includes quiz ID upon successful creation
        if (response.id) {
            history.push(`/quizzes/${response.id}`);
        } else {
            // Handle backend validation errors
            setErrors(response.formErrors);
        }
    };

    return (
        <div>
            <form className="quiz-form" onSubmit={handleSubmit}>
                <div>
                    <label>Title</label>
                    <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
                    {errors?.title && <div className="error-validation">{errors?.title}</div>}
                </div>

                {questions.map((q, index) => (
                    <div key={index} className="question-block">
                        <label>Question {index + 1}</label>
                        <input type="text" value={q.question} onChange={(e) => handleQuestionChange(index, 'question', e.target.value)} />
                        {errors?.[`question${index}`] && <div className="error-validation">{errors[`question${index}`]}</div>}
                        {/* Add inputs for options and correct answer */}
                     </div>
                ))}

                <button className="button add-question-btn" type="button" onClick={handleAddQuestion}>+</button>
                <button className="button" type="submit">Create Quiz</button>
            </form>
        </div>
    );
}

export default QuizForm;