from datetime import datetime
from app.models import db, Review, environment, SCHEMA
from sqlalchemy.sql import text

def seed_reviews():
   review_data = [
    {
        "book_id": 1,
        "user_id": 2,
        "body": "This book started off a bit slow but really picked up towards the middle. The characters are well-developed, and the plot twists kept me hooked. Definitely worth the read!",
        "star_rating": 4,
        "created_at": "2020-06-23T10:00:00Z"
    },
    {
        "book_id": 1,
        "user_id": 3,
        "body": "I loved the intricate details and the depth of the story. The author's writing style is captivating. Can't wait for the next installment!",
        "star_rating": 5,
        "created_at": "2020-06-24T14:30:00Z"
    },
    {
        "book_id": 1,
        "user_id": 4,
        "body": "The book has a lot of potential, but I felt that some parts dragged on a bit too long. Overall, a good read.",
        "star_rating": 3,
        "created_at": "2020-06-25T09:00:00Z"
    },
    {
        "book_id": 2,
        "user_id": 1,
        "body": "An intense and thrilling read from start to finish. The battle scenes were particularly well done. Highly recommend!",
        "star_rating": 5,
        "created_at": "2021-06-21T16:00:00Z"
    },
    {
        "book_id": 2,
        "user_id": 3,
        "body": "The characters are well-developed and the story is engaging. There were a few slow parts, but overall a great book.",
        "star_rating": 4,
        "created_at": "2021-06-22T11:30:00Z"
    },
    {
        "book_id": 2,
        "user_id": 4,
        "body": "I enjoyed the book but felt that the ending was a bit rushed. Looking forward to the next one.",
        "star_rating": 4,
        "created_at": "2021-06-23T08:45:00Z"
    },
    {
        "book_id": 3,
        "user_id": 1,
        "body": "A beautifully written book with a compelling storyline. The Pool of Seeing is a fascinating concept. Can't wait for more!",
        "star_rating": 5,
        "created_at": "2022-06-21T15:45:00Z"
    },
    {
        "book_id": 3,
        "user_id": 2,
        "body": "The descriptions in this book are so vivid, I felt like I was there. A great read!",
        "star_rating": 4,
        "created_at": "2022-06-22T10:00:00Z"
    },
    {
        "book_id": 3,
        "user_id": 4,
        "body": "The storyline is engaging, and the characters are well-developed. Some parts felt a bit slow, but overall, a good book.",
        "star_rating": 4,
        "created_at": "2022-06-23T09:30:00Z"
    },
    {
        "book_id": 4,
        "user_id": 1,
        "body": "A gripping story with well-developed characters. The descriptions are so vivid, I felt like I was there. Highly recommend!",
        "star_rating": 5,
        "created_at": "2022-01-02T14:00:00Z"
    },
    {
        "book_id": 4,
        "user_id": 2,
        "body": "The story is engaging, and the characters are well-developed. Some parts felt a bit slow, but overall, a good book.",
        "star_rating": 4,
        "created_at": "2022-01-03T10:30:00Z"
    },
    {
        "book_id": 4,
        "user_id": 3,
        "body": "An intense and thrilling read from start to finish. Can't wait for the next installment!",
        "star_rating": 5,
        "created_at": "2022-01-04T09:45:00Z"
    },
    {
        "book_id": 5,
        "user_id": 1,
        "body": "A beautifully written book with a compelling storyline. The setting is so unique, I loved it!",
        "star_rating": 5,
        "created_at": "2022-01-02T14:30:00Z"
    },
    {
        "book_id": 5,
        "user_id": 2,
        "body": "The characters are well-developed, and the story is engaging. Some parts felt a bit slow, but overall, a great book.",
        "star_rating": 4,
        "created_at": "2022-01-03T11:00:00Z"
    },
    {
        "book_id": 5,
        "user_id": 3,
        "body": "I loved the setting and the unique storyline. Can't wait for the next installment!",
        "star_rating": 5,
        "created_at": "2022-01-04T10:00:00Z"
    },
    {
        "book_id": 6,
        "user_id": 1,
        "body": "A relatable and engaging story. The office scenes are so well described. Highly recommend!",
        "star_rating": 5,
        "created_at": "2021-03-12T14:30:00Z"
    },
    {
        "book_id": 6,
        "user_id": 2,
        "body": "The characters are well-developed, and the story is engaging. Some parts felt a bit slow, but overall, a good book.",
        "star_rating": 4,
        "created_at": "2021-03-13T11:15:00Z"
    },
    {
        "book_id": 6,
        "user_id": 3,
        "body": "A great read with a relatable storyline. Can't wait for the next one!",
        "star_rating": 4,
        "created_at": "2021-03-14T10:45:00Z"
    },
    {
        "book_id": 7,
        "user_id": 9,
        "body": "A fascinating story with a unique setting. Poor Lindon! Highly recommend!",
        "star_rating": 5,
        "created_at": "2019-07-13T14:30:00Z"
    },
    {
        "book_id": 7,
        "user_id": 10,
        "body": "The characters are well-developed, and the story is engaging. Can't wait for the next installment!",
        "star_rating": 4,
        "created_at": "2019-07-14T11:00:00Z"
    },
    {
        "book_id": 7,
        "user_id": 11,
        "body": "A great start to the series. Lindon's journey is so compelling!",
        "star_rating": 5,
        "created_at": "2019-07-15T10:45:00Z"
    },
    {
        "book_id": 8,
        "user_id": 9,
        "body": "Yerin and Lindon's dynamic is so interesting. A great read!",
        "star_rating": 5,
        "created_at": "2020-07-13T14:30:00Z"
    },
    {
        "book_id": 8,
        "user_id": 10,
        "body": "The descriptions of the madra and the wilds are so vivid. Highly recommend!",
        "star_rating": 5,
        "created_at": "2020-07-14T11:00:00Z"
    },
    {
        "book_id": 8,
        "user_id": 11,
        "body": "A compelling story with well-developed characters. Can't wait for the next one!",
        "star_rating": 4,
        "created_at": "2020-07-15T10:45:00Z"
    },
    {
        "book_id": 9,
        "user_id": 10,
        "body": "This book was intense. The ethical dilemmas Kylar faces are so compelling. Highly recommend!",
        "star_rating": 5,
        "created_at": "2023-10-22T14:30:00Z"
    },
    {
        "book_id": 9,
        "user_id": 11,
        "body": "A great read with a complex and engaging storyline. Can't wait for the next installment!",
        "star_rating": 4,
        "created_at": "2023-10-23T11:00:00Z"
    },
    {
        "book_id": 9,
        "user_id": 12,
        "body": "The characters are well-developed, and the story is engaging. Highly recommend!",
        "star_rating": 5,
        "created_at": "2023-10-24T10:45:00Z"
    },
    {
        "book_id": 10,
        "user_id": 11,
        "body": "Gideon's escape was thrilling and so well-written. Highly recommend!",
        "star_rating": 5,
        "created_at": "2019-11-25T14:30:00Z"
    },
    {
        "book_id": 10,
        "user_id": 12,
        "body": "The descriptions of the Ninth House are so vivid. Can't wait for the next one!",
        "star_rating": 4,
        "created_at": "2019-11-26T11:00:00Z"
    },
    {
        "book_id": 10,
        "user_id": 13,
        "body": "A compelling story with well-developed characters. Highly recommend!",
        "star_rating": 5,
        "created_at": "2019-11-27T10:45:00Z"
    },
    {
        "book_id": 11,
        "user_id": 12,
        "body": "The complexities of Harrow's journey are so well-written. Can't wait for the next one!",
        "star_rating": 5,
        "created_at": "2020-11-25T14:30:00Z"
    },
    {
        "book_id": 11,
        "user_id": 13,
        "body": "The descriptions and character development are top-notch. Highly recommend!",
        "star_rating": 4,
        "created_at": "2020-11-26T11:00:00Z"
    },
    {
        "book_id": 11,
        "user_id": 1,
        "body": "A beautifully written book with a compelling storyline. Highly recommend!",
        "star_rating": 5,
        "created_at": "2020-11-27T10:45:00Z"
    },
    {
        "book_id": 12,
        "user_id": 13,
        "body": "The Recorder session is such a unique concept. Can't wait for the next one!",
        "star_rating": 5,
        "created_at": "2021-11-25T14:30:00Z"
    },
    {
        "book_id": 12,
        "user_id": 1,
        "body": "The blend of daily routine and underlying tension is so well done. Highly recommend!",
        "star_rating": 4,
        "created_at": "2021-11-26T11:00:00Z"
    },
    {
        "book_id": 12,
        "user_id": 2,
        "body": "A compelling story with well-developed characters. Highly recommend!",
        "star_rating": 5,
        "created_at": "2021-11-27T10:45:00Z"
    },
    {
        "book_id": 13,
        "user_id": 1,
        "body": "The reflection and routine transition is so well done. Can't wait for the next one!",
        "star_rating": 5,
        "created_at": "2021-11-25T14:30:00Z"
    },
    {
        "book_id": 13,
        "user_id": 2,
        "body": "The characters are well-developed, and the story is engaging. Highly recommend!",
        "star_rating": 4,
        "created_at": "2021-11-26T11:00:00Z"
    },
    {
        "book_id": 13,
        "user_id": 3,
        "body": "A compelling story with a unique concept. Highly recommend!",
        "star_rating": 5,
        "created_at": "2021-11-27T10:45:00Z"
    },
    {
        "book_id": 14,
        "user_id": 1,
        "body": "The map room at Aslevjal is so vividly described. Can't wait for the next one!",
        "star_rating": 5,
        "created_at": "2013-02-25T14:30:00Z"
    },
    {
        "book_id": 14,
        "user_id": 2,
        "body": "The lore in this chapter is so rich and intriguing. Highly recommend!",
        "star_rating": 4,
        "created_at": "2013-02-26T11:00:00Z"
    },
    {
        "book_id": 14,
        "user_id": 3,
        "body": "A compelling story with well-developed characters. Highly recommend!",
        "star_rating": 5,
        "created_at": "2013-02-27T10:45:00Z"
    },
    {
        "book_id": 15,
        "user_id": 2,
        "body": "Amara's mission is off to a tense start. Can't wait to see what happens next!",
        "star_rating": 5,
        "created_at": "2009-08-12T14:30:00Z"
    },
    {
        "book_id": 15,
        "user_id": 3,
        "body": "The description of the setting is so immersive. Highly recommend!",
        "star_rating": 4,
        "created_at": "2009-08-13T11:00:00Z"
    },
    {
        "book_id": 15,
        "user_id": 4,
        "body": "A compelling story with well-developed characters. Highly recommend!",
        "star_rating": 5,
        "created_at": "2009-08-14T10:45:00Z"
    },
    {
        "book_id": 16,
        "user_id": 2,
        "body": "Tavi's ingenuity is really shining through in this chapter. Can't wait for the next one!",
        "star_rating": 5,
        "created_at": "2010-08-12T14:30:00Z"
    },
    {
        "book_id": 16,
        "user_id": 3,
        "body": "The historical references add so much depth to the story. Highly recommend!",
        "star_rating": 4,
        "created_at": "2010-08-13T11:00:00Z"
    },
    {
        "book_id": 16,
        "user_id": 4,
        "body": "A compelling story with well-developed characters. Highly recommend!",
        "star_rating": 5,
        "created_at": "2010-08-14T10:45:00Z"
    },
    {
        "book_id": 17,
        "user_id": 1,
        "body": "Calandra's attention to detail is fascinating. Can't wait for the next one!",
        "star_rating": 5,
        "created_at": "2005-02-18T14:30:00Z"
    },
    {
        "book_id": 17,
        "user_id": 2,
        "body": "The family dynamics in this chapter are so well written. Highly recommend!",
        "star_rating": 4,
        "created_at": "2005-02-19T11:00:00Z"
    },
    {
        "book_id": 17,
        "user_id": 3,
        "body": "A compelling story with well-developed characters. Highly recommend!",
        "star_rating": 5,
        "created_at": "2005-02-20T10:45:00Z"
    },
    {
        "book_id": 18,
        "user_id": 1,
        "body": "The atmosphere in Kairn Telest is so haunting. Can't wait for the next one!",
        "star_rating": 5,
        "created_at": "2006-02-18T14:30:00Z"
    },
    {
        "book_id": 18,
        "user_id": 2,
        "body": "The relationship between the king and Edmund is really compelling. Highly recommend!",
        "star_rating": 4,
        "created_at": "2006-02-19T11:00:00Z"
    },
    {
        "book_id": 18,
        "user_id": 3,
        "body": "A compelling story with well-developed characters. Highly recommend!",
        "star_rating": 5,
        "created_at": "2006-02-20T10:45:00Z"
    },
    {
        "book_id": 19,
        "user_id": 1,
        "body": "Haplo's internal struggle is so intense. Can't wait for the next one!",
        "star_rating": 5,
        "created_at": "2007-02-18T14:30:00Z"
    },
    {
        "book_id": 19,
        "user_id": 2,
        "body": "The descriptions of the ship and the journey are so vivid. Highly recommend!",
        "star_rating": 4,
        "created_at": "2007-02-19T11:00:00Z"
    },
    {
        "book_id": 19,
        "user_id": 3,
        "body": "A compelling story with well-developed characters. Highly recommend!",
        "star_rating": 5,
        "created_at": "2007-02-20T10:45:00Z"
    },
    {
        "book_id": 20,
        "user_id": 1,
        "body": "Haplo's escape from Surunan is so thrilling. Can't wait for the next one!",
        "star_rating": 5,
        "created_at": "2008-02-18T14:30:00Z"
    },
    {
        "book_id": 20,
        "user_id": 2,
        "body": "The descriptions of the submerged city are so vivid. Highly recommend!",
        "star_rating": 4,
        "created_at": "2008-02-19T11:00:00Z"
    },
    {
        "book_id": 20,
        "user_id": 3,
        "body": "A compelling story with well-developed characters. Highly recommend!",
        "star_rating": 5,
        "created_at": "2008-02-20T10:45:00Z"
    }
    ]

   for data in review_data:
        created_at = datetime.strptime(data["created_at"], "%Y-%m-%dT%H:%M:%SZ")
        chapter = Review(
            book_id=data["book_id"],
            user_id=data["user_id"],
            body=data["body"],
            star_rating=data["star_rating"],
            created_at=created_at
        )
        db.session.add(chapter)

   db.session.commit()


def undo_reviews():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.reviews RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM reviews"))

    db.session.commit()
