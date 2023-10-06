
const SET_FLASHCARDS = "flashcard/SET_FLASHCARDS"
const SET_SINGLE_FLASHCARD ="flashcard/SET_SINGLE_FLASHCARD"
const ADD_FLASHCARD = "flashcard/ADD_FLASHCARD"
const EDIT_FLASHCARD = "flashcard/EDIT_FLASHCARD"
const DELETE_FLASHCARD = "flashcard/DELETE_FLASHCARD"

const setFlashcards = (flashcards) => ({
    type: SET_FLASHCARDS,
    flashcards
})

const addFlashcard = (flashcard) => ({
    type: ADD_FLASHCARD,
    flashcard
})

const editFlashcard = (flashcard) => ({
    type: EDIT_FLASHCARD,
    flashcard
})

const deleteFlashcard = (flashcardId) => ({
    type: DELETE_FLASHCARD,
    flashcardId
})

const setFlashcard = (flashcard) => ({
    type: SET_SINGLE_FLASHCARD,
    flashcard
})


export const loadFlashcards = () => async (dispatch) => {
    const response = await fetch('/api/flashcards/')
    if(response.ok){
        const data = await response.json();
        dispatch(setFlashcards(data.flashcards))
    } else {
        console.error("Failed to load flashcards")
    }
}

export const createFlashcard = (flashcard) => async (dispatch) => {
    const response = await fetch('/api/flashcards/', {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(flashcard)
    })
    if (response.ok){
        const createdFlashcard = await response.json();
        dispatch(addFlashcard(createdFlashcard))
        return createdFlashcard;
    } else {
        console.log(response, "Failed");
        return response
    }
}


export const updateFlashcard = (flashcard) => async (dispatch) => {
    const response = await fetch(`/api/flashcards/${flashcard.id}`, {
        method: 'PUT',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(flashcard)
    });
    const data = await response.json();
    if(data.error){
        throw new Error(data.error)
    }
    dispatch(editFlashcard(data))
}


export const removeFlashcard = (flashcardId) => async (dispatch) => {
    const response = await fetch(`/api/flashcards/${flashcardId}`, {
        method: "DELETE"
    })
    if(response.ok){
        dispatch(deleteFlashcard(flashcardId))
    } else {
        const error = await response.json();
        console.error(error.message)
    }
};

export const getSingleFlashcard = (flashcardId) => async (dispatch) => {
    try {
        const res = await fetch(`/api/flashcards/${flashcardId}`);
        if(!res.ok){
            throw new Error("Internal server error")
        }

        const flashcard = await res.json();
        dispatch(setFlashcard(flashcard))
    } catch (error){
        console.error("Unable to fetch the flashcard", error)
    }
}

export const flashcardsReducer = (state = {}, action) => {
    switch(action.type){
        case SET_FLASHCARDS:
            const newState = {};
            action.flashcards.forEach(flashcard => {
                newState[flashcard.id] = flashcard
            })
            return newState;
        case ADD_FLASHCARD:
            return {
                ...state,
                [action.flashcard.id]: action.flashcard
            }
        case EDIT_FLASHCARD:
            return {
                ...state,
                [action.flashcard.id]: action.flashcard
            }
        case SET_SINGLE_FLASHCARD:
            return {
                ...state,
                [action.flashcard.id]: action.flashcard
            }
        case DELETE_FLASHCARD:
            const copyState = { ...state };
            delete copyState[action.flashcardId];
            return copyState;
        default:
            return state;
    }
}