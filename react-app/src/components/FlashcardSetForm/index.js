import React, { useState } from 'react';
import { useDispatch } from "react-redux";
import {useHistory, useParams} from "react-router-dom";
import {createFlashcardSet, createFlashcardInSet } from "../../store/flashcardSet"
import "./FlashcardSetForm.css"

const FlashcardSetForm = () => {
    const dispatch = useDispatch();
    const history = useHistory();

    const defaultFormData = {
        title: '',
        flashcards: Array.from({ length: 2 }, () => ({ question: '', answer: ''}) )
    };
    const [errors, setErrors ] = useState({});
    const [formData, setFormData] = useState(defaultFormData)

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

    const handleSubmit = async (e) => {
        e.preventDefault();
        const {title, flashcards} = formData;
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
        try {
            const newSet = await dispatch(createFlashcardSet({ title }));
            console.log("New Set: ", newSet);  // Added this line for debugging
    
            if (newSet && newSet.id) {
                const flashcardsPromises = flashcards.map((flashcard) => {
                    const { question, answer } = flashcard;
                    if (question && answer) {
                        return dispatch(createFlashcardInSet(newSet.id, { question, answer }));
                    }
                    return Promise.resolve();
                });
    
               const addedFlashcards = await Promise.all(flashcardsPromises); 
               console.log('Added Flashcards:', addedFlashcards)
    
                history.push(`/flashcard-sets/${newSet.id}`);
            } else {
                console.error("New set was not successfully created");
            }
        } catch (error) {
            console.error("An error occurred while creating the flashcard set", error);
        }
    };

    return (
        <div className='flashcard-set-form-container'>
            <form className="flashcard-set-form" onSubmit={handleSubmit}>
                <label className='label-class'>
                    Title:
                    <input type="text" className='title-field' value={formData.title} onChange={handleTitleChange}/>
                    {errors?.title && <div className='set-error-validation'>{errors?.title}</div> }
                </label>

                {formData.flashcards.map((flashcard, idx) => (
                    <div className= "question-answer-label" key={idx}>
                        {['question', 'answer'].map(field => (
                            <label key={field}>
                                {`${field.charAt(0).toUpperCase() + field.slice(1)} ${idx + 1}:`}
                                <input 
                                    type="text" 
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
            
                <button className='create-flashcard-set-button' type="submit">Create Flashcard Set!</button>
            </form>
        </div>
        );
    }

export default FlashcardSetForm
