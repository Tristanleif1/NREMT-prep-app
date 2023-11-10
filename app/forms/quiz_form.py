from flask_wtf import FlaskForm
from wtforms import StringField, TextAreaField, IntegerField, DateField, FileField, SelectField, validators
from wtforms.validators import DataRequired
from app.models import Quiz

class QuizForm(FlaskForm):
    title = StringField('Title', [validators.DataRequired()])