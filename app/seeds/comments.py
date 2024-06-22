from datetime import datetime
from app.models import db, Comment, environment, SCHEMA
from sqlalchemy.sql import text

def seed_comments():
    comments_data = [
    {
        "user_id": 5,
        "chapter_id": 1,
        "body": "Really intriguing chapter, can't wait to see what happens next!",
        "created_at": "2020-06-21T16:00:00Z"
    },
    {
        "user_id": 2,
        "chapter_id": 1,
        "body": "This was a bit slow, but I'm hoping it picks up in the next one.",
        "created_at": "2020-06-22T10:30:00Z"
    },
    {
        "user_id": 3,
        "chapter_id": 1,
        "body": "I loved the detailed descriptions here, especially the setting!",
        "created_at": "2020-06-23T09:45:00Z"
    },
    {
        "user_id": 4,
        "chapter_id": 1,
        "body": "Not sure I understood the part about the magic system. Can anyone explain?",
        "created_at": "2020-06-24T14:20:00Z"
    },
    {
        "user_id": 5,
        "chapter_id": 2,
        "body": "Wow, that ending was unexpected! Does anyone have theories?",
        "created_at": "2021-06-21T16:00:00Z"
    },
    {
        "user_id": 2,
        "chapter_id": 2,
        "body": "Really loved the battle scene, so intense!",
        "created_at": "2021-06-22T11:15:00Z"
    },
    {
        "user_id": 3,
        "chapter_id": 2,
        "body": "The characters are really developing well. Excited for the next chapter.",
        "created_at": "2021-06-23T08:30:00Z"
    },
    {
        "user_id": 4,
        "chapter_id": 2,
        "body": "I hope the next chapter gives us more background on Beryl.",
        "created_at": "2021-06-24T13:00:00Z"
    },
    {
        "user_id": 5,
        "chapter_id": 3,
        "body": "This chapter was so atmospheric, loved the descriptions!",
        "created_at": "2022-06-21T15:30:00Z"
    },
    {
        "user_id": 6,
        "chapter_id": 3,
        "body": "The Pool of Seeing is such a fascinating concept.",
        "created_at": "2022-06-22T09:20:00Z"
    },
    {
        "user_id": 7,
        "chapter_id": 3,
        "body": "I wonder what the outcome of the reunion between Goldmoon and Mina will be.",
        "created_at": "2022-06-23T10:45:00Z"
    },
    {
        "user_id": 8,
        "chapter_id": 4,
        "body": "Nomad's story is getting more intense with each chapter!",
        "created_at": "2022-01-03T14:00:00Z"
    },
    {
        "user_id": 9,
        "chapter_id": 4,
        "body": "The descriptions of the plants and the environment were so vivid.",
        "created_at": "2022-01-04T11:30:00Z"
    },
    {
        "user_id": 10,
        "chapter_id": 4,
        "body": "I felt the tension in this chapter, especially during the execution scene.",
        "created_at": "2022-01-05T09:15:00Z"
    },
    {
        "user_id": 1,
        "chapter_id": 5,
        "body": "Tress is such an interesting character, love her collection of cups!",
        "created_at": "2022-01-03T14:30:00Z"
    },
    {
        "user_id": 7,
        "chapter_id": 5,
        "body": "The setting is so unique, a green sea and a black saltstone island.",
        "created_at": "2022-01-04T12:00:00Z"
    },
    {
        "user_id": 8,
        "chapter_id": 5,
        "body": "I can't wait to see what happens next on Diggen’s Point.",
        "created_at": "2022-01-05T09:45:00Z"
    },
    {
        "user_id": 1,
        "chapter_id": 6,
        "body": "Jake's routine is so relatable. I wonder what will happen next.",
        "created_at": "2021-03-13T14:00:00Z"
    },
    {
        "user_id": 2,
        "chapter_id": 6,
        "body": "The description of his office life is spot on!",
        "created_at": "2021-03-14T11:15:00Z"
    },
    {
        "user_id": 3,
        "chapter_id": 6,
        "body": "I feel like something big is about to happen.",
        "created_at": "2021-03-15T10:30:00Z"
    },
    {
        "user_id": 8,
        "chapter_id": 7,
        "body": "The ritual in Sacred Valley is fascinating. Poor Lindon!",
        "created_at": "2019-07-14T14:00:00Z"
    },
    {
        "user_id": 9,
        "chapter_id": 7,
        "body": "I wonder if Lindon will find a way to prove himself.",
        "created_at": "2019-07-15T11:15:00Z"
    },
    {
        "user_id": 10,
        "chapter_id": 7,
        "body": "This society is so harsh. I'm rooting for Lindon.",
        "created_at": "2019-07-16T10:30:00Z"
    },
    {
        "user_id": 8,
        "chapter_id": 8,
        "body": "Yerin and Lindon's dynamic is so interesting.",
        "created_at": "2020-07-14T14:00:00Z"
    },
    {
        "user_id": 9,
        "chapter_id": 8,
        "body": "I can't wait to see Lindon advance to Copper!",
        "created_at": "2020-07-15T11:15:00Z"
    },
    {
        "user_id": 10,
        "chapter_id": 8,
        "body": "The descriptions of the madra and the wilds are so vivid.",
        "created_at": "2020-07-16T10:30:00Z"
    },
    {
        "user_id": 9,
        "chapter_id": 9,
        "body": "This chapter was intense. I felt the conflict deeply.",
        "created_at": "2023-10-23T14:00:00Z"
    },
    {
        "user_id": 10,
        "chapter_id": 9,
        "body": "The ethical dilemmas Kylar faces are so compelling.",
        "created_at": "2023-10-24T11:15:00Z"
    },
    {
        "user_id": 11,
        "chapter_id": 9,
        "body": "I love how the chapter explores the complexity of Kylar's job.",
        "created_at": "2023-10-25T10:30:00Z"
    },
    {
        "user_id": 10,
        "chapter_id": 10,
        "body": "Gideon's escape was thrilling! Can't wait for more.",
        "created_at": "2019-11-26T14:00:00Z"
    },
    {
        "user_id": 11,
        "chapter_id": 10,
        "body": "The descriptions of the Ninth House are so vivid.",
        "created_at": "2019-11-27T11:15:00Z"
    },
    {
        "user_id": 12,
        "chapter_id": 10,
        "body": "I love Gideon's determination and humor.",
        "created_at": "2019-11-28T10:30:00Z"
    },
    {
        "user_id": 10,
        "chapter_id": 11,
        "body": "Harrowhark's struggle with the sword is so intense.",
        "created_at": "2020-11-26T14:00:00Z"
    },
    {
        "user_id": 11,
        "chapter_id": 11,
        "body": "The setting aboard the Erebos is so eerie and atmospheric.",
        "created_at": "2020-11-27T11:15:00Z"
    },
    {
        "user_id": 12,
        "chapter_id": 11,
        "body": "I feel for Harrowhark's struggles. Can't wait to see what happens next.",
        "created_at": "2020-11-28T10:30:00Z"
    },
    {
        "user_id": 11,
        "chapter_id": 12,
        "body": "This chapter was so haunting and beautifully written.",
        "created_at": "2021-11-26T14:00:00Z"
    },
    {
        "user_id": 12,
        "chapter_id": 12,
        "body": "The recorder session adds so much depth to the character.",
        "created_at": "2021-11-27T11:15:00Z"
    },
    {
        "user_id": 13,
        "chapter_id": 12,
        "body": "I love the blend of daily routine and underlying tension.",
        "created_at": "2021-11-28T10:30:00Z"
    },
    {
        "user_id": 11,
        "chapter_id": 13,
        "body": "This chapter sets up the story so well. Can't wait to read more.",
        "created_at": "2021-11-26T14:00:00Z"
    },
    {
        "user_id": 12,
        "chapter_id": 13,
        "body": "The character's reflections add so much depth to the narrative.",
        "created_at": "2021-11-27T11:15:00Z"
    },
    {
        "user_id": 13,
        "chapter_id": 13,
        "body": "The transition from recollection to routine is so well done.",
        "created_at": "2021-11-28T10:30:00Z"
    },
    {
        "user_id": 11,
        "chapter_id": 14,
        "body": "The map room at Aslevjal is so vividly described.",
        "created_at": "2013-02-26T14:00:00Z"
    },
    {
        "user_id": 12,
        "chapter_id": 14,
        "body": "The lore in this chapter is so rich and intriguing.",
        "created_at": "2013-02-27T11:15:00Z"
    },
    {
        "user_id": 13,
        "chapter_id": 14,
        "body": "I love how the chapter weaves historical context into the narrative.",
        "created_at": "2013-02-28T10:30:00Z"
    },
    {
        "user_id": 12,
        "chapter_id": 15,
        "body": "Amara's mission is off to a tense start. Can't wait to see what happens next.",
        "created_at": "2009-08-13T14:00:00Z"
    },
    {
        "user_id": 13,
        "chapter_id": 15,
        "body": "The description of the setting is so immersive.",
        "created_at": "2009-08-14T11:15:00Z"
    },
    {
        "user_id": 1,
        "chapter_id": 15,
        "body": "I love the dynamic between Amara and Fidelias.",
        "created_at": "2009-08-15T10:30:00Z"
    },
    {
        "user_id": 12,
        "chapter_id": 16,
        "body": "Tavi's ingenuity is really shining through in this chapter.",
        "created_at": "2010-08-13T14:00:00Z"
    },
    {
        "user_id": 13,
        "chapter_id": 16,
        "body": "The historical references add so much depth to the story.",
        "created_at": "2010-08-14T11:15:00Z"
    },
    {
        "user_id": 1,
        "chapter_id": 16,
        "body": "I can't wait to see the outcome of their experiment.",
        "created_at": "2010-08-15T10:30:00Z"
    },
    {
        "user_id": 13,
        "chapter_id": 17,
        "body": "Calandra's attention to detail is fascinating.",
        "created_at": "2005-02-19T14:00:00Z"
    },
    {
        "user_id": 1,
        "chapter_id": 17,
        "body": "The family dynamics in this chapter are so well written.",
        "created_at": "2005-02-20T11:15:00Z"
    },
    {
        "user_id": 2,
        "chapter_id": 17,
        "body": "I wonder what Lenthan's experiment will reveal.",
        "created_at": "2005-02-21T10:30:00Z"
    },
    {
        "user_id": 13,
        "chapter_id": 18,
        "body": "The atmosphere in Kairn Telest is so haunting.",
        "created_at": "2006-02-19T14:00:00Z"
    },
    {
        "user_id": 1,
        "chapter_id": 18,
        "body": "The relationship between the king and Edmund is really compelling.",
        "created_at": "2006-02-20T11:15:00Z"
    },
    {
        "user_id": 2,
        "chapter_id": 18,
        "body": "I hope they find a way to survive the darkness.",
        "created_at": "2006-02-21T10:30:00Z"
    },
    {
        "user_id": 1,
        "chapter_id": 19,
        "body": "Haplo's internal struggle is so intense.",
        "created_at": "2007-02-19T14:00:00Z"
    },
    {
        "user_id": 2,
        "chapter_id": 19,
        "body": "I love the descriptions of the ship and the journey.",
        "created_at": "2007-02-20T11:15:00Z"
    },
    {
        "user_id": 3,
        "chapter_id": 19,
        "body": "The relationship between Haplo and his lord is so complex.",
        "created_at": "2007-02-21T10:30:00Z"
    },
    {
        "user_id": 1,
        "chapter_id": 20,
        "body": "Haplo's escape from Chelestra is thrilling.",
        "created_at": "2008-02-19T14:00:00Z"
    },
    {
        "user_id": 2,
        "chapter_id": 20,
        "body": "The setting in Surunan is so vividly described.",
        "created_at": "2008-02-20T11:15:00Z"
    },
    {
        "user_id": 3,
        "chapter_id": 20,
        "body": "I can't wait to see what happens next in Haplo's journey.",
        "created_at": "2008-02-21T10:30:00Z"
    }
    ]

    for data in comments_data:
            created_at = datetime.strptime(data["created_at"], "%Y-%m-%dT%H:%M:%SZ")
            chapter = Comment(
                user_id=data["user_id"],
                chapter_id=data["chapter_id"],
                body=data["body"],
                created_at=created_at
            )
            db.session.add(chapter)

    db.session.commit()






def undo_comments():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.comments RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM comments"))

    db.session.commit()
