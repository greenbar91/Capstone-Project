
from app.models import db, Favorite, environment, SCHEMA
from sqlalchemy.sql import text

def seed_favorites():
      favorite_data = [
        {"user_id": 1, "book_id": 1},
        {"user_id": 3, "book_id": 1},
        {"user_id": 4, "book_id": 1},
        {"user_id": 5, "book_id": 1},
        {"user_id": 7, "book_id": 1},
        {"user_id": 1, "book_id": 2},
        {"user_id": 2, "book_id": 2},
        {"user_id": 4, "book_id": 2},
        {"user_id": 6, "book_id": 2},
        {"user_id": 7, "book_id": 2},
        {"user_id": 8, "book_id": 2},
        {"user_id": 1, "book_id": 3},
        {"user_id": 2, "book_id": 3},
        {"user_id": 5, "book_id": 3},
        {"user_id": 6, "book_id": 3},
        {"user_id": 7, "book_id": 3},
        {"user_id": 9, "book_id": 3},
        {"user_id": 1, "book_id": 4},
        {"user_id": 3, "book_id": 4},
        {"user_id": 4, "book_id": 4},
        {"user_id": 6, "book_id": 4},
        {"user_id": 7, "book_id": 4},
        {"user_id": 8, "book_id": 4},
        {"user_id": 9, "book_id": 4},
        {"user_id": 2, "book_id": 5},
        {"user_id": 3, "book_id": 5},
        {"user_id": 4, "book_id": 5},
        {"user_id": 5, "book_id": 5},
        {"user_id": 6, "book_id": 5},
        {"user_id": 7, "book_id": 5},
        {"user_id": 8, "book_id": 5},
        {"user_id": 9, "book_id": 5},
        {"user_id": 10, "book_id": 5},
        {"user_id": 1, "book_id": 6},
        {"user_id": 4, "book_id": 6},
        {"user_id": 5, "book_id": 6},
        {"user_id": 6, "book_id": 6},
        {"user_id": 7, "book_id": 6},
        {"user_id": 8, "book_id": 6},
        {"user_id": 9, "book_id": 6},
        {"user_id": 2, "book_id": 7},
        {"user_id": 3, "book_id": 7},
        {"user_id": 5, "book_id": 7},
        {"user_id": 6, "book_id": 7},
        {"user_id": 7, "book_id": 7},
        {"user_id": 8, "book_id": 7},
        {"user_id": 9, "book_id": 7},
        {"user_id": 10, "book_id": 7},
        {"user_id": 2, "book_id": 8},
        {"user_id": 4, "book_id": 8},
        {"user_id": 5, "book_id": 8},
        {"user_id": 6, "book_id": 8},
        {"user_id": 7, "book_id": 8},
        {"user_id": 9, "book_id": 8},
        {"user_id": 1, "book_id": 9},
        {"user_id": 2, "book_id": 9},
        {"user_id": 4, "book_id": 9},
        {"user_id": 6, "book_id": 9},
        {"user_id": 7, "book_id": 9},
        {"user_id": 8, "book_id": 9},
        {"user_id": 10, "book_id": 9},
        {"user_id": 2, "book_id": 10},
        {"user_id": 4, "book_id": 10},
        {"user_id": 6, "book_id": 10},
        {"user_id": 8, "book_id": 10},
        {"user_id": 9, "book_id": 10},
        {"user_id": 1, "book_id": 11},
        {"user_id": 2, "book_id": 11},
        {"user_id": 3, "book_id": 11},
        {"user_id": 4, "book_id": 11},
        {"user_id": 10, "book_id": 11},
        {"user_id": 1, "book_id": 12},
        {"user_id": 2, "book_id": 12},
        {"user_id": 3, "book_id": 12},
        {"user_id": 7, "book_id": 12},
        {"user_id": 8, "book_id": 12},
        {"user_id": 9, "book_id": 12},
        {"user_id": 10, "book_id": 12},
        {"user_id": 1, "book_id": 13},
        {"user_id": 3, "book_id": 13},
        {"user_id": 4, "book_id": 13},
        {"user_id": 5, "book_id": 13},
        {"user_id": 8, "book_id": 13},
        {"user_id": 9, "book_id": 13},
        {"user_id": 1, "book_id": 14},
        {"user_id": 2, "book_id": 14},
        {"user_id": 4, "book_id": 14},
        {"user_id": 5, "book_id": 14},
        {"user_id": 7, "book_id": 14},
        {"user_id": 8, "book_id": 14},
        {"user_id": 9, "book_id": 14},
        {"user_id": 10, "book_id": 14},
        {"user_id": 2, "book_id": 15},
        {"user_id": 3, "book_id": 15},
        {"user_id": 4, "book_id": 15},
        {"user_id": 5, "book_id": 15},
        {"user_id": 7, "book_id": 15},
        {"user_id": 8, "book_id": 15},
        {"user_id": 9, "book_id": 15},
        {"user_id": 10, "book_id": 15},
        {"user_id": 1, "book_id": 16},
        {"user_id": 2, "book_id": 16},
        {"user_id": 4, "book_id": 16},
        {"user_id": 5, "book_id": 16},
        {"user_id": 7, "book_id": 16},
        {"user_id": 8, "book_id": 16},
        {"user_id": 9, "book_id": 16},
        {"user_id": 10, "book_id": 16},
        {"user_id": 2, "book_id": 17},
        {"user_id": 3, "book_id": 17},
        {"user_id": 1, "book_id": 18},
        {"user_id": 2, "book_id": 18},
        {"user_id": 5, "book_id": 18},
        {"user_id": 6, "book_id": 18},
        {"user_id": 7, "book_id": 18},
        {"user_id": 8, "book_id": 18},
        {"user_id": 9, "book_id": 18},
        {"user_id": 10, "book_id": 18},
        {"user_id": 1, "book_id": 19},
        {"user_id": 2, "book_id": 19},
        {"user_id": 3, "book_id": 19},
        {"user_id": 4, "book_id": 19},
        {"user_id": 5, "book_id": 19},
        {"user_id": 6, "book_id": 19},
        {"user_id": 7, "book_id": 19},
        {"user_id": 8, "book_id": 19},
        {"user_id": 9, "book_id": 19},
        {"user_id": 1, "book_id": 20},
        {"user_id": 2, "book_id": 20},
        {"user_id": 3, "book_id": 20},
        {"user_id": 4, "book_id": 20},
        {"user_id": 5, "book_id": 20},
        {"user_id": 6, "book_id": 20},
        {"user_id": 7, "book_id": 20},
        {"user_id": 8, "book_id": 20},
        {"user_id": 9, "book_id": 20},
        {"user_id": 10, "book_id": 20},
    ]



      for data in favorite_data:
        favorite = Favorite(
            user_id=data["user_id"],
            book_id=data["book_id"],
        )
        db.session.add(favorite)

      db.session.commit()


def undo_favorites():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.favorites RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM favorites"))

    db.session.commit()
