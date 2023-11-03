import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';
import logo from "../../assets/rescue-ready-logo.png"
import { AiOutlineSearch } from "react-icons/ai";

function Navigation({ isLoaded, setSearchBar, searchBar }){
	const sessionUser = useSelector(state => state.session.user);


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
                        <NavLink exact to="/login" className="create-flashcard">
                            Create a Flashcard
                        </NavLink>
                    )}
                    {sessionUser ? (
                        <NavLink className="create-flashcard-set" exact to="/new-flashcard-set">
                            Create a Flashcard Set
                        </NavLink>
                    ) : (
                        <NavLink exact to="/login" className="create-flashcard">
                            Create a Flashcard Set
                        </NavLink>
                    )}
                </div>
                <div className='search-bar-container'>
                    <div className="search-input-wrapper">
                        <AiOutlineSearch className="search-icon" />
                        <input
                            type="text"
                            placeholder=" Search flashcards and flashcard sets..."
                            value={searchBar}
                            onChange={(e) => setSearchBar(e.target.value)}
                            className="search-bar" 
                            />
                        </div>
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