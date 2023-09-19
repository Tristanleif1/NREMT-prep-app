from flask_wtf import FlaskForm
from wtforms import StringField, TextAreaField, IntegerField, DateField, FileField, SelectField, validators
from wtforms.validators import DataRequired
from app.models import Flashcard, Topic


class FlashcardForm(FlaskForm):
    topicId = SelectField('Topic', [validators.DataRequired()], choices=[(1, "Airway, Respiration & Ventilation"), (2, "Cardiology & Resuscitaton"), (3, "EMS Operations"), (4, "Medical: Obstetrics & Gynecology"), (5, "Trauma")])
    question = StringField('Question', [validators.DataRequired()])
    answer = StringField('Answer', [validators.DataRequired()])


    