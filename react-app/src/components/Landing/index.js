import React, { useEffect, useState, useRef } from "react";
import emtLogo from "../../assets/EMT-logo-for-landing-page.webp";
import { useHistory } from "react-router-dom";
import OpenModalButton from "../OpenModalButton";
import LoginFormModal from "../LoginFormModal";
import "./Landing.css";


function Landing() {
    const history = useHistory();
    const [showMenu, setShowMenu] = useState(false);
    const ulRef = useRef();

    const directToHome = () => {
        history.push('/home')
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
        <div className="landing-main-wrapper">
            <section className="landing-main-text">
                <h1>Rescue Ready.<br/>Turning Learners into Lifesavers</h1>
                <p>Utilize and Create Flashcards, Flashcard Sets and Quizzes to enhance your studying experience and ACE the NREMT Exam</p>
                <div className="landing-main-actions">
                    <button className="get-started-button" type="button" onClick={directToHome}>
                        <span>Get started</span>
                    </button>
                 </div>
            </section>
            <img className="landing-emt-image" src={emtLogo}/>
        </div>
    );
}

export default Landing;

