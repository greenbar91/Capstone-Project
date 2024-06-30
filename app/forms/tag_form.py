from flask_wtf import FlaskForm
from wtforms import FieldList, StringField
from wtforms.validators import DataRequired, ValidationError

class TagForm(FlaskForm):
    tags = StringField('tag_name', validators=[DataRequired()])
