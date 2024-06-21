from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime, timezone

class Comment(db.Model):
    __tablename__ = "comments"

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    chapter_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('chapters.id')), nullable=False)
    body = db.Column(db.String(2000), nullable=False)
    created_at = db.Column(db.DateTime, nullable=False, default=datetime.now(timezone.utc))

    user = db.relationship('User', back_populates='comments')
    chapter = db.relationship("Chapter", back_populates="comments")

    def to_dict(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "username": self.user.username,
            "profile_pic": self.user.profile_pic,
            "chapter_id": self.chapter_id,
            "body": self.body,
            "created_at": self.created_at
        }
