import React, { useState, useRef, useEffect } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';
import logo from "../../assets/rescue-ready-logo.png"
import { AiOutlineSearch } from "react-icons/ai";
import LoginFormModal from "../LoginFormModal";
import OpenModalButton from "../OpenModalButton";


function Navigation({ isLoaded, setSearchBar, searchBar }) {
    const sessionUser = useSelector(state => state.session.user);
    const history = useHistory();

    const [showMenu, setShowMenu] = useState(false);
    const ulRef = useRef();

    const handleQuizRedirect = () => {
        history.push('/new-quiz')
    }

    useEffect(() => {
        if (!showMenu) return;

        const closeMenu = (e) => {
            if (!ulRef.current.contains(e.target)) {
                setShowMenu(false);
            }
        };

        document.addEventListener("click", closeMenu);

        return () => document.removeEventListener("click", closeMenu);
    }, [showMenu]);

    const closeMenu = () => setShowMenu(false);

    return (
        <>
            <div className='nav-bar-container'>
                <div className="nav-bar">
                    <div className='emt-logo-container'>
                        <div className="emt-logo">
                            <NavLink className="emt-logo" exact to="/">
                                <img alt="rescue ready" src={logo}></img>
                            </NavLink>
                        </div>
                    </div>
                    <div className='flashcard-links-and-search-container'>
                        <div className="flashcard-links">
                            {sessionUser ? (
                                <NavLink className="create-flashcard" exact to="/new-flashcard">
                                    Create a Flashcard
                                </NavLink>
                            ) : (
                                <div className='create-flashcard'>
                                    <NavLink className="create-flashcard" exact to="/login">
                                        Create a Flashcard
                                    </NavLink>
                                </div>
                            )}
                            {sessionUser ? (
                                <NavLink className="create-flashcard-set" exact to="/new-flashcard-set">
                                    Create a Flashcard Set
                                </NavLink>
                            ) : (
                                <div className="create-flashcard-set">
                                    <NavLink className="create-flashcard" exact to="/login">
                                        Create a Flashcard
                                    </NavLink>
                                </div>
                            )}
                        </div>
                        <div className='search-bar-container'>
                            <label className='globalSearchBar'>
                                <AiOutlineSearch className="search-icon" />
                                <input
                                    type="text"
                                    placeholder=" Search flashcards, flashcard sets and quizzes..."
                                    value={searchBar}
                                    onChange={(e) => setSearchBar(e.target.value)}
                                    className="search-bar"
                                />
                            </label>
                        </div>
                    </div>

                    <div className='create-quiz-link'>
                        {sessionUser ? (
                            <NavLink className="create-quiz" exact to="/new-quiz">
                                Create a Quiz
                            </NavLink>
                        ) : (
                            <div className="create-quiz">
                                <NavLink className="create-quiz" exact to="/login">
                                    Create a Quiz
                                </NavLink>
                            </div>
                        )}
                    </div>
                    {isLoaded && <ProfileButton user={sessionUser} />}
                </div>
            </div>
            <div className="topic-bar">
                <div className="topic-contents">
                    <NavLink exact to="/flashcards/topic/1">
                        Airway, Respiration & Ventilation
                    </NavLink>
                    <NavLink exact to="/flashcards/topic/2">
                        Cardiology & Resuscitation
                    </NavLink>
                    <NavLink exact to="/flashcards/topic/3">
                        EMS Operations
                    </NavLink>
                    <NavLink exact to="/flashcards/topic/4">
                        Medical: Obstetrics
                    </NavLink>
                    <NavLink exact to="/flashcards/topic/5">
                        Trauma
                    </NavLink>
                </div>
            </div>
        </>
    );
}

export default Navigation;                               