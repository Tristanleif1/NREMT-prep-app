import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from "react-router-dom"
import { loadFlashcardSets } from "../../store/flashcardSet";
import { useModal } from "../../context/Modal"

const MyFlashcardSets = () => {
    const history = useHistory()
    const dispatch = useDispatch()
    const user = useSelector((state) => state.session.user)

    const { setModalContent } = useModal()

    const flashcard_sets = useSelector(state => Object.values(state.flashcardSet).filter(set => set.userId === user.id))

    const redirectToSetDetails = (id) => {
        history.push()
    }
}