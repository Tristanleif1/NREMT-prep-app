import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { createQuiz } from '../../store/quiz';

function QuizForm(){
    const history = useHistory();
    const user = useSelector((state => state.session.user));
    if(!user){
        history.push("/")
    }
    const quizState = useSelector(state => state.quiz);
    console.log(quizState);

};

export default QuizForm;