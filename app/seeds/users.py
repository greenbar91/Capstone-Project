from app.models import db, User, environment, SCHEMA
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
def seed_users():
    demo = User(
        username='Demo', email='demo@aa.io', password='password', profile_pic="placeholder.png")
    marnie = User(
        username='Marnie Gardens', email='marnie@aa.io', password='password', profile_pic="placeholder.png")
    bobbie = User(
        username='Bobbie Smith', email='bobbie@aa.io', password='password', profile_pic="placeholder.png")
    jacob = User(
        username="Jacob Gonzalez", email="jacob@aa.io", password="password", profile_pic="placeholder.png"
    )
    sarah = User(
        username="Sarah Stile", email="sarah@aa.io", password="password", profile_pic="placeholder.png"
    )
    brandon = User(
        username="Brandon Sanderson", email="brandon@aa.io", password="password", profile_pic="placeholder.png"
    )
    zogarth = User(
        username="Zogarth", email="zogarth@aa.io", password="password", profile_pic="placeholder.png"
    )
    willwight = User(
        username="Will Wight", email="willw@aa.io", password="password", profile_pic="placeholder.png"

    )
    brentweeks = User(
        username="Brent Weeks", email="brentw@aa.io", password="password", profile_pic="placeholder.png"
    )
    tamsyn = User(
        username="Tamsyn Muir", email="tamsyn@aa.io", password="password", profile_pic="placeholder.png"
    )
    robinhobb = User(
        username="Robin Hobb", email="robin@aa.io", password="password", profile_pic="placeholder.png"
    )
    jimbutcher = User(
        username="Jim Butcher", email="jimb@aa.io", password="password", profile_pic="placeholder.png"
    )
    margaretweis = User(
        username="Margaret Weis", email="margw@aa.io", password="password", profile_pic="placeholder.png"

    )

    db.session.add(demo)
    db.session.add(marnie)
    db.session.add(bobbie)
    db.session.add(jacob)
    db.session.add(sarah)
    db.session.add(brandon)
    db.session.add(zogarth)
    db.session.add(willwight)
    db.session.add(brentweeks)
    db.session.add(tamsyn)
    db.session.add(robinhobb)
    db.session.add(jimbutcher)
    db.session.add(margaretweis)
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
