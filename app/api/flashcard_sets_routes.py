from flask import Blueprint, request, jsonify, redirect
from app.models import db, Flashcard, FlashcardSet, User, Topic
from app.forms.flashcard_form import FlashcardForm
from app.forms.flashcard_set_form import FlashcardSetForm
from flask_login import current_user, login_required
from datetime import date



flashcard_sets_routes = Blueprint('flashcard-sets', __name__)

#Get all flashcard sets

@flashcard_sets_routes.route('/')
def all_flashcard_sets():
    flashcardSets = FlashcardSet.query.all()

    return {"flashcard_sets": [flashcardSet.to_dict() for flashcardSet in flashcardSets]}

@flashcard_sets_routes.route('/', methods=["POST"])
def post_flashcard_set():
    """
    Create a new flashcard set for authenticated user
    """

    form = FlashcardSetForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        new_flashcard_set = FlashcardSet(
            userId=current_user.id,
            title=form.data["title"]
        )
        db.session.add(new_flashcard_set)
        db.session.commit()

        return new_flashcard_set.to_dict()
    else: 
        return jsonify({"error": "Invalid form data", "form_errors": form.errors}), 400


@flashcard_sets_routes.route('/<int:id>')
@login_required
def flashcard_set_details(id):
    """
    Get details about a flashcard set 
    """
    flashcardSet = FlashcardSet.query.get(id)
    if flashcardSet:
        return flashcardSet.to_dict()
    else:
        return jsonify({"error": "Flashcard set could not be found"})
    
   #Get all flashcard sets owned by the current user 
@flashcard_sets_routes.route('/my-sets')
@login_required
def my_flashcard_sets():
    """
    Query for all flashcard sets owned by the current user 
    """
    myFlashcardSets = FlashcardSet.query.filter(current_user.id == FlashcardSet.userId).all()

    return {"my_flashcardSets": [flashcardSet.to_dict() for flashcardSet in myFlashcardSets] }


@flashcard_sets_routes.route('/<int:id>', methods=["PUT"])
@login_required
def edit_flashcard_set_form(id):
    """
    Update an existing flashacrd set that belongs to an authenticated user 
    """
    form = FlashcardSetForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        flashcardSet = FlashcardSet.query.get(id)
        if flashcardSet:
            if form.data.get("title"):
                flashcardSet.title = form.data["title"]
            
            db.session.commit()

            return flashcardSet.to_dict()
        else:
            return jsonify({"error": "Flashcard Set not found"}), 400
    else:
        return jsonify({"error": "Invalid form data", "form_errors": form.errors}), 400
    


#Delete a flashcard set by flashcardSetId 'flashcard-sets/:id'
@flashcard_sets_routes.route('/<int:id>', methods=["DELETE"])
@login_required
def delete_flashcard_set(id):
    """
    Delete an existing flashcard set for an authenticated user
    """

    flashcardSet = FlashcardSet.query.get(id)

    if not flashcardSet:
        return jsonify({"error": "Flashcard set not found"})
    
    if flashcardSet.userId == current_user.id:
        db.session.delete(flashcardSet)
        db.session.commit()

        return jsonify({"Message": "Successfully deleted!"})
    
    else:
        return jsonify({"error": "Unauthorized action"})