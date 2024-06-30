from datetime import datetime, timezone
from flask import Blueprint, jsonify, request
from flask_login import current_user, login_required
from app.forms.tag_form import TagForm
from app.models import User, Book, Chapter, Comment , Tag, Favorite, Review, db

tag_routes = Blueprint('tags', __name__)

# Post Tag to a Book
@tag_routes.route("/<int:bookId>")
@login_required
def post_tag(bookId):
    book = Book.query.get(bookId)

    if not book:
        return jsonify({"errors":"Book not found"}),404

    form = TagForm()
    form['csrf_token'].data = request.cookies['csrf_token']


    if form.validate_on_submit():
        new_tag = Tag(
            book_id=bookId,
            tag_name=form.data["tag_name"]
        )
        db.session.add(new_tag)
        db.session.commit()
        return jsonify(new_tag.to_dict),200

    return jsonify({"errors":"Failed to post Tag"}), 500
