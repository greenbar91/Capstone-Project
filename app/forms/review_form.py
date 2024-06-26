from flask_wtf import FlaskForm
from wtforms import IntegerField, TextAreaField
from wtforms.validators import DataRequired, ValidationError

def body_length_check(form, field):
    if len(field.data) >= 2000:
        raise ValidationError("Body must be less than 2000 characters.")

def rating_check(form, field):
    if field.data > 5 or field.data < 1:
        raise ValidationError("Rating must be between 1 and 5 stars")

class ReviewForm(FlaskForm):
    body = TextAreaField("body", validators=[DataRequired(), body_length_check])
    star_rating = IntegerField("star_rating", validators=[DataRequired(), rating_check])
