from datetime import datetime, timezone
from flask import Blueprint, jsonify, request
from flask_login import current_user, login_required
from app.forms.review_form import ReviewForm
from app.models import User, Book, Chapter, Comment , Tag, Favorite, Review, db

review_routes = Blueprint('reviews', __name__)


# Get all reviews for a Book
@review_routes.route("/<int:bookId>/reviews")
def get_book_reviews(bookId):

    reviews = Review.query.filter_by(book_id=bookId).all()

    if not reviews:
        return jsonify({"errors":"Reviews not found"}), 404

    review_list = []

    for review in reviews:
        review_dict = review.to_dict()
        review_list.append(review_dict)

    return jsonify({"Reviews": review_list}), 200


# Post a Review for a Book
@review_routes.route("/<int:bookId>/reviews", methods=["POST"])
@login_required
def post_review(bookId):

    form = ReviewForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    user_id = current_user.id

    if form.validate_on_submit():
        review = Review(
            book_id=bookId,
            user_id=user_id,
            body=form.data["body"],
            star_rating=form.data["star_rating"],
            created_at=datetime.now(timezone.utc)
        )

        db.session.add(review)
        db.session.commit()
        return jsonify(review.to_dict()),200

    return jsonify({"errors":"Failed to post Review"}), 500

# Update Review by ID
@review_routes.route("/<int:bookId>/reviews/<int:reviewId>", methods=["PUT"])
@login_required
def update_review(bookId, reviewId):

    review_to_update = Review.query.get(reviewId)

    if not review_to_update:
        return jsonify({"errors":"Review not found"}), 404

    if not review_to_update.book_id==bookId:
        return jsonify({"errors":"Book/Review mismatch"}), 400

    form = ReviewForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        review_to_update.body = form.data["body"]
        review_to_update.star_rating = form.data["star_rating"]
        db.session.commit()

        return jsonify(review_to_update.to_dict()),200

    return jsonify({"errors":"Failed to update Review"}), 400


# Delete Review by ID
@review_routes.route("<int:bookId>/reviews/<int:reviewId>", methods=["DELETE"])
@login_required
def delete_review(bookId, reviewId):

    review_to_delete = Review.query.get(reviewId)

    if not review_to_delete:
        return jsonify({"errors":"Review not found"}), 404

    if not review_to_delete.user_id==current_user.id:
        return jsonify({"errors":"Unauthorized to delete"}), 401

    db.session.delete(review_to_delete)
    db.session.commit()

    return jsonify({"message":"Successfully deleted"}), 200
