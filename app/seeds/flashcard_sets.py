from app.models import db, FlashcardSet, environment, SCHEMA
from sqlalchemy.sql import text

def seed_flashcard_sets():
    flashcardSet1 = FlashcardSet(
        userId=3,
        title='Pediatrics',
    )
    flashcardSet2 = FlashcardSet(
        userId=4,
        name="General Questions",
    )

    flashcardSet3 = FlashcardSet(
        userId=1,
        name="Chest Pain"
    )
    flashcardSet4 = FlashcardSet(
        userId=6,
        name="Anatomy"
    )


    db.session.add(flashcardSet1)
    db.session.add(flashcardSet2)
    db.session.add(flashcardSet3)
    db.session.add(flashcardSet4)
    

    db.session.commit()


def undo_flashcard_sets():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.flashcard_sets RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM categories"))

    db.session.commit()
