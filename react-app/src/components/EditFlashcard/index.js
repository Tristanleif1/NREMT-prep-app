import React, {useState} from "react";
import { useSelector, useDispatch } from "react-redux";
import { createFlashcard } from "../../store/flashcard";
import { useHistory, useParams } from "react-router-dom"
import { Redirect } from "react-router-dom"
import "../FlashcardForm/FlashcardForm.css"

const EditFlashcard = () => {
    const user = useSelector((state => state.session.user));
    const history = useHistory();
    const [errors, setErrors] = useState({});
    const [formData, setFormData] = useState({
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

        const response = await dispatch(createFlashcard(formData));
        if (response.id) {
            history.push(`/flashcards/${response.id}`);
        } else {
            setErrors(response.formErrors);
            }
        
    };
}