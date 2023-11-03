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
    

    db.session.commit()


def undo_flashcards():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.flashcards RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM flashcards"))

    db.session.commit()
