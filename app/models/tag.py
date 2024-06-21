from .db import db, environment, SCHEMA, add_prefix_for_prod

class Tag(db.Model):
    __tablename__ = "tags"

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    book_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('books.id')), nullable=False)
    tag_name = db.Column(db.String(255), nullable=False)

    book = db.relationship('Book', back_populates='tags')

    def to_dict(self):
        return {
            "id": self.id,
            "book_id": self.book_id,
            "book_title": self.book.title,
            "tag_name": self.tag_name
        }
