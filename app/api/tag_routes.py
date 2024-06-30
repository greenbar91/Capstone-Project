from datetime import datetime, timezone
from flask import Blueprint, jsonify, request
from flask_login import current_user, login_required
from app.forms.tag_form import TagForm
from app.models import User, Book, Chapter, Comment , Tag, Favorite, Review, db

tag_routes = Blueprint('tags', __name__)

# Post Tag to a Book
@tag_routes.route("/<int:bookId>", methods=["POST"])
@login_required
def post_tag(bookId):
    book = Book.query.get(bookId)

    if not book:
        return jsonify({"errors":"Book not found"}),404

    if not book.author_id==current_user.id:
        return jsonify({"errors":"Unauthorized to post"}), 401

    form = TagForm()
    form['csrf_token'].data = request.cookies['csrf_token']


    if form.validate_on_submit():
        new_tag = Tag(
            book_id=bookId,
            tag_name=form.data["tag_name"]
        )
        db.session.add(new_tag)
        db.session.commit()
        return jsonify(new_tag.to_dict()),200

    return jsonify({"errors":"Failed to post Tag"}), 500


# Delete Tag from a Book
@tag_routes.route("/<int:bookId>/tags/<int:tagId>", methods=["DELETE"])
@login_required
def delete_tag(bookId, tagId):
    book = Book.query.get(bookId)

    if not book:
        return jsonify({"errors":"Book not found"}),404

    if not book.author_id==current_user.id:
        return jsonify({"errors":"Unauthorized to delete"}), 401

    tag_to_delete = Tag.query.get(tagId)

    if not tag_to_delete:
        return jsonify({"errors":"Tag not found"}),404

    db.session.delete(tag_to_delete)
    db.session.commit()
    return jsonify({"message":"Successfully deleted"}), 200
