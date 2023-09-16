from .db import db, environment, SCHEMA, add_prefix_for_prod

if environment == "production":
    quiz_topics = db.Table('quiz_topics',
        db.Column('quizId', db.Integer, db.ForeignKey(add_prefix_for_prod('quizzes.id')), primary_key=True),
        db.Column('topicId', db.Integer, db.ForeignKey(add_prefix_for_prod('topics.id')), primary_key=True),
        schema=SCHEMA
    )
else:
    quiz_topics = db.Table('quiz_topics',
        db.Column('quizId', db.Integer, db.ForeignKey(add_prefix_for_prod('quizzes.id')), primary_key=True),
        db.Column('topicId', db.Integer, db.ForeignKey(add_prefix_for_prod('topics.id')), primary_key=True)
    )