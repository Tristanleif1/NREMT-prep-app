from flask import Blueprint, request, jsonify, redirect
from app.models import db, Flashcard, FlashcardSet, User, Topic, Quiz, Question
from app.forms.flashcard_form import FlashcardForm
from app.forms.flashcard_set_form import FlashcardSetForm
from flask_login import current_user, login_required
from datetime import date


quiz_routes = Blueprint('quizzes', __name__)


@quiz_routes.route('/')
def all_quizzes():
    """
    Query for all the quizzes and returns in a list of dictionaries
    """
    quizzes = Quiz.query.all()

    return {"quizzes": [quiz.to_dict() for quiz in quizzes]}

@quiz_routes.route('/<int:id>')
def quiz_details(id):

    quiz = Quiz.query.get(id)
    if not quiz:
        return jsonify({"error": "Quiz not found"})
    return quiz.to_dict()
     

@quiz_routes.route('/<int:id>/questions')
def quiz_questions(id):
    
        quizQuestions = Question.query.filter(Question.quizId == id).all()
        if not quizQuestions:
            return jsonify({"error": "Quiz questions not found"})
        return {"quizQuestions": [quizQuestion.to_dict() for quizQuestion in quizQuestions]}

        
