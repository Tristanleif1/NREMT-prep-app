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
    Update an existing flashcard set that belongs to an authenticated user 
    """
    form = FlashcardSetForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    flashcardSet = FlashcardSet.query.get(id)
    if form.validate_on_submit() and flashcardSet:
        flashcardSet.title = form.title.data
        data = request.json
        if data.get("flashcards"):
            flashcard_ids = [flashcard['id'] for flashcard in data["flashcards"] if 'id' in flashcard]
            Flashcard.query.filter(Flashcard.flashcardSetId == id, ~Flashcard.id.in_(flashcard_ids)).delete()

            for flashcard_data in data["flashcards"]:
                if 'id' in flashcard_data:
                    flashcard = Flashcard.query.get(flashcard_data["id"])
                    if flashcard:
                        if flashcard_data["question"].strip() and flashcard_data["answer"].strip():
                            flashcard.question = flashcard_data["question"]
                            flashcard.answer = flashcard_data["answer"]
                        else:
                            db.session.delete(flashcard)
                else:
                    new_flashcard = Flashcard(
                        question=flashcard_data["question"].strip(),
                        answer=flashcard_data["answer"].strip(),
                        flashcardSetId=id,
                        userId=current_user.id
                    )
                    db.session.add(new_flashcard)

            db.session.commit()

        return flashcardSet.to_dict()
    
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
    
@flashcard_sets_routes.route('/<int:id>/add-flashcard', methods=["POST"])
@login_required
def add_flashcard_to_set(id):
    form = FlashcardForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    # Remove or update form validation for topicId if needed
    if form.validate_on_submit():
        topicId = form.data.get("topicId")  # Using get method to avoid KeyError
        new_flashcard = Flashcard(
            topicId=topicId,
            userId=current_user.id,
            flashcardSetId=id,
            question=form.data["question"],
            answer=form.data["answer"]
        )
        db.session.add(new_flashcard)
        db.session.commit()
        return new_flashcard.to_dict()
    else:
        return jsonify({"error": "Invalid form data", "form submission error": form.errors}), 400