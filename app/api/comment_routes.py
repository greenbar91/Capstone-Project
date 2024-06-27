from datetime import datetime, timezone
from flask import Blueprint, jsonify, request
from flask_login import current_user, login_required
from app.forms.comment_form import CommentForm
from app.models import User, Book, Chapter, Comment , Tag, Favorite, Review, db

comment_routes = Blueprint('comments', __name__)

# Get all Comments for a Chapter by Id
@comment_routes.route("/<int:chapterId>/comments")
def get_chapter_comments(chapterId):
    comments = Comment.query.filter_by(chapter_id=chapterId).all()

    if not comments:
        return jsonify({"errors":"Comments not found"}), 404

    comment_list = []

    for comment in comments:
        comment_dict = comment.to_dict()
        comment_list.append(comment_dict)

    return jsonify({"Comments": comment_list}), 200


# Post a Comment for a Chapter
@comment_routes.route("/<int:chapterId>/comments", methods=["POST"])
@login_required
def post_comment(chapterId):
    form = CommentForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    user_id = current_user.id

    if form.validate_on_submit():
        comment = Comment(
            user_id=user_id,
            chapter_id=chapterId,
            body=form.data["body"],
            created_at=datetime.now(timezone.utc)
        )
        db.session.add(comment)
        db.session.commit()
        return jsonify(comment.to_dict()),200

    return jsonify({"errors":"Failed to post Comment"}), 500


# Update Comment by Id
@comment_routes.route("/<int:chapterId>/comments/<int:commentId>", methods=["PUT"])
@login_required
def update_comment(chapterId, commentId):

    comment_to_update = Comment.query.get(commentId)

    if not comment_to_update:
        return jsonify({"errors":"Comment not found"}), 404

    if not comment_to_update.chapter_id==chapterId:
        return jsonify({"errors":"Chapter/Comment mismatch"}), 400

    form = CommentForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        comment_to_update.body = form.data["body"]
        db.session.commit()

        return jsonify(comment_to_update.to_dict()), 200

    return jsonify({"errors":"Failed to update Comment"}), 400


# Delete Comment by Id
@comment_routes.route("/<int:chapterId>/comments/<int:commentId>", methods=["DELETE"])
@login_required
def delete_comment(chapterId, commentId):

    comment_to_delete=Comment.query.get(commentId)

    if not comment_to_delete:
        return jsonify({"errors":"Comment not found"}), 404

    if not comment_to_delete.user_id==current_user.id:
        return jsonify({"errors":"Unauthorized to delete"}), 401

    db.session.delete(comment_to_delete)
    db.session.commit()
