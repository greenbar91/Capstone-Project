from datetime import datetime, timezone
from flask import Blueprint, jsonify, request
from flask_login import current_user, login_required
from app.forms.book_form import BookForm
from app.forms.chapter_form import ChapterForm
from app.models import User, Book, Chapter, Comment , Tag, Favorite, Review, db

chapter_routes = Blueprint('chapters', __name__)

# Get chapters by Book Id
@chapter_routes.route("/<int:bookId>/chapters")
# @login_required
def get_chapters_by_book_id(bookId):

    book = Book.query.get(bookId)

    if not book:
        return jsonify({"errors":"Book not found"}),404

    chapters = Chapter.query.filter_by(book_id=bookId).all()

    if not chapters:
        return jsonify({"errors":"Chapters not found"}),404

    chapter_list = []

    for chapter in chapters:
        chapter_dict = chapter.to_dict()
        chapter_list.append(chapter_dict)

    return jsonify({"Chapters": chapter_list}),200

# Post a chapter by Book Id
@chapter_routes.route("/<int:bookId>/chapters", methods=["POST"])
@login_required
def post_chapter(bookId):
    form = ChapterForm()

    form['csrf_token'].data = request.cookies['csrf_token']
    current_user_id = current_user.id

    if form.validate_on_submit():
        chapter = Chapter(
            book_id=bookId,
            user_id=current_user_id,
            title=form.data["title"],
            body=form.data["body"],
            created_at=datetime.now(timezone.utc)
        )
        db.session.add(chapter)
        db.session.commit()
        return jsonify(chapter.to_dict()),201

# Update a chapter by chapter Id
@chapter_routes.route("/<int:bookId>/chapters/<int:chapterId>", methods=["PUT"])
@login_required
def update_chapter(bookId, chapterId):


    form = ChapterForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        chapter_to_update = Chapter.query.get(chapterId)


        if not chapter_to_update.book_id==bookId:
            return jsonify({"errors":"Book/Chapter mismatch"})

        chapter_to_update.title = form.data["title"]
        chapter_to_update.body = form.data["body"]
        db.session.commit()

        return jsonify(chapter_to_update.to_dict()),200

    return jsonify({"errors":"Failed to update Chapter"}), 400

# Delete a chapter by chapter Id
@chapter_routes.route("/<int:bookId>/chapters/<int:chapterId>", methods=["DELETE"])
@login_required
def delete_chapter(bookId, chapterId):

    chapter_to_delete = Chapter.query.get(chapterId)

    if not chapter_to_delete:
        return jsonify({"errors":"Chapter not found"}), 404

    if not chapter_to_delete.user_id==current_user.id:
        return jsonify({"errors":"Unauthorized to delete"}), 401

    if not chapter_to_delete.book_id==bookId:
        return jsonify({"errors":"Book/Chapter mismatch"}), 400

    db.session.delete(chapter_to_delete)
    db.session.commit()

    return jsonify({"message":"Successfully deleted"}), 200
