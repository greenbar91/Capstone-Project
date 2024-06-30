from datetime import datetime, timezone
from flask import Blueprint, jsonify, request
from flask_login import current_user, login_required
from app.forms.tag_form import TagForm
from app.models import User, Book, Chapter, Comment , Tag, Favorite, Review, db

tag_routes = Blueprint('tags', __name__)


# Get a Book's Tags
@tag_routes.route("/<int:bookId>")
def get_book_tags(bookId):
    book = Book.query.get(bookId)

    if not book:
        return jsonify({"errors": "Book not found"}), 404

    tags = Tag.query.filter_by(book_id=bookId).all()
    return jsonify({"Tags": [tag.to_dict() for tag in tags]}), 200


@tag_routes.route("/<int:bookId>", methods=["POST"])
@login_required
def post_tags(bookId):
    book = Book.query.get(bookId)

    if not book:
        return jsonify({"errors": "Book not found"}), 404

    if book.author_id != current_user.id:
        return jsonify({"errors": "Unauthorized to post"}), 401

    data = request.get_json()
    tags = data['tags']

    new_tags = [Tag(book_id=bookId, tag_name=tag) for tag in tags]

    db.session.bulk_save_objects(new_tags)
    db.session.commit()

    return jsonify([tag.to_dict() for tag in new_tags]), 200


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
