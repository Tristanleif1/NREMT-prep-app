from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import Column, Integer, String, DateTime, func
from .db import db, environment, SCHEMA, add_prefix_for_prod

class Question(db.Model):
    __tablename__ = 'questions'
    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True, autoincrement=True, nullable=False)
    quizId = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('quizzes.id')), nullable=False)
    question = db.Column(db.String, nullable=False)
    option1 = db.Column(db.String, nullable=False)
    option2 = db.Column(db.String, nullable=False)
    option3 = db.Column(db.String, nullable=False)
    option4 = db.Column(db.String, nullable=False)
    correct_answer = db.Column(db.String, nullable=False)
    created_at = db.Column(db.DateTime, nullable=False, default=func.now())
    updated_at = db.Column(db.DateTime, nullable=False, default=func.now(), onupdate=func.now())

    quiz = db.relationship('Quiz', back_populates='questions')

    def to_dict(self):
        return {
            'id': self.id,
            'quizId': self.quizId,
            'question': self.question,
            'option1': self.option1,
            'option2': self.option2,
            'option3': self.option3,
            'option4': self.option4,
            'correct_answer': self.correct_answer
        }