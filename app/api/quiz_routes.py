from flask import Blueprint, request, jsonify, redirect
from app.models import db, Flashcard, FlashcardSet, User, Topic, Quiz, Question
from app.forms.flashcard_form import FlashcardForm
from app.forms.flashcard_set_form import FlashcardSetForm
from app.forms.quiz_form import QuizForm
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


@quiz_routes.route('/', methods=["POST"])
@login_required
def post_quiz():
     """
     Create a new quiz for the authenticated user
     """
     form = QuizForm()
     form['csrf_token'].data = request.cookies['csrf_token']
     if form.validate_on_submit():
          new_quiz = Quiz(
               userId = current_user.id,
               title=form.data["title"]
          )
          db.session.add(new_quiz)
          db.session.commit()

          return new_quiz.to_dict()
     else:
          return jsonify({"error": "Invalid form data", "form_errors": form.errors}), 400
     

@quiz_routes.route('/my-quizzes')
@login_required
def my_quizzes():
     """
     Query for all quizzes owned by the current user
     """
     myQuizzes = Quiz.query.filter(current_user.id == Quiz.userId).all()
     if myQuizzes:
        return {"my_quizzes": [quiz.to_dict() for quiz in myQuizzes]}
     else:
          return jsonify({"error": "No quizzes found"})
     

@quiz_routes.route('/<int:id>', methods=["DELETE"])
@login_required
def delete_quiz(id):
     """
     Delete an existing quiz belonging to the authenticated user
     """
     selectedQuiz = Quiz.query.get(id)

     if not selectedQuiz:
          return jsonify({"error": "Quiz not found"})
     
     if selectedQuiz.userId == current_user.id:
          db.session.delete(selectedQuiz)
          db.session.commit()

          return jsonify({"Message": "Successfully deleted!"})
     
     else:
          return jsonify({"error": "Could not complete delete request"})
     

     