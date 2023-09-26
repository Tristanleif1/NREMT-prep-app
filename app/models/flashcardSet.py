from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import Column, Integer, String, DateTime, func
from .db import db, environment, SCHEMA, add_prefix_for_prod

class FlashcardSet(db.Model):
    __tablename__ = 'flashcard_sets'
    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True, autoincrement=True, nullable=False)
    userId = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    title = db.Column(db.String, nullable=False)
    created_at = db.Column(db.DateTime, nullable=False, default=func.now())
    updated_at = db.Column(db.DateTime, nullable=False, default=func.now(), onupdate=func.now())
    
    flashcard = db.relationship('Flashcard', back_populates='flashcardSet', cascade="all, delete-orphan")

    # External-model relationships(Foreign-keys)
    user = db.relationship('User', back_populates='flashcardSet')

    def to_dict(self):
        return {
            'id': self.id,
            'title': self.title,
            'userId': self.userId
        }

