from datetime import datetime
from app.models import db, Review, environment, SCHEMA
from sqlalchemy.sql import text

def seed_reviews():
   review_data = [
    {
        "book_id": 1,
        "user_id": 1,
        "body": "Dragons of Ansalon is a thrilling epic that dives deep into political intrigue and ancient prophecies. The characters Kara and Lorien are compelling, and their journey is filled with suspense and bravery.",
        "star_rating": 5,
        "created_at": "2020-06-19T15:45:30Z"
    },
    {
        "book_id": 1,
        "user_id": 2,
        "body": "Dragons of Ansalon transports readers to a vivid world where magic and destiny collide. The plot twists and character development keep you hooked from start to finish.",
        "star_rating": 4,
        "created_at": "2020-06-19T15:45:30Z"
    },
    {
        "book_id": 2,
        "user_id": 3,
        "body": "Defenders of the Citadel continues the gripping saga with intense action and deepening character arcs. Elyndra and Seraphina's leadership shines in the face of relentless challenges.",
        "star_rating": 4,
        "created_at": "2021-06-19T15:45:30Z"
    },
    {
        "book_id": 2,
        "user_id": 4,
        "body": "Defenders of the Citadel is a masterful blend of adventure and strategy. The plot twists and turns kept me on the edge of my seat throughout.",
        "star_rating": 5,
        "created_at": "2021-06-19T15:45:30Z"
    },
    {
        "book_id": 3,
        "user_id": 5,
        "body": "Echoes of Destiny intricately weaves together multiple storylines against a backdrop of ancient prophecies. Lyriel and Gareth's journey is captivating and filled with unexpected twists.",
        "star_rating": 5,
        "created_at": "2022-06-19T15:45:30Z"
    },
    {
        "book_id": 3,
        "user_id": 6,
        "body": "Echoes of Destiny is a mesmerizing tale of adventure and discovery. The characters' growth and the vivid world-building make this a must-read for fantasy enthusiasts.",
        "star_rating": 4,
        "created_at": "2022-06-19T15:45:30Z"
    },
    {
        "book_id": 4,
        "user_id": 7,
        "body": "Echoes of the Ancients delves into a world of dark sorcery and treacherous alliances. Lia and Thane's quest is thrilling and thought-provoking, with twists that kept me guessing until the end.",
        "star_rating": 5,
        "created_at": "2022-01-01T15:45:30Z"
    },
    {
        "book_id": 4,
        "user_id": 8,
        "body": "Echoes of the Ancients captivated me with its rich storytelling and intricate plot. The characters' depth and the magical world they inhabit make this book a standout in fantasy literature.",
        "star_rating": 4,
        "created_at": "2022-01-01T15:45:30Z"
    },
    {
        "book_id": 5,
        "user_id": 9,
        "body": "The Guardian and the Magician is a magical journey of friendship and discovery. Arin and Alexei's quest to unravel ancient mysteries is both enchanting and inspiring.",
        "star_rating": 4,
        "created_at": "2022-01-01T15:45:30Z"
    },
    {
        "book_id": 5,
        "user_id": 10,
        "body": "The Guardian and the Magician immerses readers in a world of wonder and danger. The characters' growth and the intricate magic system make this a compelling read.",
        "star_rating": 5,
        "created_at": "2022-01-01T15:45:30Z"
    },
    {
        "book_id": 6,
        "user_id": 11,
        "body": "The Initiation of Shadows introduces readers to a world of mystery and magic. Lena's journey of self-discovery, alongside Elliot and Aelarion, is both thrilling and thought-provoking.",
        "star_rating": 4,
        "created_at": "2022-03-01T15:45:30Z"
    },
    {
        "book_id": 6,
        "user_id": 12,
        "body": "The Initiation of Shadows is a captivating tale of adventure and friendship. The characters' dynamics and the magical challenges they face kept me engaged throughout.",
        "star_rating": 5,
        "created_at": "2022-03-01T15:45:30Z"
    },
    {
        "book_id": 7,
        "user_id": 13,
        "body": "Whispering Tree Chronicles: Quest for the Lunar Lotus is a beautifully written tale of courage and perseverance. Aria and Renna's journey through mystical forests is both enchanting and thrilling.",
        "star_rating": 5,
        "created_at": "2019-07-12T15:45:30Z"
    },
    {
        "book_id": 7,
        "user_id": 1,
        "body": "Whispering Tree Chronicles: Quest for the Lunar Lotus captivated me with its vivid descriptions and heartfelt characters. Aria and Renna's bravery in the face of danger left a lasting impression.",
        "star_rating": 4,
        "created_at": "2019-07-12T15:45:30Z"
    },
    {
        "book_id": 8,
        "user_id": 2,
        "body": "Secrets of Eldarion is a captivating blend of mystery and adventure. Kael and Elara's quest to unravel ancient secrets kept me eagerly turning pages.",
        "star_rating": 4,
        "created_at": "2020-07-12T15:45:30Z"
    },
    {
        "book_id": 8,
        "user_id": 3,
        "body": "Secrets of Eldarion is a spellbinding journey through magical ruins and political intrigue. The characters' resilience and the richly detailed world-building make this a standout fantasy read.",
        "star_rating": 5,
        "created_at": "2020-07-12T15:45:30Z"
    },
    {
        "book_id": 9,
        "user_id": 4,
        "body": "Shadows of the Black Serpent is a gripping tale of political intrigue and supernatural threats. Prince Elian's journey is both thrilling and thought-provoking, with twists that kept me on edge.",
        "star_rating": 5,
        "created_at": "2023-10-21T15:45:30Z"
    },
    {
        "book_id": 9,
        "user_id": 5,
        "body": "Shadows of the Black Serpent immerses readers in a world of danger and deception. The characters' struggles and the intricate plot make this a must-read for fantasy enthusiasts.",
        "star_rating": 4,
        "created_at": "2023-10-21T15:45:30Z"
    },
    {
        "book_id": 10,
        "user_id": 6,
        "body": "Whispers of the Necropolis explores forbidden magic and the pursuit of knowledge beyond conventional boundaries. Lysandra and Corvin's journey is both thrilling and thought-provoking.",
        "star_rating": 4,
        "created_at": "2019-11-24T15:45:30Z"
    },
    {
        "book_id": 10,
        "user_id": 7,
        "body": "Whispers of the Necropolis captivated me with its dark magic and intricate world-building. The characters' quests for forbidden knowledge kept me hooked until the final page.",
        "star_rating": 5,
        "created_at": "2019-11-24T15:45:30Z"
    },
    {
        "book_id": 11,
        "user_id": 8,
        "body": "Shadows of the Desert is a compelling tale of resilience and redemption. Liora's journey through the harsh desert landscape is both empowering and captivating.",
        "star_rating": 5,
        "created_at": "2020-11-24T15:45:30Z"
    },
    {
        "book_id": 11,
        "user_id": 9,
        "body": "Shadows of the Desert immerses readers in a world of survival and courage. The characters' growth and the vivid descriptions make this book a standout in fantasy literature.",
        "star_rating": 4,
        "created_at": "2020-11-24T15:45:30Z"
    },
    {
        "book_id": 12,
        "user_id": 10,
        "body": "Whispers of the Forest is a beautifully crafted tale of friendship and bravery. Kara and Aiden's journey through the mystical forest is enchanting, filled with moments of wonder.",
        "star_rating": 5,
        "created_at": "2021-11-24T15:45:30Z"
    },
    {
        "book_id": 12,
        "user_id": 11,
        "body": "Whispers of the Forest captivated me with its magical atmosphere and heartfelt characters. The journey of friendship and courage left a lasting impression.",
        "star_rating": 4,
        "created_at": "2021-11-24T15:45:30Z"
    },
    {
        "book_id": 13,
        "user_id": 12,
        "body": "The Heartstone Chronicles: The Year of No One is an epic fantasy filled with heroic quests and magical trials. Rhiannon's journey is both exhilarating and heartwarming, making this a must-read for fantasy fans.",
        "star_rating": 5,
        "created_at": "2011-11-24T15:45:30Z"
    },
    {
        "book_id": 13,
        "user_id": 13,
        "body": "The Heartstone Chronicles: The Year of No One captivated me with its rich storytelling and dynamic characters. The blend of adventure and emotion makes this book a standout in fantasy literature.",
        "star_rating": 4,
        "created_at": "2011-11-24T15:45:30Z"
    },
    {
        "book_id": 14,
        "user_id": 1,
        "body": "The Eldara Chronicles is a mesmerizing tale of ancient magic and perilous adventures. Elara's quest to protect her city from darkness is riveting, showcasing her courage and determination.",
        "star_rating": 4,
        "created_at": "2013-03-24T15:45:30Z"
    },
    {
        "book_id": 14,
        "user_id": 2,
        "body": "The Eldara Chronicles immerses readers in a world of mystery and magic. The characters' journey through ancient ruins and treacherous landscapes kept me engaged until the very end.",
        "star_rating": 5,
        "created_at": "2013-03-24T15:45:30Z"
    },
    {
        "book_id": 15,
        "user_id": 3,
        "body": "The Veil of Shadows is a thrilling adventure through forbidden forests and ancient curses. Lyra and Rowan's journey is filled with twists and turns that kept me on the edge of my seat.",
        "star_rating": 5,
        "created_at": "2009-08-11T15:45:30Z"
    },
    {
        "book_id": 15,
        "user_id": 4,
        "body": "The Veil of Shadows captivated me with its dark atmosphere and compelling characters. The blend of mystery and magic makes this a must-read for fantasy enthusiasts.",
        "star_rating": 4,
        "created_at": "2009-08-11T15:45:30Z"
    },
    {
        "book_id": 16,
        "user_id": 5,
        "body": "The Shattered Relic: Quest of Elara and Finn is a compelling tale of adventure and redemption. Elara and Finn's journey through realms of magic and danger kept me hooked from start to finish.",
        "star_rating": 5,
        "created_at": "2010-08-11T15:45:30Z"
    },
    {
        "book_id": 16,
        "user_id": 6,
        "body": "The Shattered Relic: Quest of Elara and Finn is a thrilling adventure filled with twists and turns. The characters' bravery and determination shine throughout their quest.",
        "star_rating": 4,
        "created_at": "2010-08-11T15:45:30Z"
    },
    {
        "book_id": 17,
        "user_id": 7,
        "body": "Secrets of the Astral Key is an enchanting journey through ancient cities and mystical realms. Isla and Liora's quest for forbidden knowledge is filled with intrigue and discovery.",
        "star_rating": 4,
        "created_at": "2005-02-17T15:45:30Z"
    },
    {
        "book_id": 17,
        "user_id": 8,
        "body": "Secrets of the Astral Key captivated me with its magical world and intricate plot. The characters' quest for ancient secrets kept me engrossed until the very end.",
        "star_rating": 5,
        "created_at": "2005-02-17T15:45:30Z"
    },
    {
        "book_id": 18,
        "user_id": 9,
        "body": "The Forbidden Grove is a tale of magic and courage set in an ancient forest. Elysia's journey to protect her village from dark forces is both poignant and empowering.",
        "star_rating": 4,
        "created_at": "2006-02-17T15:45:30Z"
    },
    {
        "book_id": 18,
        "user_id": 10,
        "body": "The Forbidden Grove captivated me with its rich descriptions and heartfelt characters. The journey of courage and sacrifice left a lasting impression.",
        "star_rating": 5,
        "created_at": "2006-02-17T15:45:30Z"
    },
    {
        "book_id": 19,
        "user_id": 11,
        "body": "The Lost Heir is an epic adventure of self-discovery and destiny. Lyria's journey to reclaim her throne is filled with twists and turns, showcasing her bravery and determination.",
        "star_rating": 5,
        "created_at": "2007-02-17T15:45:30Z"
    },
    {
        "book_id": 19,
        "user_id": 12,
        "body": "The Lost Heir captivated me with its gripping storyline and dynamic characters. The blend of adventure and intrigue kept me eagerly turning pages.",
        "star_rating": 4,
        "created_at": "2007-02-17T15:45:30Z"
    },
    {
        "book_id": 20,
        "user_id": 13,
        "body": "The Crystal of Drakar's Hollow is a captivating tale of magic and ambition. Alara's journey to protect a powerful crystal from exploitation is riveting, highlighting themes of courage and responsibility.",
        "star_rating": 4,
        "created_at": "2008-02-17T15:45:30Z"
    },
    {
        "book_id": 20,
        "user_id": 1,
        "body": "The Crystal of Drakar's Hollow immerses readers in a world of mystery and danger. The characters' quest for justice and protection kept me engaged from start to finish.",
        "star_rating": 5,
        "created_at": "2008-02-17T15:45:30Z"
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
