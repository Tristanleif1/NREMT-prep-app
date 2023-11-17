import React, {useState, useEffect} from "react";
import {useSelector, useDispatch} from "react-redux";
import { getQuiz } from "../../store/quiz";
import { updateQuiz } from "../../store/quiz";
import { useHistory, useParams } from "react-router-dom";
import { FiXSquare } from "react-icons/fi";
import "../QuizForm/QuizForm.css"

const EditQuizForm = () => {
    const user = useSelector((state => state.session.user));
    if(!user){
        history.push("/");
    }
    const { id } = useParams();
    const dispatch = useDispatch();
    const history = useHistory();
    const [errors, setErrors] = useState({});
    const quiz = useSelector(state => state.quiz.currentQuiz)

    const [title, setTitle] = useState('');
    const [questions, setQuestions] = useState([
        { question: '', option1: '', option2: '', option3: '', option4: '', correct_answer: '' },
        { question: '', option1: '', option2: '', option3: '', option4: '', correct_answer: '' }
    ]);

    useEffect(() => {
        if(!user){
            history.push("/");
        } else {
            dispatch(getQuiz(id))
        }
    }, [id, dispatch]);

    useEffect(() => {
        if(quiz){
            setTitle(quiz.title);
            setQuestions(quiz.questions)
        }
    }, [quiz]);

    const handleQuestionChange = (index, field, value) => {
        const newQuestions = [...questions];
        newQuestions[index][field] = value;
        setQuestions(newQuestions);
    };

    const handleRemoveQuestion = (index) => {
        const newQuestions = questions.filter((_, i) => i !== index);
        setQuestions(newQuestions);
    };

    const handleAddQuestion = () => {
        setQuestions(prevQuestions => [
            ...prevQuestions,
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

        const updatedQuiz = { id, title, questions };
        const result = await dispatch(updateQuiz(id.toString(), { title, questions }));

        if (result.id) {
            history.push(`/quizzes/${result.id}`);
        } else {
            // Handle backend validation errors
            setErrors(result.formErrors);
        }
    };

    return (
        <div className="quiz-form-container">
            <form className="quiz-form" onSubmit={handleSubmit}>
                <div>
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
                            <div key={option}>
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

                        <div>
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
                <button className="quiz-create-button" type="submit" onClick={handleSubmit}>Update Quiz!</button>
            </form>
        </div>
    );


}

export default EditQuizForm