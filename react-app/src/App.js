import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import SignupFormPage from "./components/SignupFormPage";
import LoginFormPage from "./components/LoginFormPage";
import { authenticate } from "./store/session";
import Navigation from "./components/Navigation";
import Flashcards from "./components/Flashcards";
import FlashcardDetails from "./components/FlashcardDetails";
import NewFlashcardForm from "./components/FlashcardForm";
import EditFlashcard from "./components/EditFlashcard";
import MyFlashcards from "./components/MyFlashcardsPage";
import FlashcardSetForm from "./components/FlashcardSetForm";
import FlashcardSetDetails from "./components/FlashcardSetDetails";
import MyFlashcardSets from "./components/MyFlashcardSets";
import EditFlashcardSet from "./components/EditFlashcardSet";
import FlashcardsByTopic from "./components/FlashcardsByTopic";
import QuizPage from "./components/QuizPage";
import QuizForm from "./components/QuizForm";
import MyQuizzes from "./components/MyQuizzes";
import EditQuizForm from "./components/EditQuizForm";
import LoginFormModal from "./components/LoginFormModal";
import SignupFormModal from "./components/SignupFormModal";
import Landing from "./components/Landing";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  const [ searchBar, setSearchBar ] = useState('')
  useEffect(() => {
    dispatch(authenticate()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} setSearchBar={setSearchBar} searchBar={searchBar} />
      {isLoaded && (
        <Switch>
          <Route exact path="/">
            <Landing />
          </Route>
          <Route exact path="/home">
            <Flashcards searchBar={searchBar} />
          </Route>
          <Route path="/flashcards/topic/:topicId">
            <FlashcardsByTopic searchBar={searchBar}/>
          </Route>
          <Route exact path="/flashcards/:id/edit">
            <EditFlashcard />
          </Route>
          <Route path="/flashcards/:id">
            <FlashcardDetails />
          </Route>
          <Route path="/new-flashcard">
            <NewFlashcardForm />
          </Route>
          <Route path="/new-flashcard-set">
            <FlashcardSetForm />
          </Route>
          <Route path="/flashcard-sets/:id/edit">
            <EditFlashcardSet />
          </Route>
          <Route path="/flashcard-sets/:id">
            <FlashcardSetDetails />
          </Route>
          <Route path="/my-flashcards">
            <MyFlashcards />
          </Route>
          <Route path="/my-flashcard-sets">
            <MyFlashcardSets />
          </Route>
          <Route path="/quizzes/:id/edit">
            <EditQuizForm />
          </Route>
          <Route path="/quizzes/:id">
            <QuizPage />
          </Route>
          <Route path="/new-quiz">
            <QuizForm />
          </Route>
          <Route path="/my-quizzes">
            <MyQuizzes />
          </Route>
          <Route path="/login" >
            <LoginFormModal/>
          </Route>
          <Route path="/signup">
            <SignupFormModal />
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;
