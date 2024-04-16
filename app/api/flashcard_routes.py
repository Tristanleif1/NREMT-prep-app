from flask import Blueprint, request, jsonify, redirect
from app.models import db, Flashcard, FlashcardSet, User, Topic
from app.forms.flashcard_form import FlashcardForm
from app.forms.flashcard_set_form import FlashcardSetForm
from flask_login import current_user, login_required
from datetime import date



flashcard_routes = Blueprint('flashcards', __name__)

#CRUD



# Get all flashcards at '/flashcards/'
@flashcard_routes.route('/')
def all_flashcards():
    """
    Query for all the flashcards and returns in a list of dictionaries
    """

    page = request.args.get('page', 1, type=int)
    per_page = request.args.get('size', 24, type=int)
    paginated_flashcards = Flashcard.query.paginate(page=page, per_page=per_page, error_out=False)
    flashcards = paginated_flashcards.items

    total = paginated_flashcards.total
    pages = paginated_flashcards.pages

    return {
        "flashcards":[flashcard.to_dict() for flashcard in flashcards],
        "page": page,
        "size": per_page,
        "total": total,
        "pages": pages
        }

#Get all flashcards belonging to a specific topic

@flashcard_routes.route('/topic/<int:id>')
def flashcards_by_topic(id):
    flashcards = Flashcard.query.filter(Flashcard.topicId == id).all()
    return {'flashcards': [flashcard.to_dict() for flashcard in flashcards]}

#POST a flashcard for authenticatd user '/flashcards/'
@flashcard_routes.route('/', methods=["POST"])
@login_required
def post_form():
    """
    Create a new flashcard for the signed in user
    """
    form = FlashcardForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        new_flashcard = Flashcard(
            topicId=form.data["topicId"],
            userId=current_user.id,
            flashcardSetId=None,
            question=form.data["question"],
            answer=form.data["answer"]
        )
        db.session.add(new_flashcard)
        db.session.commit()

        return new_flashcard.to_dict()
    
    else:
        return jsonify({"error": "Invalid form data", "form submission error": form.errors}), 400
    
#Get all flashcards owned by the current user '/flashcards/my-flashcards'

@flashcard_routes.route('/my-flashcards')
@login_required
def my_flashcards():
    """
    Query for all flashcards owned by the current user
    """
    flashcards = Flashcard.query.filter(current_user.id == Flashcard.userId).all()

    return {"my_flashcards": [flashcard.to_dict() for flashcard in flashcards]}


#Get a flashcard's details '/flashcards/:id'

@flashcard_routes.route('/<int:id>')
def flashcard_details(id):
    flashcard = Flashcard.query.get(id)
    if not flashcard:
        return jsonify({"error": "Flashcard not found"})
    return flashcard.to_dict()


#Edit a flashcard's details for an authenticated user 

@flashcard_routes.route('/<int:id>', methods=["PUT"])
@login_required
def edit_flashcard_form(id):
    """
    Update an existing flashcard that belongs to the authenticated user 
    """
    form = FlashcardForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        flashcard = Flashcard.query.get(id)
        if flashcard:
            if form.data.get("topicId"):
                flashcard.topicId= form.data["topicId"]
            if form.data.get("flashcardSetId"):
                flashcard.flashcardSetId=form.data["flashcardSetId"]
            if form.data.get("question"):
                flashcard.question = form.data["question"]
            if form.data.get("answer"):
                flashcard.answer = form.data["answer"]

            db.session.commit()

            return flashcard.to_dict()
        else:
            return jsonify({"error": "Flashcard not found"}), 404
    else:
        return jsonify({"error": "Invalid form data", "form_errors": form.errors}), 400
    
#DELETE a flashcard by flashcardId '/flashcards/:id'
@flashcard_routes.route('/<int:id>', methods=["DELETE"])
@login_required
def delete_flashcard(id):
    """
    Delete an existing flashcard for an authenticatd user
    """

    flashcard = Flashcard.query.get(id)

    if not flashcard:
        return jsonify({"error": "Flashcard not found"})
    
    if flashcard.userId == current_user.id:
        db.session.delete(flashcard)
        db.session.commit()

        return jsonify({"Message": "Successfully deleted!"})
    
    else:
        return jsonify({"error": "Unauthorized action"})
