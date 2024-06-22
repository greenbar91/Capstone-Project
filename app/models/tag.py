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


# Anti-Hero Lead
# Dungeon
# Dystopia
# Female Lead
# GameLit
# Genetically Engineered
# Grimdark
# High Fantasy
# LitRPG
# Low Fantasy
# Magic
# Male Lead
# Martial Arts
# Multiple Lead Characters
# Mythos
# Non-Human Lead
# Progression
# Reincarnation
# Secret Identity
# Slice of Life
# Strategy
# Strong Lead
# Supernatural
# Time Loop
# Time Travel
# Urban Fantasy
# Villainous Lead
# War and Military
# Wuxia
# Xianxia
