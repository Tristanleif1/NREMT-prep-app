from app.models import db, Flashcard, environment, SCHEMA
from sqlalchemy.sql import text

def seed_flashcards():
    flashcard1 = Flashcard(
        topicId=2,
        userId=1,
        flashcardSetId=3,
        question="You arrive to find a 48 year old male complaining that his chest feels heavy. The patient is awake and talking to you. During your assessment, you note that his skin is pale, cool, and clammy. Your first step is to:",
        answer="administer supplemental oxygen",
    )
    flashcard2 = Flashcard(
        topicId=2,
        userId=1,
        flashcardSetId=3,
        question="What is the correct flow of blood through the heart and lungs?",
        answer="inferior/superior vena cavae, right atrium, right ventricle, lungs, left ventricle, aorta",
    )

    flashcard3 = Flashcard(
        topicId=3,
        userId=1,
        flashcardSetId=5,
        question="The mitral or bicuspid valve:",
        answer="prevents blood from back flowing into the left atrium",
    )
    flashcard4 = Flashcard(
        topicId=5,
        userId=4,
        flashcardSetId=2,
        question="What are you NOT supposed to do during the treatment of an impaled object?",
        answer="Remove to accomodate the transportation of the patient",
    )
    flashcard5 = Flashcard(
        topicId=2,
        userId=4,
        flashcardSetId=2,
        question="The electrical impulse generated in the right atrium is called the ____?",
        answer="sinoatriual node",
    )
    flashcard6 = Flashcard(
        topicId=5,
        userId=4,
        flashcardSetId=2,
        question="You are treating a patient that has been involved in a motor vehicle accident. You can lift a flap of skin on the patient's head. This type of injury is referred to as: ____",
        answer="avulsion",
    )
    flashcard7 = Flashcard(
        topicId=3,
        userId=2,
        flashcardSetId=2,
        question="Which kind of heat emergency is considered a true emergency?",
        answer="heat stroke",
    )
    flashcard8 = Flashcard(
        topicId=1,
        userId=1,
        flashcardSetId=5,
        question="You are treating a patient who has overdosed on a narcotic. The greatest risk for this patient is___:",
        answer="respiratory depression",
    )
    flashcard9 = Flashcard(
        topicId=4,
        userId=3,
        flashcardSetId=1,
        question="Which of the following is NOT an imminent sign that birthing is going to occur",
        answer="contractions are 5 minutes apart",
    )
    flashcard10 = Flashcard(
        topicId=3,
        userId=4,
        flashcardSetId=2,
        question="Which patient characteristic does NOT represent a potential for violence?",
        answer="Large, muscular individual",
    )
    flashcard11 = Flashcard(
        topicId=4,
        userId=6,
        flashcardSetId=4,
        question="These are hollow and solid organs in the abdomen. The gallbladder is considered a hollow organ. A ruptured hollow organ such as the gallbladder is most commonly associated with:",
        answer="inflammation and infection",
    )
    flashcard12 = Flashcard(
        topicId=3,
        userId=4,
        flashcardSetId=2,
        question="A 29 year old male has taken LSD. The patient appears very anxious and in a panic state. He is showing signs of paranoia. You should:",
        answer="talk the patient down by reassuring the patient",
    )
    flashcard13 = Flashcard(
        topicId=3,
        userId=4,
        flashcardSetId=2,
        question="What is the most serious side effect of alcohol consumption?",
        answer="death",
    )
    flashcard14 = Flashcard(
        topicId=3,
        userId=4,
        flashcardSetId=2,
        question="You arrive on the scene of an acident where a 16 year old male fell approximately 12 feet. This is considered___: ",
        answer="not a significant mechanism of injury",
    )
    flashcard15 = Flashcard(
        topicId=3,
        userId=4,
        flashcardSetId=2,
        question="What is Medical Direction?",
        answer="Oversight of the patient-care aspects of an EMS system by the Medical Director",
    )
    flashcard16 = Flashcard(
        topicId=3,
        userId=4,
        flashcardSetId=2,
        question="What is Scope of Practice?",
        answer="What EMT's are allowed or trained to do",
    )
    flashcard17 = Flashcard(
        topicId=1,
        userId=3,
        flashcardSetId=1,
        question="What are differences in vital signs in pediatric population?",
        answer="faster heart rates and respiration and lower average blood pressure",
    )
    flashcard18 = Flashcard(
        topicId=2,
        userId=3,
        flashcardSetId=1,
        question="Where would you check a pulse in a pediatric patient",
        answer="palpate the brachial artery in the upper arm",
    )
    flashcard19 = Flashcard(
        topicId=1,
        userId=1,
        flashcardSetId=5,
        question="When assessing a 35 year old patient complaining of shortness of breath, you note that her breathing is in excess of 28 times per minute. This is considered___:",
        answer="tachypnea",
    )
    flashcard20 = Flashcard(
        topicId=1,
        userId=1,
        flashcardSetId=5,
        question="What is the upper airway?",
        answer="Nose, mouth, pharynx, larynx",
    )
    flashcard21 = Flashcard(
        topicId=1,
        userId=6,
        flashcardSetId=4,
        question="What is the diaphragm?",
        answer="muscular partition that seperates the thoracic cavity from the abdominal cavity and aids in respiration by moving up and down",
    )
    flashcard22 = Flashcard(
        topicId=2,
        userId=5,
        question="What is perfusion?",
        answer="The supply of oxygen to and removal of wastes from the cells and tissues of the body as a result of the flow of blood through the capillaries",
    )
    flashcard23 = Flashcard(
        topicId=1,
        userId=2,
        question="What is the appropriate care for a patient with epistaxis?",
        answer="Pinch the nostrils and have the patient lean forward",
    )
    flashcard24 = Flashcard(
        topicId=1,
        userId=3,
        flashcardSetId=1,
        question="What is the treatment of AMS in pediatric population?",
        answer="Secure the airway, administer 02, and transport to the hospital",
    )
    flashcard25 = Flashcard(
        topicId=5,
        userId=5,
        question="If the left side of the chest moves opposite to the right. This is called__:",
        answer="paradoxical movement",
    )
    flashcard26 = Flashcard(
        topicId=4,
        userId=2,
        question="What is name of the muscular organ in which baby develops during pregnancy?",
        answer="Uterus",
    )
    flashcard27 = Flashcard(
        topicId=4,
        userId=2,
        question="What is name of developing baby inside mother's uterus?",
        answer="Fetus",
    )
    flashcard28 = Flashcard(
        topicId=4,
        userId=2,
        question="What is name of temporary organ inside uterus that nourishes fetus through umbilical cord?",
        answer="Placenta",
    )
    flashcard29 = Flashcard(
        topicId=4,
        userId=3,
        question="What is name of Bag of Waters (BOW) that cushions fetus in uterus?",
        answer="Amniotic Sac",
    )
    flashcard30 = Flashcard(
        topicId=4,
        userId=3,
        question="What color should amniotic fluid be?",
        answer="Clear & colorless",
    )
    flashcard31 = Flashcard(
        topicId=5,
        userId=2,
        question="During your rapid trauma assessment of a critically-injured patient, you should assess the chest for",
        answer="symmetry and pain",
    )
    flashcard32 = Flashcard(
        topicId=5,
        userId=5,
        question="Initial care of a large avulsion includes",
        answer="controlling any bleeding",
    )
    flashcard33 = Flashcard(
        topicId=5,
        userId=1,
        question="Basic shock management consists of__",
        answer="applying oxygen, elevating the lower extremities, and providing warmth",
    )
    flashcard34 = Flashcard(
        topicId=1,
        userId=3,
        question="Snoring is likely caused by.....",
        answer="The tongue falling back against the pharynx.",
    )
    flashcard35= Flashcard(
        topicId=1,
        userId=3,
        question="What is the major function of the lower airway?",
        answer="To exchange oxygen and carbon dioxide through a process called diffusion.",
    )
    flashcard36= Flashcard(
        topicId=1,
        userId=5,
        question="Rapid breathing is found in what stage of shock?",
        answer="Compensated",
    )
    flashcard37= Flashcard(
        topicId=1,
        userId=6,
        question="How would you ventilate a patient using a BVM?",
        answer="With just enough air to make the chest rise",
    )
    flashcard38= Flashcard(
        topicId=1,
        userId=7,
        question="Your patient has a distended abdomen which you know can disrupt proper movement of the diaphragm and lead to?",
        answer="Hypoventilation",
    )
    flashcard39= Flashcard(
        topicId=1,
        userId=8,
        question="A 6 year old girl was found outside in her yard unconscious. She is breathing 6 breaths a minute and her pulse is 58 bpm with poor systematic perfusion. What should you do?",
        answer="Initiate chest compressions and assist ventilations with high flow O2",
    )
    flashcard40= Flashcard(
        topicId=1,
        userId=1,
        question="Your patient is an 8 year old girl who fell from a swing and hit her head. She has a pulse but is not breathing. Your ventilations should include what?",
        answer="Breaths at a rate of 12-20",
    )
    flashcard41= Flashcard(
        topicId=1,
        userId=7,
        question="The Pediatric Assessment Triangle is a visual assessment used to check the child's ____________, ____________, _____________.",
        answer="1. appearance 2. work of breathing 3. circulation to the skin before using a hands on assessment.",
    )
    flashcard42= Flashcard(
        topicId=1,
        userId=7,
        question="Very little of the epinephrine is dispensed from the auto injector during administration, approximately _____ % stays inside the auto injector.",
        answer="80-90% stays inside the auto injector, where as only 10-20% gets injected into the body.",
    )
    flashcard43= Flashcard(
        topicId=1,
        userId=6,
        question="The average tidal volume for an adult is _______ - _________mL",
        answer="500 mL - 600 mL.",
    )
    flashcard44= Flashcard(
        topicId=1,
        userId=4,
        question="As a person inhales, the diaphragm will?",
        answer="Contract and create a negative pressure drawing air into the lungs",
    )
    flashcard45= Flashcard(
        topicId=2,
        userId=2,
        question="Belly breathing is normal for ___________",
        answer="Infants and young children",
    )
    flashcard46= Flashcard(
        topicId=2,
        userId=6,
        question="An unresponsive 3-month-old female is in cardiac arrest. While you and your partner are resuscitating her, you should compress her chest:",
        answer="Using a two thumb - encircling hands technique",
    )
    flashcard47= Flashcard(
        topicId=2,
        userId=7,
        question="An 84-year-old male is lying in bed complaining of right-sided weakness and nausea. He has a history of hypertension and type 2 diabetes. He tells you he was fine when he went to bed last night. His vital signs are P 68, R 14, BP 142/82, and SpO2 is 95% on room air. His blood glucose level is 168 mg/dL. You should:",
        answer="notify the receiving hospital of your findings.",
    )
    flashcard48= Flashcard(
        topicId=2,
        userId=7,
        question="You are resuscitating an unresponsive 74-year-old female who is in cardiac arrest. While you are performing chest compressions, you see her take several breaths. You should:",
        answer="stop compressions and check for a pulse.",
    )
    flashcard49= Flashcard(
        topicId=2,
        userId=8,
        question="A 3-year-old male was in cardiac arrest. You successfully resuscitated him, but he remains unresponsive. His vital signs are P 124, R 22, BP 94/70, and SpO2 is 100% on oxygen by non-rebreather mask. You should:",
        answer="switch to a nasal cannula.",
    )
    flashcard50= Flashcard(
        topicId=2,
        userId=9,
        question="An unresponsive 2-year-old male is lying in his bed. His mother tells you that he has been sick for four days. You should next:",
        answer="assess his breathing and pulse.",
    )
    flashcard51= Flashcard(
        topicId=2,
        userId=2,
        question="An unresponsive 20-year-old male is taking occasional, gasping breaths. You are unable to palpate a carotid pulse. His skin is cyanotic, and his pupils are pinpoint. You should first:",
        answer="begin chest compressions",
    )
    flashcard52= Flashcard(
        topicId=2,
        userId=1,
        question="An unresponsive 94-year-old female was found by her family on the floor. She is apneic and pulseless. Your partner is performing chest compressions. The AED has analyzed her rhythm and advised that you shock the patient. After the AED has charged, you should next:",
        answer="ensure no one is touching her.",
    )
    flashcard53= Flashcard(
        topicId=2,
        userId=6,
        question="What is the primary cause of a cardiac arrest for a patient who is struck by lightning?:",
        answer="Asystole",
    )
    flashcard54= Flashcard(
        topicId=2,
        userId=5,
        question="An 81-year-old male is experiencing chest pain. He has no signs of dyspnea or shock. Why should you target oxygen administration to a SpO2 between 94%-99%?",
        answer="To reduce production of free-radicals",
    )
    flashcard55= Flashcard(
        topicId=2,
        userId=4,
        question="You are resuscitating a 45-year-old male who is in cardiac arrest. Your partners are performing chest compressions and operating the AED. You are ventilating him with a BVM and leading the team. When should you check for a pulse?",
        answer="After you observe he is breathing on his own",
    )
    flashcard56= Flashcard(
        topicId=2,
        userId=9,
        question="You are resuscitating an unresponsive 90-year-old male who is in cardiac arrest. After the AED analyzes his rhythm, it advises you to shock him. What cardiac rhythm should you suspect he is in?",
        answer="Ventricular fibrillation",
    )
    flashcard57= Flashcard(
        topicId=2,
        userId=1,
        question="An unresponsive 33-year-old female is found lying on the ground after a lightning storm. She is apneic, and you palpate a weak carotid pulse. You observe a fern-like burn pattern on her back. You should suspect she was:",
        answer="struck by lightning."
    )
    flashcard58= Flashcard(
        topicId=2,
        userId=6,
        question="A 56-year-old male complains of a sudden onset of difficulty breathing. He has a history of heart problems and high blood pressure. You auscultate fine crackles in the bases of his lungs. His vital signs are P98, R18, BP 154/88, and SpO2 is 95% on room air. You should suspect:",
        answer="pulmonary edema",
    )
    flashcard59= Flashcard(
        topicId=2,
        userId=3,
        question="An unresponsive 75-year-old female was struck by lightning. EMRs tell you she was apneic and pulseless, so they began CPR. They tell you they have been resuscitating her for five minutes. You should next:",
        answer="apply the AED while they continue compressions",
    )
    flashcard60= Flashcard(
        topicId=2,
        userId=5,
        question="An unresponsive 17-year-old female is taking occasional, gasping breaths. Her lips and tongue are cyanotic. You are unable to palpate a carotid pulse. You should suspect:",
        answer="opiod agonist use",
    )
    flashcard61= Flashcard(
        topicId=3,
        userId=4,
        question="Autonomy refers to:",
        answer="to the patient's right to refuse medical care. It also includes the patient's right to choose medical care. Despite having a life-threatening medical condition, you cannot force the patient to allow treatment or transport in this situation.",
    )
    flashcard62= Flashcard(
        topicId=3,
        userId=9,
        question="Red tags...",
        answer="are used to label those who cannot survive without immediate treatment but who have a chance of survival",
    )
    flashcard63= Flashcard(
        topicId=3,
        userId=1,
        question="Yellow tags...",
        answer="(observation) for those who require observation (and possible later re-triage). Their condition is stable for the moment and, they are not in immediate danger of death. These victims will still need hospital care and would be treated immediately under normal circumstances."
    )
    flashcard64= Flashcard(
        topicId=3,
        userId=7,
        question="Green tags",
        answer="(wait) are reserved for the \"walking wounded\" who will need medical care at some point, after more critical injuries have been treated.",
    )
    flashcard65= Flashcard(
        topicId=3,
        userId=1,
        question="Decontamination",
        answer="is an important process at any hazardous materials incident and should be performed prior to placing patients in emergency apparatus. It is A process that involves removing, preventing, or reducing the spread of hazardous materials",
    )
    flashcard66= Flashcard(
        topicId=3,
        userId=3,
        question="A disaster is an accident",
        answer="with 100 or more patients",
    )
    flashcard67= Flashcard(
        topicId=3,
        userId=3,
        question="Patients in cardiac arrest are an obsolute contraindication for:",
        answer="all types of aeromedical transport"
    )
    flashcard68= Flashcard(
        topicId=3,
        userId=10,
        question="Medically stable patients should use",
        answer="Ground Transport",
    )
    flashcard69= Flashcard(
        topicId=3,
        userId=9,
        question="A DNR or Do Not Resuscitate Order is another name for",
        answer="an advance directive",
    )
    flashcard70= Flashcard(
        topicId=3,
        userId=8,
        question="HEPA stands for:",
        answer="High Efficiency Particulate Air",
    )
    
    



    db.session.add(flashcard1)
    db.session.add(flashcard2)
    db.session.add(flashcard3)
    db.session.add(flashcard4)
    db.session.add(flashcard5)
    db.session.add(flashcard6)
    db.session.add(flashcard7)
    db.session.add(flashcard8)
    db.session.add(flashcard9)
    db.session.add(flashcard10)
    db.session.add(flashcard11)
    db.session.add(flashcard12)
    db.session.add(flashcard13)
    db.session.add(flashcard14)
    db.session.add(flashcard15)
    db.session.add(flashcard16)
    db.session.add(flashcard17)
    db.session.add(flashcard18)
    db.session.add(flashcard19)
    db.session.add(flashcard20)
    db.session.add(flashcard21)
    db.session.add(flashcard22)
    db.session.add(flashcard23)
    db.session.add(flashcard24)
    db.session.add(flashcard25)
    db.session.add(flashcard26)
    db.session.add(flashcard27)
    db.session.add(flashcard28)
    db.session.add(flashcard29)
    db.session.add(flashcard30)
    db.session.add(flashcard31)
    db.session.add(flashcard32)
    db.session.add(flashcard33)
    db.session.add(flashcard34)
    db.session.add(flashcard35)
    db.session.add(flashcard36)
    db.session.add(flashcard37)
    db.session.add(flashcard38)
    db.session.add(flashcard39)
    db.session.add(flashcard40)
    db.session.add(flashcard41)
    db.session.add(flashcard42)
    db.session.add(flashcard43)
    db.session.add(flashcard44)
    db.session.add(flashcard45)
    db.session.add(flashcard46)
    db.session.add(flashcard47)
    db.session.add(flashcard48)
    db.session.add(flashcard49)
    db.session.add(flashcard50)
    db.session.add(flashcard51)
    db.session.add(flashcard52)
    db.session.add(flashcard53)
    db.session.add(flashcard54)
    db.session.add(flashcard55)
    db.session.add(flashcard56)
    db.session.add(flashcard57)
    db.session.add(flashcard58)
    db.session.add(flashcard59)
    db.session.add(flashcard60)
    db.session.add(flashcard61)
    db.session.add(flashcard62)
    db.session.add(flashcard63)
    db.session.add(flashcard64)
    db.session.add(flashcard65)
    db.session.add(flashcard66)
    db.session.add(flashcard67)
    db.session.add(flashcard68)
    db.session.add(flashcard69)
    db.session.add(flashcard70)

    

    db.session.commit()


def undo_flashcards():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.flashcards RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM flashcards"))

    db.session.commit()
