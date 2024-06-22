from datetime import datetime
from app.models import db, Tag, environment, SCHEMA
from sqlalchemy.sql import text

def seed_tags():
      tag_data = [
        {"book_id": 1, "tag_name": "Male Lead"},
        {"book_id": 1, "tag_name": "Strategy"},
        {"book_id": 1, "tag_name": "Dystopia"},
        {"book_id": 2, "tag_name": "War and Military"},
        {"book_id": 2, "tag_name": "High Fantasy"},
        {"book_id": 2, "tag_name": "Strong Lead"},
        {"book_id": 3, "tag_name": "Magic"},
        {"book_id": 3, "tag_name": "Supernatural"},
        {"book_id": 3, "tag_name": "Multiple Lead Characters"},
        {"book_id": 4, "tag_name": "Progression"},
        {"book_id": 4, "tag_name": "Strong Lead"},
        {"book_id": 4, "tag_name": "Dystopia"},
        {"book_id": 5, "tag_name": "Female Lead"},
        {"book_id": 5, "tag_name": "Slice of Life"},
        {"book_id": 5, "tag_name": "Magic"},
        {"book_id": 6, "tag_name": "Male Lead"},
        {"book_id": 6, "tag_name": "Slice of Life"},
        {"book_id": 6, "tag_name": "Urban Fantasy"},
        {"book_id": 7, "tag_name": "Martial Arts"},
        {"book_id": 7, "tag_name": "Progression"},
        {"book_id": 7, "tag_name": "Male Lead"},
        {"book_id": 8, "tag_name": "Martial Arts"},
        {"book_id": 8, "tag_name": "Progression"},
        {"book_id": 8, "tag_name": "Male Lead"},
        {"book_id": 9, "tag_name": "Anti-Hero Lead"},
        {"book_id": 9, "tag_name": "Grimdark"},
        {"book_id": 9, "tag_name": "Dystopia"},
        {"book_id": 10, "tag_name": "Female Lead"},
        {"book_id": 10, "tag_name": "Magic"},
        {"book_id": 10, "tag_name": "Dystopia"},
        {"book_id": 11, "tag_name": "Female Lead"},
        {"book_id": 11, "tag_name": "Magic"},
        {"book_id": 11, "tag_name": "Supernatural"},
        {"book_id": 12, "tag_name": "Female Lead"},
        {"book_id": 12, "tag_name": "Magic"},
        {"book_id": 12, "tag_name": "Supernatural"},
        {"book_id": 13, "tag_name": "Female Lead"},
        {"book_id": 13, "tag_name": "Magic"},
        {"book_id": 13, "tag_name": "Supernatural"},
        {"book_id": 14, "tag_name": "High Fantasy"},
        {"book_id": 14, "tag_name": "Magic"},
        {"book_id": 14, "tag_name": "Mythos"},
        {"book_id": 15, "tag_name": "Female Lead"},
        {"book_id": 15, "tag_name": "War and Military"},
        {"book_id": 15, "tag_name": "Strategy"},
        {"book_id": 16, "tag_name": "Male Lead"},
        {"book_id": 16, "tag_name": "Magic"},
        {"book_id": 16, "tag_name": "Strategy"},
        {"book_id": 17, "tag_name": "Female Lead"},
        {"book_id": 17, "tag_name": "Magic"},
        {"book_id": 17, "tag_name": "Strategy"},
        {"book_id": 18, "tag_name": "Male Lead"},
        {"book_id": 18, "tag_name": "Dystopia"},
        {"book_id": 18, "tag_name": "Mythos"},
        {"book_id": 19, "tag_name": "Male Lead"},
        {"book_id": 19, "tag_name": "Supernatural"},
        {"book_id": 19, "tag_name": "Magic"},
        {"book_id": 20, "tag_name": "Male Lead"},
        {"book_id": 20, "tag_name": "Dystopia"},
        {"book_id": 20, "tag_name": "Magic"},
        ]
      for data in tag_data:
        tag = Tag(
            book_id=data["book_id"],
            tag_name=data["tag_name"]
        )
        db.session.add(tag)

      db.session.commit()

def undo_tags():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.tags RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM tags"))

    db.session.commit()
