from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime, timezone

class Review(db.Model):
    __tablename__ = "reviews"

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    book_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('books.id')), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    body = db.Column(db.String(2000), nullable=False)
    star_rating = db.Column(db.Integer, nullable=False)
    created_at = db.Column(db.DateTime, nullable=False, default=datetime.now(timezone.utc))

    user = db.relationship('User', back_populates='reviews')
    book = db.relationship("Book", back_populates='reviews')

    def to_dict(self):
        return {
            "id":self.id,
            "book_id": self.book_id,
            "user_id": self.user_id,
            "username": self.user.username,
            "profile_pic": self.user.profile_pic,
            "book_title": self.book.title,
            "star_rating": self.star_rating,
            "created_at": self.created_at
        }
