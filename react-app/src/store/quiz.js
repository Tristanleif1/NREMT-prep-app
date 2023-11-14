
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

const deleteQuiz = (quiz) => ({
    type: DELETE_QUIZ,
    quiz
})

const addQuestionToQuiz = (question, quizId) => ({
    type: ADD_QUESTION_TO_QUIZ,
    question,
    quizId
})