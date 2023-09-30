import React, { useState } from 'react';
import { useDispatch } from "react-redux";
import {createFlashcardSet, createFlashcardInSet } from "../../store/flashcardSet"
import "./FlashcardSetForm.css"

const FlashcardSetForm = () => {
    const dispatch = useDispatch();

    const defaultFormData = {
        title: '',
        flashcards: Array.from({ length: 3 }, () => ({ question: '', answer: ''}) )
    };

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
        const { title, flashcards } = formData;
        const newSet = await dispatch(createFlashcardSet({ title }));

        if(newSet){
            flashcards.forEach(card => {
                if(card.question && card.answer){
                    dispatch(createFlashcardInSet(newSet.id, card));
                }
            });
        } else {
            console.error("New set was not successfully created")
        }
            
        };


    return (
        <form onSubmit={handleSubmit}>
            <label>
                Title:
                <input type="text" value={formData.title} onChange={handleTitleChange} required />
            </label>

            {formData.flashcards.map((flashcard, idx) => (
                <div key={idx}>
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

            {formData.flashcards.length < 20 && (
                <button type='submit' onClick={handleAddCard}>Add Card</button>
            )}
            
            <button type="submit">Create Flashcard Set!</button>
        </form>
    );
}

export default FlashcardSetForm
