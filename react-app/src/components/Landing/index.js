import React from "react";
import emtLogo from "../../assets/EMT-logo-for-landing-page.webp";
import { useHistory } from "react-router-dom";
import OpenModalButton from "../OpenModalButton";
import LoginFormModal from "../LoginFormModal";


function Landing() {
    const history = useHistory()



    return (
        <div className="landing-main-wrapper">
            <section className="landing-main-text">
                <h1>Rescue Ready <br/>Turning Learners into Lifesavers</h1>
                <p>Utilize and Create Flashcards, Flashcard Sets and Quizzes to enhance your studying experience and ACE the NREMT</p>
            </section>
                <div className="landing-main-actions">
                    <button className="get-started-button" type="button" onClick={<OpenModalButton
                        buttonText="Log In"
                        onItemClick={closeMenu}
                        modalComponent={<LoginFormModal />}
                />}>
                        <span>Get started</span>
                    </button>
            </div>

            <img className="landing-emt-image" src={emtLogo}/>
        </div>
    );
}

export default Landing;

