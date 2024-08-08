from flask.cli import AppGroup
from .users import seed_users, undo_users
from .flashcards import seed_flashcards, undo_flashcards
from .flashcard_sets import seed_flashcard_sets, undo_flashcard_sets
from .quizzes import seed_quizzes, undo_quizzes
from .questions import seed_questions, undo_questions
from .topics import seed_topics, undo_topics
from .flashcards2 import seed_flashcards2, undo_flashcards2

from app.models.db import db, environment, SCHEMA

# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')


# Creates the `flask seed all` command
@seed_commands.command('all')
def seed():
    if environment == 'production':
        # Before seeding in production, you want to run the seed undo 
        # command, which will  truncate all tables prefixed with 
        # the schema name (see comment in users.py undo_users function).
        # Make sure to add all your other model's undo functions below
        undo_users()
        undo_topics()
        undo_flashcard_sets()
        undo_flashcards()
        undo_flashcards2()
        undo_quizzes()
        undo_questions()
    seed_users()
    seed_topics()
    seed_flashcard_sets()
    seed_flashcards()
    seed_flashcards2()
    seed_quizzes()
    seed_questions()
    # Add other seed functions here


# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    undo_users()
    undo_topics()
    undo_flashcard_sets()
    undo_flashcards()
    undo_flashcards2()
    undo_quizzes()
    undo_questions()
    # Add other undo functions here