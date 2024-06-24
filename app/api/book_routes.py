from datetime import datetime, timezone
from flask import Blueprint, jsonify, request
from flask_login import current_user, login_required
from app.forms.book_form import BookForm
from app.models import User, Book, Chapter, Comment , Tag, Favorite, Review, db

book_routes = Blueprint('books', __name__)


# Get all Books with associated tags, favorites and reviews
@book_routes.route('/')
def get_all_books():
    books = Book.query.all()

    if not books:
        return jsonify({"errors":"Books not found"}), 404

    book_list = []

    for book in books:
        book_dict = book.to_dict()
        book_list.append(book_dict)

    return jsonify({"Books": book_list}), 200


# Get Book details by id
@book_routes.route('/<int:bookId>')
def get_book_details_by_id(bookId):
    book_by_id = Book.query.get(bookId)

    if not book_by_id:
        return jsonify({"errors":"Book not found"}), 404

    return jsonify({"Book":book_by_id.to_dict()}), 200


# Get Books from current User
@book_routes.route("/my_books")
@login_required
def get_current_user_books():
    user_id = current_user.id
    user_books = Book.query.filter_by(author_id=user_id).all()

    if not user_books:
        return jsonify({"errors":"User has no books"}), 404

    user_book_list = []
    for book in user_books:
        book_dict = book.to_dict()
        user_book_list.append(book_dict)

    return jsonify({"Books":user_book_list}), 200

# Post Book
@book_routes.route("/", methods=["POST"])
@login_required
def post_book():

    form = BookForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    user_id = current_user.id

    if form.validate_on_submit():
        book = Book(
            author_id=user_id,
            title=form.data["title"],
            blurb=form.data["blurb"],
            cover_art=form.data["cover_art"],
            created_at=datetime.now(timezone.utc)
        )

        db.session.add(book)
        db.session.commit()
        return jsonify(book.to_dict()), 201


    return jsonify({"errors":"Failed to post Book"}), 500


# Edit Book by ID
@book_routes.route("/<int:bookId>", methods=["PUT"])
@login_required
def update_book(bookId):

    form = BookForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        book_to_update = Book.query.get(bookId)

        book_to_update.title = form.data["title"]
        book_to_update.blurb = form.data["blurb"]
        book_to_update.cover_art = form.data["cover_art"]
        db.session.commit()

        return jsonify(book_to_update.to_dict()), 200

    return jsonify({"errors":"Failed to update Book"}), 400

# Delete Book by ID
@book_routes.route("/<int:bookId>", methods=["DELETE"])
@login_required
def delete_book(bookId):

    book_to_delete = Book.query.get(bookId)

    if not book_to_delete:
        return jsonify({"errors":"Book not found"}), 404

    if not book_to_delete.author_id==current_user.id:
        return jsonify({"errors":"Unauthorized to delete"}), 401

    db.session.delete(book_to_delete)
    db.session.commit()

    return jsonify({"message":"Successfully deleted"}), 200
