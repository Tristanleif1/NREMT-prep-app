import React, {useState, useEffect} from "react";
import { useSelector, useDispatch } from "react-redux";
import { createFlashcard } from "../../store/flashcard";
import { useHistory, useParams } from "react-router-dom"
import { Redirect } from "react-router-dom"
import { updateFlashcard } from "../../store/flashcard";
import { getSingleFlashcard } from "../../store/flashcard";
import "../FlashcardForm/FlashcardForm.css"

const EditFlashcard = () => {
    const user = useSelector((state => state.session.user));
    const { id } = useParams();
    const flashcard =  useSelector((state) => state.flashcard[id])
    const history = useHistory();
    const [errors, setErrors] = useState({});
    const [formData,  setFormData] = useState({
        topicId: "",
        question: "",
        answer: "",
        })

    const dispatch = useDispatch()

    const topics = [
        {id: 1, name: "Airway, Respiration & Ventilation"},
        {id: 2, name: "Cardiology & Resuscitation"},
        {id: 3, name: "EMS Operations"},
        {id: 4, name: "Medical: Obstetrics & Gynecology"},
        {id: 5, name: "Trauma"}
    ]

    useEffect(() => {
        if (!flashcard) {
            dispatch(getSingleFlashcard(id));
        } else {
            setFormData({
                topicId: flashcard.topicId.toString(),
                question: flashcard.question,
                answer: flashcard.answer,
            });
        }
    }, [flashcard, dispatch, id]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        let formErrors = {};
        if (!formData.topicId) formErrors.topicId = "Topic is required";
        if (!formData.question) formErrors.question = "Question is required";
        if (!formData.answer) formErrors.answer = "Answer is required";

        if (Object.keys(formErrors).length > 0) {
            setErrors(formErrors);
            return;
        }

        await dispatch(updateFlashcard({ ...formData, id: parseInt(id) }));
        history.push(`/flashcards/${id}`);
    };

     return (
        <div>
            <form onSubmit={handleSubmit}>
                 <div>
                    <label>Topic</label>
                    <select 
                        value={formData.topicId}
                        onChange={(e) => setFormData({ ...formData, topicId: e.target.value })}
                     >
                        <option value="" disabled>Select a topic</option>
                        {topics.map(topic => (
                            <option key={topic.id} value={topic.id}>{topic.name}</option>
                        ))}
                    </select>
                    {errors?.topicId && <div className="error-validation">{errors?.topicId}</div>}
                </div>
                           
                <div>
                    <label>Question</label>
                    <input 
                        type="text" 
                        value={formData.question}
                        onChange={(e) => setFormData({ ...formData, question: e.target.value })}
                    />
                    {errors?.question && <div className="error-validation">{errors?.question}</div>}
                </div>
               
                <div>
                    <label>Answer</label>
                    <input 
                        type="text" 
                        value={formData.answer}
                        onChange={(e) => setFormData({ ...formData, answer: e.target.value })}
                    />
                    {errors?.answer && <div className="error-validation">{errors?.answer}</div>}
                </div>
               
                <button type="submit">Update!</button>
            </form>
        </div>
    );
};

export default EditFlashcard