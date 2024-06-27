from flask_wtf import FlaskForm
from wtforms import TextAreaField
from wtforms.validators import DataRequired, ValidationError

def body_length_check(form, field):
    if len(field.data) >= 2000:
        raise ValidationError("Body must be less than 2000 characters.")

class CommentForm(FlaskForm):
    body = TextAreaField("body", validators=[DataRequired(), body_length_check])
