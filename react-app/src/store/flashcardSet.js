
import { csrfFetch } from "./csrf";
const SET_FLASHCARD_SETS = "flashcardSet/SET_FLASHCARD_SETS"
const SET_SINGLE_FLASHCARD_SET = "flashcardSet/SET_FLASHCARD_SET"
const ADD_FLASHCARD_SET = "flashcardSet/ADD_FLASHCARD_SET"
const EDIT_FLASHCARD_SET = "flashcardSet/EDIT_FLASHCARD_SET"
const DELETE_FLASHCARD_SET = "flashcardSet/DELETE_FLASHCARD_SET"
const ADD_FLASHCARD_TO_SET = "flashcardSet/ADD_FLASHCARD_TO_SET"

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

const addFlashcardToSet = (flashcard, setId) => ({
    type: ADD_FLASHCARD_TO_SET,
    flashcard,
    setId
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
        dispatch(addFlashcardSet(createdFlashcardSet));
        return createdFlashcardSet
    } else {
        console.log(response, "Failed");
        return response
    }
 }

 export const getSingleFlashcardSet = (flashcardSetId) => async (dispatch) => {
    try {
        const res = await fetch(`/api/flashcard-sets/${flashcardSetId}`);
        if(!res.ok){
            throw new Error("Internal server error")
        }

        const flashcardSet = await res.json();
        dispatch(setSingleFlashcardSet(flashcardSet))
    } catch (error){
        console.error("Unable to fetch the flashcard set", error)
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

 export const removeFlashcardSet = (flashcardSetId) => async (dispatch) => {
    const response = await csrfFetch(`/api/flashcard-sets/${flashcardSetId}`, {
        method: "DELETE",
    })

    if(response.ok){
        dispatch(deleteFlashcardSet(flashcardSetId));
    } else {
        console.error("Failed to delete flashcard set")
    }
 }

 export const createFlashcardInSet = (setId, flashcard) => async (dispatch) => {
    const response = await csrfFetch(`/api/flashcard-sets/${setId}/add-flashcard`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(flashcard)
    })
    if (response.ok){
        const newFlashcard = await response.json();
        dispatch(addFlashcardToSet(newFlashcard, setId))
        return newFlashcard;
    } else {
        console.error("Failed to add flashcard to set")
    }
 }



 export const flashcardSetsReducer = (state = {}, action) => {
    switch(action.type) {
      case SET_FLASHCARD_SETS:
        const allFlashcardSets = {};
        action.flashcardSets.forEach(set => {
          allFlashcardSets[set.id] = set;
        });
        return allFlashcardSets;
      case ADD_FLASHCARD_SET:
        return {
          ...state,
          [action.flashcardSet.id]: action.flashcardSet,
        };
      case EDIT_FLASHCARD_SET:
        return {
          ...state,
          [action.flashcardSet.id]: action.flashcardSet,
        };
      case SET_SINGLE_FLASHCARD_SET:
        return {
            ...state,
            [action.flashcardSet.id]: action.flashcardSet,
        };
      case ADD_FLASHCARD_TO_SET:
        return {
            ...state,
            [action.setId]: {
                ...state[action.setId],
                flashcards: [...state[action.setId].flashcards, action.flashcard]
            }
        }
      case DELETE_FLASHCARD_SET:
        const newState = { ...state };
        delete newState[action.flashcardSetId];
        return newState;
      default:
        return state;
    }
  };
 
