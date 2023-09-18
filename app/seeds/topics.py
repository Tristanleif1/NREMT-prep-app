from app.models import db, Topic, environment, SCHEMA
from sqlalchemy.sql import text

def seed_topics():
    topic1 = Topic(
        name="Airway, Respiration & Ventilation"
    )

    topic2 = Topic(
        name="Cardiology & Resuscitation"
    )

    topic3 = Topic(
        name="EMS Operations"
    )

    topic4 = Topic(
        name="Medical: Obstetrics & Gynecology"
    )

    topic5 = Topic(
        name="Trauma"
    )


    db.session.add(topic1)
    db.session.add(topic2)
    db.session.add(topic3)
    db.session.add(topic4)
    db.session.add(topic5)

    db.session.commit()


def undo_topics():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.topics RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM topics"))

    db.session.commit()
