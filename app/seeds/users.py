from app.models import db, User, environment, SCHEMA
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
def seed_users():
    demo = User(
        username='Demo', email='demo@aa.io', password='password')
    marnie = User(
        username='marnie', email='marnie@aa.io', password='password')
    bobbie = User(
        username='bobbie', email='bobbie@aa.io', password='password')
    tristan = User(
        username='tristan', email='tristan@aa.io', password='password')
    bernardo = User(
        username='bernardo', email='bernardo.io', password='password')
    elijah = User(
        username='elijah', email="elijah@aa.io", password='password')
    adam = User(
        username='adam', email="adam@aa.io", password='password')
    jason = User(
        username='jason', email='jason@aa.io', password='password')
    justin = User(
        username='justin', email='justin@aa.io', password='password')
    mary = User(
        username='mary', email='mary@aa.io', password='password')
    jennifer = User(
        username='jennifer', email='jennifer@aa.io', password='password')



    db.session.add(demo)
    db.session.add(marnie)
    db.session.add(bobbie)
    db.session.add(tristan)
    db.session.add(bernardo)
    db.session.add(elijah)
    db.session.add(adam)
    db.session.add(jason)
    db.session.add(justin)
    db.session.add(mary)
    db.session.add(adam)
    db.session.add(jennifer)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_users():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM users"))
        
    db.session.commit()