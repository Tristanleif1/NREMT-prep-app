import React, {useState, useEffect} from "react";
import { useSelector, useDispatch } from "react-redux";
import { createFlashcard } from "../../store/flashcard";
import { useHistory, useParams } from "react-router-dom"
import { Redirect } from "react-router-dom"
import "../FlashcardSetForm/FlashcardSetForm.css";
import { updateFlashcardSet } from "../../store/flashcardSet";
import { getSingleFlashcardSet } from "../../store/flashcardSet";


const EditFlashcardSet = () => {
    const user = useSelector((state => state.session.user));
    if (!user) {
        history.push("/");
      }
    const { id } = useParams();
    const flashcard =  useSelector((state) => state.flashcard[id])
    const flashcardSet = useSelector(state => state.flashcardSet[id]);
    const history = useHistory();
    const [errors, setErrors] = useState({});
    const [formData,  setFormData] = useState({
        title: '',
        flashcards: Array.from({ length: 2 }, () => ({ question: '', answer: ''}) )
        })

    const dispatch = useDispatch()

    const handleTitleChange = (e) => setFormData({...formData, title: e.target.value })

    const handleFlashcardAddition = (e, idx, field) => {
        const addedFlashcards = formData.flashcards.map((card, index) => 
            index === idx ? {...card, [field]: e.target.value } : card);
        setFormData({...formData, flashcards: addedFlashcards});
        };

    const handleAddCard = (e) => {
        e.preventDefault();
        setFormData({
            ...formData,
            flashcards: [...formData.flashcards, { question: '', answer: ''}]
        })
    }

    const topics = [
        {id: 1, name: "Airway, Respiration & Ventilation"},
        {id: 2, name: "Cardiology & Resuscitation"},
        {id: 3, name: "EMS Operations"},
        {id: 4, name: "Medical: Obstetrics & Gynecology"},
        {id: 5, name: "Trauma"}
    ]

    useEffect(() => {
        if (!flashcardSet) {
            dispatch(getSingleFlashcardSet(id));
        } else {
            setFormData({
                title: flashcardSet.title,
                flashcards: flashcardSet.flashcards
            });
        }
    }, [flashcardSet, dispatch, id]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        let formErrors = {};
    
        if (!formData.title.trim()) {
            formErrors.title = "Title is required";
        }
    
        const filledFlashcards = formData.flashcards.filter(card => 
            card.question.trim() && card.answer.trim()
        );
    
        if (filledFlashcards.length < 2) {
            formErrors.flashcards = "A minimum of 2 filled out flashcards is needed to create a set";
        }
    
        setErrors(formErrors);
    
        if (Object.keys(formErrors).length > 0) {
            return;
        }

        const updatedFlashcards = formData.flashcards.filter(card => card.question.trim() 
        || card.answer.trim());

        await dispatch(updateFlashcardSet({ ...formData, flashcards: updatedFlashcards, id: parseInt(id) }));
        history.push(`/flashcard-sets/${id}`);
    };
    return (
        <div className='flashcard-set-form-container'> {/* Use the same container class for styling */}
            <form className="flashcard-set-form" onSubmit={handleSubmit}>
                <label className='label-class'>
                    Title:
                    <input type="text" className='title-field' value={formData.title} onChange={handleTitleChange}/>
                    {errors?.title && <div className='set-error-validation'>{errors?.title}</div> }
                </label>

                {formData.flashcards.map((flashcard, idx) => (
                    <div className="question-answer-label" key={idx}> {/* Use the same class for styling */}
                        {['question', 'answer'].map(field => (
                            <label key={field}>
                                {`${field.charAt(0).toUpperCase() + field.slice(1)} ${idx + 1}:`}
                                <input 
                                    type="text"
                                    className='title-field' // Use the same input class for styling
                                    value={flashcard[field]} 
                                    onChange={(e) => handleFlashcardAddition(e, idx, field)}
                                />
                            </label>
                        ))}
                    </div>
                ))}
                {errors?.flashcards && <div className='set-error-validation'>{errors?.flashcards}</div>}

                {formData.flashcards.length < 20 && (
                    <button className='create-flashcard-set-button' type='button' onClick={handleAddCard}>Add Card</button>
                )}
                
                <button className='create-flashcard-set-button' type="submit">Update Flashcard Set!</button>
            </form>
        </div>
    );
};



export default EditFlashcardSet