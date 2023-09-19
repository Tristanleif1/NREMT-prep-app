from app.models import db, Quiz, environment, SCHEMA
from sqlalchemy.sql import text

def seed_quizzes():
    quiz1 = Quiz(
        userId=1,
        title="NREMT Practice Quiz #1"
    )
    quiz2 = Quiz(
        userId=2,
        title="NREMT Practice Quiz #2"
    )

    db.session.add(quiz1)
    db.session.add(quiz2)
    db.session.commit()


def undo_quizzes():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.quizzes RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM quizzes"))
        
    db.session.commit()