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


# Get Recommended Books
@book_routes.route("/my_recommended")
@login_required
def get_recommended_books():
    my_favorites = Favorite.query.filter_by(user_id=current_user.id).all()

    favorite_tags = set()
    for favorite in my_favorites:
        favorite_book = Book.query.get(favorite.book_id)
        for tag in favorite_book.tags:
            favorite_tags.add(tag.tag_name)

    all_books = Book.query.all()

    if not all_books:
        return jsonify({"errors":"Books not found"}), 404

    recommendations = []
    for book in all_books:
        if book.id in [favorite.book_id for favorite in my_favorites]:
            continue
        matching_tags_count = sum(tag.tag_name in favorite_tags for tag in book.tags)
        if matching_tags_count > 0:
            recommendations.append((book.to_dict(), matching_tags_count))

    recommendations.sort(key=lambda x: x[1], reverse=True)

    top_recommendations = [book for book, _ in recommendations[:10]]

    if not top_recommendations:
        return jsonify({"errors":"No recommended Books found"}), 404

    return jsonify({"Books":top_recommendations}), 200


# Get Popular Books
@book_routes.route("/popular")
def get_popular_books():
    all_books = Book.query.all()

    if not all_books:
        return jsonify({"errors":"Books not found"}), 404

    sorted_books = sorted(all_books, key=lambda book: len(book.favorites), reverse=True)

    top_10_books = sorted_books[:10]

    top_books_dicts = [book.to_dict() for book in top_10_books]

    return jsonify({"Books":top_books_dicts}), 200


# Get heavily discussed Books
@book_routes.route("/heavily_discussed")
def get_discussed_books():
    books = Book.query.all()

    book_comment_counts = []

    for book in books:
        comment_count = 0
        for chapter in book.chapters:
            comment_count += len(chapter.comments)

        book_comment_counts.append((book, comment_count))


    book_comment_counts.sort(key=lambda x: x[1], reverse=True)

    top_books = book_comment_counts[:4]

    result = [
        {
            "id": book.id,
            "author_id": book.author_id,
            "author_name": book.user.username,
            "title": book.title,
            "blurb": book.blurb,
            "cover_art": book.cover_art,
            "created_at": book.created_at,
            "tags": [tag.to_dict() for tag in book.tags],
            "favorites": [favorite.to_dict() for favorite in book.favorites],
            "reviews": [review.to_dict() for review in book.reviews],
            "comment_count": count
        }
        for book, count in top_books
    ]

    return jsonify(result), 200
