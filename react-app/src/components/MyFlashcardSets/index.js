import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from "react-router-dom"
import { loadFlashcardSets } from "../../store/flashcardSet";
import { useModal } from "../../context/Modal"
import DeleteFlashcardSetModal from "../DeleteSetModal";
import { removeFlashcardSet } from "../../store/flashcardSet";
import "./MyFlashcardSets.css"

const MyFlashcardSets = () => {
    const history = useHistory()
    const dispatch = useDispatch()
    const user = useSelector((state) => state.session.user)
    if (!user) {
        history.push("/");
      }

    const { setModalContent } = useModal()

    useEffect(() => {
        dispatch(loadFlashcardSets())
    }, [dispatch, removeFlashcardSet()])

    const flashcard_sets = useSelector(state => Object.values(state.flashcardSet).filter(set => set.userId === user.id))

    const redirectToFlashcardSetDetails = (id) => {
        history.push(`/flashcard-sets/${id}`)
    }

    const redirectToEdit = (id) => {
        history.push(`/flashcard-sets/${id}/edit`)
    }

    const handleDelete = (flashcardSetId, e) => {
        e.stopPropagation();
        setModalContent(<DeleteFlashcardSetModal flashcardSetId={flashcardSetId} />)
    }

    return (
        <div className='flashcard-sets-section'>
            <h2>My Flashcard Sets:</h2>
            <div className='flashcard-sets-grid'>
                {flashcard_sets.map(set => (
                    <div key={set.id} className='flashcard-set' onClick={(e) => {
                        e.stopPropagation();
                         redirectToFlashcardSetDetails(set.id);}}>
                        <h3>{set.title}</h3>
                        <p>{set.flashcards?.length} questions</p>
                        <p className='username'>{set?.user?.username}</p>
                        <div className="trash-icon" onClick={(e) => handleDelete(set.id, e)}>
                        🗑️
                    </div>
                    <div className='set-edit-icon' onClick={(e) => {
                            e.stopPropagation();
                            redirectToEdit(set.id, e);
                        }}>🖉</div> 
                </div>
                ))}
            </div>
        </div>
    )
}

export default MyFlashcardSets