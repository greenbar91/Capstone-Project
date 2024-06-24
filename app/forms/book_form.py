from flask_wtf import FlaskForm
from wtforms import StringField, TextAreaField
from wtforms.validators import DataRequired, ValidationError

def image_url(form, field):
    if not (field.data.endswith('.png') or field.data.endswith('.jpg') or field.data.endswith('.jpeg')):
        raise ValidationError('Cover art must be a URL ending with .png, .jpg, or .jpeg')

def title_length_check(form, field):
    if len(field.data) >= 255:
        raise ValidationError("Title must be less than 255 characters.")

def blurb_length_check(form, field):
    if len(field.data) >= 4000:
        raise ValidationError("Blurb must be less than 20,000 characters.")

class BookForm(FlaskForm):
    title = StringField("title", validators=[DataRequired(), title_length_check])
    blurb = TextAreaField("blurb", validators=[DataRequired(), blurb_length_check])
    cover_art = StringField("cover_art", validators=[DataRequired(), image_url])
