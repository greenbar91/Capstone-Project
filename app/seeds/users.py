from app.models import db, User, environment, SCHEMA
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
def seed_users():
    demo = User(
        username='Jacob Dietz', email='demo@aa.io', password='password', profile_pic="placeholder.png")
    elena = User(
        username='Elena Rivers', email='elena@aa.io', password='password', profile_pic="placeholder.png"
    )
    arthur = User(
        username='Arthur Greene', email='arthur@aa.io', password='password', profile_pic="placeholder.png"
    )
    lyla = User(
        username="Lyla Morgan", email="lyla@aa.io", password="password", profile_pic="placeholder.png"
    )
    thomas = User(
        username="Thomas Knight", email="thomas@aa.io", password="password", profile_pic="placeholder.png"
    )
    evan = User(
        username="Evan Blackwood", email="evan@aa.io", password="password", profile_pic="placeholder.png"
    )
    amelia = User(
        username="Amelia Silvermoon", email="amelia@aa.io", password="password", profile_pic="placeholder.png"
    )
    damon = User(
        username="Damon Darkwood", email="damon@aa.io", password="password", profile_pic="placeholder.png"
    )
    eleanor = User(
        username="Eleanor Sage", email="eleanor@aa.io", password="password", profile_pic="placeholder.png"
    )
    marcus = User(
        username="Marcus Storm", email="marcus@aa.io", password="password", profile_pic="placeholder.png"
    )
    jim = User(
        username="Jim Gonzo", email="jim@aa.io", password="password", profile_pic="placeholder.png"
    )
    bobbie = User(
        username="Bobbie Smith", email="bobbie@aa.io", password="password", profile_pic="placeholder.png"
    )
    sarah = User(
        username="Sarah Stile", email="sarah@aa.io", password="password", profile_pic="placeholder.png"
    )

    db.session.add(demo)
    db.session.add(elena)
    db.session.add(arthur)
    db.session.add(lyla)
    db.session.add(thomas)
    db.session.add(evan)
    db.session.add(amelia)
    db.session.add(damon)
    db.session.add(eleanor)
    db.session.add(marcus)
    db.session.add(jim)
    db.session.add(bobbie)
    db.session.add(sarah)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_users():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM users"))

    db.session.commit()
