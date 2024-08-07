from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime, timezone

class Book(db.Model):
    __tablename__ = "books"

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    author_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    title = db.Column(db.String(255), nullable=False)
    blurb = db.Column(db.String(4000), nullable=False)
    cover_art = db.Column(db.String(255), nullable=False)
    created_at = db.Column(db.DateTime, nullable=False, default=datetime.now(timezone.utc))

    user = db.relationship('User', back_populates='books')
    chapters = db.relationship('Chapter', back_populates='book', cascade='all, delete-orphan')
    reviews = db.relationship('Review', back_populates='book', cascade='all, delete-orphan')
    tags = db.relationship('Tag', back_populates='book', cascade='all, delete-orphan')
    favorites = db.relationship('Favorite', back_populates='book', cascade='all, delete-orphan')
    # https://imgur.com/a/WCaZRtz

    def to_dict(self):
        return {
            "id": self.id,
            "author_id": self.author_id,
            "author_name": self.user.username,
            "title": self.title,
            "blurb": self.blurb,
            "cover_art": self.cover_art,
            "created_at": self.created_at,
            "tags": [tag.to_dict() for tag in self.tags],
            "favorites": [favorite.to_dict() for favorite in self.favorites],
            "reviews": [review.to_dict() for review in self.reviews],
            "chapter_ids": [chapter.id for chapter in self.chapters],
            "chapter_count": len(self.chapters)
        }
