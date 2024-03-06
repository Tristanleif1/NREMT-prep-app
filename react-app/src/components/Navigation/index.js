import React, { useState, useRef, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';
import logo from "../../assets/rescue-ready-logo.png"
import { AiOutlineSearch } from "react-icons/ai";
import LoginFormModal from "../LoginFormModal";
import OpenModalButton from "../OpenModalButton"

function Navigation({ isLoaded, setSearchBar, searchBar }){
	const sessionUser = useSelector(state => state.session.user);
    const [showMenu, setShowMenu] = useState(false);
    const ulRef = useRef();

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
            <div className="nav-bar">
                <div className="emt-logo">
                    <NavLink className="emt-logo" exact to="/">
                        <img alt="rescue ready" src={logo}></img>
                    </NavLink>
                </div>
                <div className="flashcard-links">
                    {sessionUser ? (
                        <NavLink className="create-flashcard" exact to="/new-flashcard">
                            Create a Flashcard
                        </NavLink>
                    ) : (
                        <div>
                         <OpenModalButton
                            buttonText="Create a Flashcard"
                            onItemClick={closeMenu}
                            modalComponent={<LoginFormModal />}
                        />
                        </div>
                    )}
                    {sessionUser ? (
                        <NavLink className="create-flashcard-set" exact to="/new-flashcard-set">
                            Create a Flashcard Set
                        </NavLink>
                    ) : (
                        <div className="create-flashcard-set">
                         <OpenModalButton
                            buttonText="Create a Flashcard Set"
                            onItemClick={closeMenu}
                            modalComponent={<LoginFormModal />}
                        />
                        </div>
                    )}
                </div>
                <div className='search-bar-container'>
                    <div className="search-input-wrapper">
                        <AiOutlineSearch className="search-icon" />
                        <input
                            type="text"
                            placeholder=" Search flashcards, flashcard sets and quizzes..."
                            value={searchBar}
                            onChange={(e) => setSearchBar(e.target.value)}
                            className="search-bar" 
                            />
                        </div>
                    </div>
                <div className='create-quiz-link'>
                    {sessionUser ? (
                        <NavLink className="create-quiz" exact to="/new-quiz">
                            Create a Quiz
                        </NavLink>
                    ) : (
                        <div className="create-quiz">
                         <OpenModalButton
                            buttonText="Create a Quiz"
                            onItemClick={closeMenu}
                            modalComponent={<LoginFormModal />}
                        />
                        </div>
                    )}
                </div>
                {isLoaded && <ProfileButton user={sessionUser} />}
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