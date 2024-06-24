from flask_wtf import FlaskForm
from wtforms import StringField, TextAreaField
from wtforms.validators import DataRequired, ValidationError

def image_url(form, field):
    if not (field.data.endswith('.png') or field.data.endswith('.jpg') or field.data.endswith('.jpeg')):
        raise ValidationError('Cover art must be a URL ending with .png, .jpg, or .jpeg')


class BookForm(FlaskForm):
    title = StringField("title", validators=[DataRequired()])
    blurb = TextAreaField("blurb", validators=[DataRequired()])
    cover_art = StringField("cover_art", validators=[DataRequired(), image_url])
