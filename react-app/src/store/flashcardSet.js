import { __esModule } from "react-router-dom/cjs/react-router-dom.min";
import { csrfFetch } from "./csrf";
const SET_FLASHCARD_SETS = "flashcardSet/SET_FLASHCARD_SETS"
const SET_SINGLE_FLASHCARD_SET = "flashcardSet/SET_FLASHCARD_SET"
const ADD_FLASHCARD_SET = "flashcardSet/ADD_FLASHCARD_SET"
const EDIT_FLASHCARD_SET = "flashcardSet/EDIT_FLASHCARD_SET"
const DELETE_FLASHCARD_SET = "flashcardSet/DELETE_FLASHCARD_SET"

const setFlashcardSets = (flashcardSets) => ({
    type: SET_FLASHCARD_SETS,
    flashcardSets
})

const addFlashcardSet = (flashcardSet) => ({
    type: ADD_FLASHCARD_SET,
    flashcardSet
})

const editFlashcardSet = (flashcardSet) => ({
    type: EDIT_FLASHCARD_SET,
    flashcardSet
})

const setSingleFlashcardSet = (flashcardSet) => ({
    type: SET_SINGLE_FLASHCARD_SET,
    flashcardSet
})

const deleteFlashcardSet = (flashcardSet) => ({
    type: DELETE_FLASHCARD_SET,
    flashcardSet
})


export const loadFlashcardSets = () => async (dispatch) => {
    const response = await fetch(`/api/flashcard-sets/`);
    if (response.ok){
        const data = await response.json();
        dispatch(setFlashcardSets(data.flashcard_sets))
    } else {
        console.error("Failed to load flashcard sets")
    }
}

export const createFlashcardSet = (flashcardSet) => async (dispatch) => {
    const response = await csrfFetch(`/api/flashcard-sets/`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(flashcardSet)
    })
    if (response.ok){
        const createdFlashcardSet = await response.json();
        dispatch(addFlashcardSet(createFlashcardSet));
        return createdFlashcardSet
    } else {
        console.log(response, "Failed");
        return response
    }
 }

 export const updateFlashcardSet = (flashcardSet) => async (dispatch) => {
    const response = await csrfFetch(`/api/flashcard-sets/${flashcardSet.id}`, {
        method: 'PUT',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(flashcardSet)
    });
    const data = await response.json();
    if(data.error){
        throw new Error(data.error)
    }
    dispatch(editFlashcardSet(data))
 }
    
