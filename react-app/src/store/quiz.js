
const SET_QUIZ = "quiz/SET_QUIZ"
const SET_QUIZZES = "quiz/SET_QUIZZES"
const ADD_QUIZ = "quiz/ADD_QUIZ"
const EDIT_QUIZ = "quiz/EDIT_QUIZ"
const DELETE_QUIZ = "quiz/DELETE_QUIZ"
const ADD_QUESTION_TO_QUIZ = "quiz/ADD_QUESTION_TO_QUIZ"

const setQuizzes = (quizzes) => ({
    type: SET_QUIZZES,
    quizzes
})

const setQuiz = (quiz) => ({
    type: SET_QUIZ,
    quiz
})

const addQuiz = (quiz) => ({
    type: ADD_QUIZ,
    quiz
})

const editQuiz = (quiz) => ({
    type: EDIT_QUIZ,
    quiz
})

const deleteQuiz = (id) => ({
    type: DELETE_QUIZ,
    id
})

const addQuestionToQuiz = (question, quizId) => ({
    type: ADD_QUESTION_TO_QUIZ,
    question,
    quizId
})


export const getQuizzes = () => async dispatch => {
    const response = await fetch('/api/quizzes/');
    if(response.ok){
        const quizzes = await response.json();
        dispatch(setQuizzes(quizzes));
    } else {
        console.log(response, "Failed");
        return response
    }
};

export const getMyQuizzes = () => async dispatch => {
    const response = await fetch('/api/quizzes/my-quizzes');
    if(response.ok){
        const data = await response.json();
        dispatch(setQuizzes(data.my_quizzes));
    } else {
        console.log(response, "Failed");
        return response
    }
}

export const getQuiz = (id) => async dispatch => {
    const response = await fetch(`/api/quizzes/${id}`);
    if(response.ok){
        const quiz = await response.json();
        dispatch(setQuiz(quiz));
    } else {
        console.log(response, "Failed");
        return response
    }
};

export const createQuiz = (quizForm) => async dispatch => {
    const response = await fetch('/api/quizzes/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify(quizForm)
    });
    if(response.ok){
        const quiz = await response.json();
        dispatch(addQuiz(quiz))
        return quiz
    } else {
        const errors = await response.json();
        console.log(errors, "Failed");
        return errors
    }
};

export const updateQuiz = (id, quizData) => async dispatch => {
    const response = await fetch(`/api/quizzes/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(quizData),
    });
    if(response.ok){
        const quiz = await response.json();
        dispatch(editQuiz(quiz))
    } else {
        console.log(response, "Failed");
        return response
    }
};

export const removeQuiz = (id) => async dispatch => {
    const response = await fetch(`/api/quizzes/${id}`, {
        method: 'DELETE'
    });
    if(response.ok){
        dispatch(deleteQuiz(id));
    } else {
        console.log(response, "Failed");
        return response
    }
}

const initialState = {
    quizzes: {},
    currentQuiz: null
};

export const quizReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_QUIZZES:
            const allQuizzes = {};
            action.quizzes?.forEach(quiz => {
                allQuizzes[quiz.id] = quiz;
            });
            return { ...state, quizzes: allQuizzes };
        case SET_QUIZ:
            return { ...state, currentQuiz: action.quiz };
        case ADD_QUIZ:
            return { ...state, quizzes: {...state.quizzes, [action.quiz.id]: action.quiz }};
        case EDIT_QUIZ:
            return { ...state, quizzes: {...state.quizzes, [action.quiz.id]: action.quiz }};
        case DELETE_QUIZ:
            const updatedQuizzes = { ...state.quizzes};
            delete updatedQuizzes[action.id];
            return {...state, quizzes: updatedQuizzes};
        default:
            return state;
    }
};



