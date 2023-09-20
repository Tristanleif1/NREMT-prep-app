from flask import Blueprint, request, jsonify, redirect
from app.models import db, Flashcard, FlashcardSet, User, Topic
from app.forms.flashcard_form import FlashcardForm
from app.forms.flashcard_set_form import FlashcardSetForm
from flask_login import current_user, login_required
from datetime import date



flashcard_sets_routes = Blueprint('flashcard-sets', __name__)