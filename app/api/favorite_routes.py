from datetime import datetime, timezone
from flask import Blueprint, jsonify, request
from flask_login import current_user, login_required
from app.models import User, Book, Chapter, Comment , Tag, Favorite, Review, db

favorite_routes = Blueprint("favorites", __name__)

# Get current user Favorites
@favorite_routes.route("/my_favorites")
@login_required
def get_my_favorites():
    my_favorites = Favorite.query.filter_by(user_id=current_user.id).all()


    favorite_list = []

    for favorite in my_favorites:
        favorite_book = Book.query.get(favorite.book_id)
        favorite_list.append(favorite_book.to_dict())

    return jsonify({"Favorites":favorite_list}), 200


# Favorite a Book
@favorite_routes.route("/<int:bookId>", methods=["POST"])
@login_required
def post_favorite(bookId):

    existing_favorite = Favorite.query.filter_by(user_id=current_user.id, book_id=bookId).first()

    if existing_favorite:
        return jsonify({"errors":"You cannot favorite a Book more than once"}), 400

    favorite = Favorite(
        user_id=current_user.id,
        book_id=bookId
    )

    db.session.add(favorite)
    db.session.commit()
    return jsonify(favorite.to_dict()), 200

# Un-Favorite a Book
@favorite_routes.route("/<int:bookId>", methods=["DELETE"])
@login_required
def delete_favorite(bookId):

    favorite_to_delete = Favorite.query.filter_by(user_id=current_user.id, book_id=bookId).first()

    if not favorite_to_delete:
        return jsonify({"errors":"Favorite not found"}), 404

    db.session.delete(favorite_to_delete)
    db.session.commit()

    return jsonify("Successfully Deleted"), 200

# Get top 5 most favored Books
@favorite_routes.route("/most_favored")
def most_favored():
    books = Book.query.all()
    book_favorite_counts = []

    for book in books:
        favorite_count = Favorite.query.filter_by(book_id=book.id).count()
        book_favorite_counts.append((book, favorite_count))

    sorted_books = sorted(book_favorite_counts, key=lambda x: x[1], reverse=True)

    top_favorites = sorted_books[:5]

    top_favorite_books = [
        {"Book": book.to_dict(), "Favorite_count": favorite_count}
        for book, favorite_count in top_favorites
    ]

    return jsonify(top_favorite_books), 200
