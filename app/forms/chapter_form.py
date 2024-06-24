from flask_wtf import FlaskForm
from wtforms import StringField, TextAreaField
from wtforms.validators import DataRequired, ValidationError

def title_length_check(form, field):
    if len(field.data) >= 255:
        raise ValidationError("Title must be less than 255 characters.")

def body_length_check(form, field):
    if len(field.data) >= 20000:
        raise ValidationError("Body must be less than 20,000 characters.")

class ChapterForm(FlaskForm):

    title = StringField("title", validators=[DataRequired(), title_length_check])
    body = TextAreaField("blurb", validators=[DataRequired(), body_length_check])
