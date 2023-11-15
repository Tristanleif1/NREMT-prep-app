import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import session from './session'
import { flashcardsReducer } from './flashcard';
import { flashcardSetsReducer } from './flashcardSet';
import { quizReducer } from './quiz';

const rootReducer = combineReducers({
  session,
  flashcard: flashcardsReducer,
  flashcardSet: flashcardSetsReducer,
  quiz: quizReducer
});


let enhancer;

if (process.env.NODE_ENV === 'production') {
  enhancer = applyMiddleware(thunk);
} else {
  const logger = require('redux-logger').default;
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = (preloadedState) => {
  return createStore(rootReducer, preloadedState, enhancer);
};

export default configureStore;
