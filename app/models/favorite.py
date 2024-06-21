from .db import db, environment, SCHEMA, add_prefix_for_prod


class Favorite(db.Model):
    __tablename__ = 'favorites'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), primary_key=True, nullable=False)
    book_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('books.id')), primary_key=True, nullable=False)

    user = db.relationship('User', back_populates='favorites')
    book = db.relationship('Book', back_populates='favorites')

    def to_dict(self):
        return {
            "user_id": self.user_id,
            "book_id": self.book_id
        }
