from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime, timezone

class Chapter(db.Model):
    __tablename__ = "chapters"

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    book_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('books.id')), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    title = db.Column(db.String(255), nullable=False)
    body = db.Column(db.String(20000), nullable=False)
    created_at = db.Column(db.DateTime, nullable=False, default=datetime.now(timezone.utc))

    user = db.relationship('User', back_populates='chapters')
    book = db.relationship('Book', back_populates='chapters')
    comments = db.relationship('Comment', back_populates='chapter', cascade='all, delete-orphan')


    def to_dict(self):
        return {
            "id": self.id,
            "book_id": self.book_id,
            "user_id":self.user_id,
            "book_title": self.book.title,
            "author_name": self.user.username,
            "title": self.title,
            "body": self.body,
            "created_at": self.created_at
        }
