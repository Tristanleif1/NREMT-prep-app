from app.models import db, User, Question, environment, SCHEMA
from sqlalchemy.sql import text


def seed_questions():
    question1 = Question(
        quizId=1,
        question="You are called to the scene of a pedestrian struck by a car. Upon examination, you notice clear fluid leaking from the patient’s ear that you believe to be cerebral spinal fluid (CSF).What injury is commonly associated with CSF leaking from the ears?",
        option1="Severe neck injury",
        option2="Basilar skull fracture",
        option3="Ruptured eardrum",
        option4="Cervical spine injury",
        correct_answer="Basilar skull fracture"
    )
    question2 = Question(
        quizId=1,
        question="What does PMS stand for during your assessment of a patient's lower extremities?",
        option1="Pain, Motion, Sensation",
        option2="Pain, Motion, Severity",
        option3="Pulse, Motor, Sensation",
        option4="Pulse, Motor, Severity",
        correct_answer="Pulse, Motor, Sensation"
    )
    question3 = Question(
        quizId=1,
        question="You arrive on the scene of a patient who fell from a ladder. Which of the following information is NOT an important factor in the patient's care?",
        option1="Distance the patient fell from",
        option2="Surface the patient landed on",
        option3="What part of the body hit first",
        option4="Height of the ladder",
        correct_answer="Height of the ladder"
    )
    question4 = Question(
        quizId=1,
        question="You are at the scene of an MVA, in which there are three patients, all of which have minor visible injuries. Two are refusing treatment, and the last is complaining of neck and back pain.",
        option1="Obtain signed refusals from the first two patients then proceed to the third",
        option2="Surface the patient landed on",
        option3="Treat the third patient, nothing else is needed for the other two",
        option4="Have your partner obtain refusals from the two patients who refused treatment, while you treat the last patient.",
        correct_answer="Have your partner obtain refusals from the two patients who refused treatment, while you treat the last patient."
    )
    question5 = Question(
        quizId=1,
        question="Your patient is a 17-year old male found face down in a swimming pool. He is currently being held face-up at the surface of the water. He is unconscious but breathing and has a pulse.",
        option1="Jump into the pool and begin CPR",
        option2="Remove the patient from the pool, immobilize, and transport.",
        option3="Apply cervical and spinal immobilization while the patient is still in the pool",
        option4="Wait for a trained water rescue team",
        correct_answer="Apply cervical and spinal immobilization while the patient is still in the pool"
    )
    question6 = Question(
        quizId=1,
        question="A laceration, spurting bright red blood, most likely means what type of injury?",
        option1="Venous",
        option2="Arterial",
        option3="Capillary",
        option4="Amputation",
        correct_answer="Arterial"
    )
    question7 = Question(
        quizId=1,
        question="Your patient has a laceration to the right leg, intersecting the femoral artery. You have applied direct pressure to the wound, but it continues to soak through the bandages.",
        option1="Apply a traction splint",
        option2="Elevate the leg",
        option3="Remove the old bandage and apply new ones",
        option4="Apply pressure to the pressure point just above the injury",
        correct_answer="Elevate the leg"
    )
    question8 = Question(
        quizId=1,
        question="Any penetrating missile traveling over 2,000 ft/sec would be classified as?",
        option1="Low-velocity",
        option2="Medium-velocity",
        option3="High-velocity",
        option4="Decelerating",
        correct_answer="High-velocity"
    )
    question9 = Question(
        quizId=1,
        question="When there is penetrating trauma, there is a permanent cavity formed by the projectile contacting the tissues. How is a temporary cavity formed?",
        option1="By the twisting of the projectile",
        option2="By energy transferring off of the projectile",
        option3="By the wadding entering the body",
        option4="By unspent gun powder",
        correct_answer="By energy transferring off of the projectile"
    )
    question10 = Question(
        quizId=1,
        question="The way a patient is injured is often referred to as the _______________?",
        option1="mechanism of injury",
        option2="mechanics of injury",
        option3="injury pattern",
        option4="By unspent gun powder",
        correct_answer="energy transfer"
    )

    db.session.add(question1)
    db.session.add(question2)
    db.session.add(question3)
    db.session.add(question4)
    db.session.add(question5)
    db.session.add(question6)
    db.session.add(question7)
    db.session.add(question8)
    db.session.add(question9)
    db.session.add(question10)
    db.session.commit()


def undo_questions():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.questions RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM questions"))
        
    db.session.commit()