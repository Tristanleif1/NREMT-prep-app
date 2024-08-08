from app.models import db, Flashcard, environment, SCHEMA
from sqlalchemy.sql import text

def seed_flashcards2():
    flashcard97= Flashcard(
        topicId=2,
        userId=2,
        question="What is the best step for a responsive cardiac emergency patient with palpable pulses?",
        answer="Do not use the AED."
    )
    flashcard98= Flashcard(
        topicId=2,
        userId=3,
        question="What is the best step for a responsive cardiac emergency patient with palpable pulses?",
        answer="AED with pediatric dose attenuator"
    )
    flashcard99= Flashcard(
        topicId=2,
        userId=7,
        question="The acronym ROSC means _____",
        answer="Return of spontaneous circulaiton"
    )
    flashcard100= Flashcard(
        topicId=2,
        userId=8,
        question="The ongoing assessment of the unconscious patient should be checked during transport every ____ minutes.",
        answer="5"
    )
    flashcard101= Flashcard(
        topicId=5,
        userId=1,
        question="What are the basic patient assessment components for trauma patients?",
        answer="scene size-up/MOI, primary, history, secondary assessment, and reassessment"
    )
    flashcard102= Flashcard(
        topicId=5,
        userId=2,
        question="Examples of an open wound include ____",
        answer="Impaled object, dog bite"
    )
    flashcard103= Flashcard(
        topicId=5,
        userId=3,
        question="Select the best option to open the airway of a patient with a suspected spinal injury.",
        answer="jaw-thrust-maneuever"
    )
    flashcard104= Flashcard(
        topicId=5,
        userId=7,
        question="Accurately identify signs related to compensated shock.",
        answer="narrowing pulse pressure, clammy skin"
    )
    flashcard105= Flashcard(
        topicId=5,
        userId=7,
        question="Which of these lists examples of the deadly dozen chest injuries?",
        answer="esophageal injury, myocardial contusion, airway obstruction"
    )
    flashcard106= Flashcard(
        topicId=5,
        userId=9,
        question="Select the best option to identify possible signs of a genitourinary (GU) injury.",
        answer="hematuria, blood at opening of urethra"
    )

    db.session.add(flashcard97)
    db.session.add(flashcard98)
    db.session.add(flashcard99)
    db.session.add(flashcard100)
    db.session.add(flashcard101)
    db.session.add(flashcard102)
    db.session.add(flashcard103)
    db.session.add(flashcard104)
    db.session.add(flashcard105)
    db.session.add(flashcard106)
    
    db.session.commit()


def undo_flashcards2():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.flashcards RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM flashcards"))

    db.session.commit()