from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, ValidationError

class TagForm(FlaskForm):
    tag_name = StringField('tag_name', validators=[DataRequired()])
