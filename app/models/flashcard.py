from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import Column, Integer, String, DateTime, func
from .db import db, environment, SCHEMA, add_prefix_for_prod

class Flashcard(db.Model):
    __tablename__ = 'flashcards'
    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True, autoincrement=True, nullable=False)
    topicId = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('topics.id')), nullable=False)
    userId = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    flashcardSetId = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('flashcard_sets.id')), nullable=True)
    question = db.Column(db.String, nullable=False)
    answer = db.Column(db.String, nullable=False)

    user = db.relationship('User', back_populates='flashcard')
    topic = db.relationship('Topic', back_populates='flashcard')
    flashcardSet = db.relationship('FlashcardSet', back_populates='flashcard')