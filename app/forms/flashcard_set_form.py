from flask_wtf import FlaskForm
from wtforms import StringField, TextAreaField, IntegerField, DateField, FileField, SelectField, validators
from wtforms.validators import DataRequired
from app.models import FlashcardSet

class FlashcardSetForm(FlaskForm):
    title = StringField('Title', nullable=False)