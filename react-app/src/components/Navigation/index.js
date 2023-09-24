import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';
import logo from "../../assets/149766631.png"

function Navigation({ isLoaded }){
	const sessionUser = useSelector(state => state.session.user);

	return (
		<>
		  <div className="nav-bar">
			{sessionUser ? (
			  <NavLink className="create-flashcard" exact to="/new-flashcard">
				Create a Flashcard
			  </NavLink>
			) : (
			  <NavLink exact to="/login" className="create-project">
				Create a Flashcard
			  </NavLink>
			)}
			<div className="emt-logo">
			  <NavLink className="emt-logo" exact to="/">
				<img alt="rescure ready" src={logo}></img>
			  </NavLink>
			</div>
			{isLoaded && <ProfileButton user={sessionUser} />}
		  </div>
		</>
	  );
	}
	

export default Navigation;