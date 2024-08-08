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
    question21 = Question(
        quizId=3,
        question="Which of these is the most likely indication of a head injury?",
        option1="unequal pupil dilation",
        option2="eye hyphema",
        option3="epistaxis",
        option4="impaled object in scapula",
        correct_answer="unequal pupil dilation"
    )
    question22 = Question(
        quizId=3,
        question="Select the safest method for handling a patient with an impaled object in the thigh.",
        option1="Hold pressure around the site with sterile gauze, carefully remove the object and apply an occlusive dressing.",
        option2="Stabilize the impaled object with bulky dressing; do not remove the object.",
        option3="Only remove impaled objects that are in the mouth.",
        option4="Complete patient assessment and, if stable, hold pressure with sterile gauze, carefully remove the object, and apply pressure dressing.",
        correct_answer="Stabilize the impaled object with bulky dressing, do not remove the object"
    )
    question23 = Question(
        quizId=3,
        question="The best method to care for a non-traumatic nosebleed is to put the ____.",
        option1="patient in an upright sitting position, head backward, and ice pack to the forehead.",
        option2="patient in an upright sitting position, head tilted slightly back, and pinch nostrils.",
        option3="patient in a sidelying position and pinch nostrils.",
        option4="patient in an upright sitting position, head forward, and pinch nostrils.",
        correct_answer="patient in an upright sitting position, head forward, and pinch nostrils"
    )
    question24 = Question(
        quizId=3,
        question="What type of injury should be suspected when the patient presents with “raccoon eyes”?",
        option1="mandibular fracture",
        option2="epistaxis",
        option3="skull injury or fracture",
        option4="rupture of tympanic membranes",
        correct_answer="skull injury or fracture"
    )
    question25 = Question(
        quizId=3,
        question="Select the best technique or device to use if extremity bleeding does not stop with pressure.",
        option1="limb elevation with pressure dressing",
        option2="occlusive dressing over a pressure dressing with limb elevation",
        option3="tourniquet with limb elevation",
        option4="tourniquet",
        correct_answer="tourniquet"
    )
    question26 = Question(
        quizId=3,
        question="What does the acronym HAPE mean?",
        option1="high-atmosphere pulmonary edema",
        option2="high-atmosphere physical exposure",
        option3="high-altitude pulmonary edema",
        option4="high-altitude pulmonary ecchymosis",
        correct_answer="high-altitude pulmonary edema"
    )
    question27 = Question(
        quizId=3,
        question="What is the first step to consider in the process of caring for a patient in extreme cold with exposure?",
        option1="Assess MOI and begin warming the patient.",
        option2="Check the patient’s airway and stabilize.",
        option3="Prepare to prevent personal harm from cold exposure",
        option4="Obtain the patient’s temperature and begin warming the patient.",
        correct_answer="Prepare to prevent personal harm from cold exposure."
    )
    question28 = Question(
        quizId=3,
        question="During the physical assessment of a patient with chest injuries, you palpate the chest and feel crepitus. What does this indicate?",
        option1="lack of blood flow",
        option2="pulmonary embolism",
        option3="bones grinding together",
        option4="pulmonary hematoma",
        correct_answer="bones grinding together"
    )
    question29 = Question(
        quizId=3,
        question="A patient who experiences a loss of consciousness caused by a decreased stimulus for breathing while swimming in shallow water may have experienced ____.",
        option1="fatigue syndome",
        option2="decompression sickness",
        option3="a near drowning episode",
        option4="breath-holding syncope",
        correct_answer="breath-holding syncope"
    )
    question30 = Question(
        quizId=3,
        question="Which of these is not true about assessing for internal injuries and bleeding?",
        option1="Bleeding from any body opening is a serious indicator of internal bleeding from injuries.",
        option2="Bruising and swelling may not be seen immediately after an internal injury.",
        option3="Bruising and swelling are indicators of possible internal bleeding from injuries.",
        option4="Pain is usually not an indicator of internal bleeding from injuries.",
        correct_answer="Pain is usually not an indicator of internal bleeding from injuries."
    )
    question31 = Question(
        quizId=4,
        question="What is the best description of the National Incident Management System (NIMS)?",
        option1="NIMS is used to prevent incidents from occurring.",
        option2="NIMS is the command structure to dictate an emergency response.",
        option3="NIMS provides a framework for the federal government to take responsibility for an incident.",
        option4="NIMS provides guidelines and common terms to allow multiple agencies to work together.",
        correct_answer="NIMS provides guidelines and common terms to allow multiple agencies to work together."
    )
    question32 = Question(
        quizId=4,
        question="What is the advantage of using the Incident Command System (ICS)?",
        option1="The ICS provides a framework to enable federal, state, and local governments, as well as private sector and nongovernmental organizations, to work together effectively.",
        option2="The ICS provides common guidelines for responding to an incident.",
        option3="The ICS is a rigid structure to establish command over an incident..",
        option4="The ICS gives you a modular organizational structure that can be applied to incidents of all sizes.",
        correct_answer="The ICS gives you a modular organizational structure that can be applied to incidents of all sizes."
    )
    question33 = Question(
        quizId=4,
        question="What is the term for an incident with three or more patients or one that places great demand on the EMS system?",
        option1="Multiple Response Incident(MRI)",
        option2="Multiple Victim Incident.",
        option3="Mass-Casualty Incident",
        option4="Triage",
        correct_answer="Mass Casualty Incident."
    )
    question34 = Question(
        quizId=4,
        question="What is triage?",
        option1="a method of sorting patients based on their severity of injury",
        option2="a method to determine how fast to transport a patient",
        option3="a method of bandaging a wound",
        option4="a method to determine how many personnel to care for a patient",
        correct_answer="a method of sorting patients based on their severity of injury"
    )
    question35 = Question(
        quizId=4,
        question="What is the name of the reference used to determine the initial response to a Hazardous Materials (HazMat) incident?",
        option1="the Safety Data Sheet",
        option2="the Shipping Paper",
        option3="CHEMTREC",
        option4="the DOT Emergency Response Guide",
        correct_answer="the DOT Emergency Response Guide"
    )
    question36 = Question(
        quizId=4,
        question="Where is an ambulance most likely to be involved in a traffic accident?",
        option1="at an intersection",
        option2="in a school zone",
        option3="on the freeway",
        option4="three miles from the station",
        correct_answer="at an instersection"
    )
    question37 = Question(
        quizId=4,
        question="Who is responsible for the daily inspection of an ambulance?",
        option1="the government licensing authority",
        option2="the staff assigned to the vehicle for that shift",
        option3="the staff who last used the vehicle",
        option4="the chief or supervisor",
        correct_answer="the staff assigned to the vehicle for that shift"
    )
    question38 = Question(
        quizId=4,
        question="Upon arrival on a scene, your first responsibility after BSI and PPE is to ____.",
        option1="gown/glove up for patient care",
        option2="size-up the scene",
        option3="begin care of the patient",
        option4="evaluate for spinal immobilization",
        correct_answer="size-up the scene"
    )
    question39 = Question(
        quizId=4,
        question="When cleaning an ambulance, what mixture of bleach to water is recommended?",
        option1="Bleach is not recommended. Use only an FDA approved chemical.",
        option2="1:5 dilution bleach to water",
        option3="1:2 dilution bleach to wate",
        option4="1:10 to 1:100 dilution bleach to water",
        correct_answer="1:10 to 1:100 dilution bleach to water"
    )
    question40 = Question(
        quizId=4,
        question="Which of these procedures are necessary in preparation for an ambulance call?",
        option1="checking supplies for expired and missing items and replacing them, when needed",
        option2="familiarizing yourself with the operating area and facilities you will transport to and from",
        option3="checking the equipment and vehicle for proper operation",
        option4="all of these",
        correct_answer="all of these"
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
    db.session.add(question21)
    db.session.add(question22)
    db.session.add(question23)
    db.session.add(question24)
    db.session.add(question25)
    db.session.add(question26)
    db.session.add(question27)
    db.session.add(question28)
    db.session.add(question29)
    db.session.add(question30)
    db.session.add(question31)
    db.session.add(question32)
    db.session.add(question33)
    db.session.add(question34)
    db.session.add(question35)
    db.session.add(question36)
    db.session.add(question37)
    db.session.add(question38)
    db.session.add(question39)
    db.session.add(question40)



    db.session.commit()


def undo_questions():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.questions RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM questions"))
        
    db.session.commit()