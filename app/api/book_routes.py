from flask import Blueprint, jsonify
from flask_login import login_required
from app.models import User, Book, Chapter, Comment , Tag, Favorite, Review

book_routes = Blueprint('books', __name__)
