from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import Column, Integer, String, DateTime, func
from .db import db, environment, SCHEMA, add_prefix_for_prod
from .quiz_topic import quiz_topics

class Quiz(db.Model):
    __tablename__ = 'quizzes'
    if environment == "production":
        __table_args__ = {'schema': SCHEMA}


    id = db.Column(db.Integer, primary_key=True, autoincrement=True, nullable=False)
    userId = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    title = db.Column(db.String, nullable=False)
    created_at = db.Column(db.DateTime, nullable=False, default=func.now())
    updated_at = db.Column(db.DateTime, nullable=False, default=func.now(), onupdate=func.now())

    #External-model relationships(Foreign-keys)
    user = db.relationship('User', back_populates='quiz')
    #Internal-model relations(Primary-key)
    topics = db.relationship('Topic', secondary=quiz_topics, back_populates='quizzes')
    question = db.relationship('Question', back_populates='quiz')

    def to_dict(self):
        return {
            'id': self.id,
            'title': self.title
        }