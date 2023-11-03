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
        quizId=2,
        question="The way a patient is injured is often referred to as the _______________?",
        option1="mechanism of injury",
        option2="energy transfer",
        option3="injury pattern",
        option4="By unspent gun powder",
        correct_answer="mechanism of injury"
    )

    question11 = Question(
        quizId=2,
        question="You have just arrived on scene of a single vehicle accident involving a truck that has slid off the road and rolled. Your patient was driving about 40 mph when he hit an icy spot and went off the road rolling the vehicle one time. After completing your scene size up, which of the following treatment choices would be the most appropriate?",
        option1="Check baseline vitals, do a focused exam on the patient's chief complaint",
        option2="Get a SAMPLE history and do a focused physical examination",
        option3="Perform a rapid trauma assessment",
        option4="Perform a detailed physical examination to uncover any life threatening injuries",
        correct_answer="Perform a rapid trauma assessment"
    )
    question12 = Question(
        quizId=2,
        question="A man had both legs burned on the front and back, along with the fronts of both arms. Approximately what percentage of his body was burned?",
        option1="36%",
        option2="45%",
        option3="50%",
        option4="54%",
        correct_answer="45%"
    )
    question13 = Question(
        quizId=2,
        question="Why does Nitroglycerin lower the blood pressure?",
        option1="Because it reduces the workload on the veins",
        option2="Because it dilates the vessels reducing the preload on the heart",
        option3="Because the veins are constricted reducing workload on the heart",
        option4="It doesn't, it raises it",
        correct_answer="Because it dilates the vessels reducing the preload on the heart"
    )
    question14 = Question(
        quizId=2,
        question="You arrive on scene with your partner Levi to transport a patient that has been throwing up blood that looked like coffee grounds. This sign would lead you to believe that patient has what?",
        option1="Esophageal Veracies",
        option2="Pancytopenia",
        option3="GI bleed",
        option4="Hemophagocytic syndrome",
        correct_answer="GI bleed"
    )
    question15 = Question(
        quizId=2,
        question="A 57 year old woman is complaining of chest pain. Her blood pressure is 109/88 and her respirations are at 22 per minute. What condition does the patient's blood pressure indicate?",
        option1="Paradoxical pressure",
        option2="Systolic trans cardiac eschemia",
        option3="Martiners Rules",
        option4="Low pulse pressure",
        correct_answer="Low pulse pressure"
    )
    question16 = Question(
        quizId=2,
        question="Which list includes only the Five Rights of medication administration?",
        option1="Patient, medication, indication, dose, and time",
        option2="Medication, dose, time, route, and documentation",
        option3="Patient, medication, dose, route, and time",
        option4="Medication, dose, generic name, route and documentation",
        correct_answer="Patient, medication, dose, route and time"
    )
    question17 = Question(
        quizId=2,
        question="You have requested helicopter transportation of a critical burn patient. The remote nature of the accident will force the helicopter to land on an incline. From which direction should you approach the helicopter?",
        option1="The back",
        option2="The front",
        option3="The uphill side",
        option4="The downhill side",
        correct_answer="The downhill side"
    )
    question18 = Question(
        quizId=2,
        question="Which space in the body will you find the pancreas?",
        option1="Subatrial space",
        option2="Retroperitoneal space",
        option3="Pericardial space",
        option4="Peritoneal space",
        correct_answer="Retroperitoneal space"
    )
    question19 = Question(
        quizId=2,
        question="Of the following where shouldn't attention be focused during the secondary assessment of the arms?",
        option1="Distal circulation",
        option2="Accessory muscle use",
        option3="Motor function",
        option4="Medical jewelry",
        correct_answer="Accessory muscle use"
    )
    question20 = Question(
        quizId=2,
        question="What is the area of hazardous contamination known as?",
        option1="Green zone",
        option2="Yellow zone",
        option3="Hot zone",
        option4="Black zone",
        correct_answer="Hot zone"
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
    db.session.add(question11)
    db.session.add(question12)
    db.session.add(question13)
    db.session.add(question14)
    db.session.add(question15)
    db.session.add(question16)
    db.session.add(question17)
    db.session.add(question18)
    db.session.add(question19)
    db.session.add(question20)
    db.session.commit()


def undo_questions():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.questions RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM questions"))
        
    db.session.commit()