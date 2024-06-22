from app.models import db, Book, environment, SCHEMA
from sqlalchemy.sql import text
from datetime import datetime

def seed_books():
    books_data = [
        {
            "author_id": 1,
            "title": "Dragons of a Fallen Sun",
            "blurb": "Dragons of a Fallen Sun transports readers to the mystical world of Krynn, where old enemies and ancient powers stir once more. As the War of Souls unfolds, the fragile peace in Ansalon shatters, leaving a wake of chaos and despair. The Dark Queens minions, a new breed of dragons, and a mysterious young woman wielding unprecedented magic, set the stage for a saga of epic battles and heart-wrenching sacrifices. This spellbinding book weaves a tale of heroism, destiny, and the eternal struggle between light and darkness.",
            "cover_art": "https://i.imgur.com/aeHWnSF.png",
            "created_at": "2020-06-21T15:45:30Z"
        },
        {
            "author_id": 1,
            "title": "Dragons of a Lost Star",
            "blurb": "Dragons of a Lost Star plunges readers back into the tumultuous world of Krynn, where the War of Souls rages on and the very fabric of reality is threatened. As the powerful dragon overlords vie for dominance and an enigmatic new villain emerges, familiar heroes must grapple with their own destinies and the shadowy forces that seek to engulf them. Magic and mystery intertwine in this gripping tale of courage, sacrifice, and the relentless struggle against darkness.",
            "cover_art": "https://i.imgur.com/5RNxYhm.png",
            "created_at": "2021-06-21T15:45:30Z"
        },
        {
            "author_id": 1,
            "title": "Dragons of a Vanished Moon",
            "blurb": "Dragons of a Vanished Moon transports readers to the heart of Krynn's greatest crisis, where the final battle of the War of Souls looms. As the gods return and the balance of power shifts, familiar heroes and new allies must unite to confront the Dark Queen's sinister forces. With dragons soaring overhead and destinies intertwining, the fate of Krynn hangs in the balance.",
            "cover_art": "https://i.imgur.com/D9mg1M2.png",
            "created_at": "2022-06-21T15:45:30Z"
        },
        {
            "author_id": 6,
            "title": "The Sunlit Man",
            "blurb": "The Sunlit Man takes readers on a thrilling journey through a world where light and darkness wage an eternal battle. When an ordinary man discovers he possesses extraordinary powers tied to the sun, he is thrust into a struggle against shadowy forces that threaten to engulf everything he holds dear. As he learns to harness his newfound abilities, he must navigate a landscape of treacherous alliances, hidden dangers, and ancient secrets. This gripping tale of adventure, courage, and self-discovery promises to captivate readers with its vivid storytelling and unforgettable characters.",
            "cover_art": "https://i.imgur.com/XcM6jMK.png",
            "created_at": "2022-01-01T15:45:30Z"
        },
        {
            "author_id": 6,
            "title": "Tress of the Emerald Sea",
            "blurb": "Tress of the Emerald Sea invites readers into a mesmerizing world where magic and mystery converge on the high seas. Tress, a young woman with an unyielding spirit, embarks on a perilous voyage across the mystical Emerald Sea to save a loved one. Along the way, she encounters enchanted islands, treacherous pirates, and ancient secrets that challenge her resolve and reshape her destiny. This enchanting tale of adventure, bravery, and self-discovery weaves a rich tapestry of wonder and excitement, promising an unforgettable journey for all who dare to sail its waters.",
            "cover_art": "https://i.imgur.com/fJSy0BI.png",
            "created_at": "2023-01-01T15:45:30Z"
        },
        {
            "author_id": 7,
            "title": "The Primal Hunter: Book One",
            "blurb": "The Primal Hunter plunges readers into a world where survival depends on cunning, strength, and a relentless will to hunt. When Jake, an ordinary man, is thrust into a brutal realm teeming with deadly creatures and ancient magic, he must adapt quickly or face certain death. As he hones his skills and embraces his primal instincts, Jake discovers hidden powers within himself and forms alliances with unlikely companions. This thrilling saga of survival, evolution, and unyielding determination captivates with its fast-paced action and richly imagined world, promising a gripping adventure from start to finish.",
            "cover_art": "https://i.imgur.com/zJyfeXu.png",
            "created_at": "2021-03-11T15:45:30Z"
        },
        {
            "author_id": 8,
            "title": "Unsouled",
            "blurb": "Unsouled follows Wei Shi Lindon, a young man born without a sacred power in a world where such power determines one's fate. Determined to defy his destiny and prove his worth, Lindon embarks on a dangerous journey of self-discovery and relentless training. Along the way, he encounters powerful clans, mystical forces, and daunting challenges that push him to his limits.",
            "cover_art": "https://i.imgur.com/vza6Wmy.png",
            "created_at": "2019-07-12T15:45:30Z"
        },
        {
            "author_id": 8,
            "title": "Soulsmith",
            "blurb": "Soul Smith continues the epic journey of Wei Shi Lindon as he strives to forge his path in a world of powerful sacred artists. After surviving the trials of the Sacred Valley, Lindon ventures into the treacherous wilderness, determined to grow stronger and master the ancient art of soul smithing. Along the way, he encounters formidable foes, makes new allies, and unearths hidden secrets that could change the course of his destiny.",
            "cover_art": "https://i.imgur.com/2bOk1ZQ.png",
            "created_at": "2020-07-12T15:45:30Z"
        },
        {
            "author_id": 9,
            "title": "Night Angel: Nemesis",
            "blurb": "Night Angel: Nemesis delves deeper into the dark and perilous world created by Brent Weeks. As the epic saga reaches its climax, Kylar Stern faces his ultimate test against the malevolent forces that threaten to plunge the realm into chaos. With his newfound powers as a Night Angel, Kylar must navigate a web of political intrigue, supernatural threats, and personal demons to protect those he loves and fulfill his destiny.",
            "cover_art": "https://i.imgur.com/5UMpnKQ.png",
            "created_at": "2023-10-21T15:45:30Z"
        },
        {
            "author_id": 10,
            "title": "Gideon the Ninth",
            "blurb": "Gideon the Ninth introduces readers to a universe where necromancy and mysteries collide in a dazzling blend of gothic fantasy and science fiction. Gideon Nav, a sword-wielding orphan, is thrust into a deadly competition among powerful necromancers vying for ultimate power. Teamed with Harrowhark Nonagesimus, her childhood nemesis and a powerful necromancer, Gideon must navigate treacherous alliances and unearth dark secrets to survive. This thrilling debut novel by Tamsyn Muir unfolds a gripping tale of ambition, betrayal, and dark magic against a backdrop of decaying imperial politics and ancient secrets.",
            "cover_art": "https://i.imgur.com/IXMxQTu.png",
            "created_at": "2019-11-24T15:45:30Z"
        },
        {
            "author_id": 10,
            "title": "Harrow the Ninth",
            "blurb": "Harrow the Ninth continues the saga begun in Gideon the Ninth, plunging readers deeper into a labyrinth of necromantic intrigue and cosmic mysteries. Harrowhark Nonagesimus, now a Lyctor and wielding newfound powers, must confront her haunted past and unravel the secrets of the Emperor's necromantic empire. As dark forces conspire against her, Harrow faces deadly challenges that test her limits and threaten to consume her soul.",
            "cover_art": "https://i.imgur.com/f6Q1lFR.png",
            "created_at": "2020-11-24T15:45:30Z"
        },
        {
            "author_id": 10,
            "title": "Nona the Ninth",
            "blurb": "Her city is under siege. The zombies are coming back. And all Nona wants is a birthday party. In many ways, Nona is like other people. She lives with her family, has a job at her local school, and loves walks on the beach and meeting new dogs. But Nona's not like other people. Six months ago she woke up in a stranger's body, and she's afraid she might have to give it back. The whole city is falling to pieces. A monstrous blue sphere hangs on the horizon, ready to tear the planet apart. Blood of Eden forces have surrounded the last Cohort facility and wait for the Emperor Undying to come calling. Their leaders want Nona to be the weapon that will save them from the Nine Houses. Nona would prefer to live an ordinary life with the people she loves, with Pyrrha and Camilla and Palamedes, but she also knows that nothing lasts forever. And each night, Nona dreams of a woman with a skull-painted face...",
            "cover_art": "https://i.imgur.com/Ep5HBNu.png",
            "created_at": "2021-11-24T15:45:30Z"
        },
        {
            "author_id": 11,
            "title": "Fools Quest",
            "blurb": "Fool's Quest dives deeper into the realms of FitzChivalry Farseer, a man haunted by his past and burdened with a destiny he cannot escape. As the political landscape of the Six Duchies shifts, Fitz must navigate treacherous waters to protect those he loves and uncover the truth behind a mysterious betrayal. With old enemies resurfacing and new alliances tested, Fitz embarks on a perilous journey that will test his loyalties, his magic, and his resolve.",
            "cover_art": "https://i.imgur.com/MSqcevO.png",
            "created_at": "2012-02-24T15:45:30Z"
        },
        {
            "author_id": 11,
            "title": "Assassins Fate",
            "blurb": "The much-anticipated final conclusion to the Fitz and the Fool trilogy. Prince FitzChivalry Farseer’s daughter Bee was violently abducted from Withywoods by Servants of the Four in their search for the Unexpected Son, foretold to wield great power. With Fitz in pursuit, the Servants fled through a Skill-pillar, leaving no trace. It seems certain that they and their young hostage have perished in the Skill-river. Clerres, where White Prophets were trained by the Servants to set the world on a better path, has been corrupted by greed. Fitz is determined to reach the city and take vengeance on the Four, not only for the loss of Bee but also for their torture of the Fool. Accompanied by FitzVigilant, son of the assassin Chade, Chade’s protégé Spark and the stableboy Perseverance, Bee's only friend, their journey will take them from the Elderling city of Kelsingra, down the perilous Rain Wild River, and on to the Pirate Isles. Their mission for revenge will become a voyage of discovery, as well as of reunions, transformations and heartrending shocks. Startling answers to old mysteries are revealed. What became of the liveships Paragon and Vivacia and their crews? What is the origin of the Others and their eerie beach? How are liveships and dragons connected? But Fitz and his followers are not the only ones with a deadly grudge against the Four. An ancient wrong will bring them unlikely and dangerous allies in their quest. And if the corrupt society of Clerres is to be brought down, Fitz and the Fool will have to make a series of profound and fateful sacrifices.",
            "cover_art": "https://i.imgur.com/ZmpgVjE.png",
            "created_at": "2013-02-24T15:45:30Z"
        },
        {
            "author_id": 12,
            "title": "Furies of Calderon",
            "blurb": "For a thousand years, the people of Alera have united against the aggressive and threatening races that inhabit the world, using their unique bond with the furies - elementals of earth, air, fire, water, and metal. But now, Gaius Sextus, First Lord of Alera, grows old and lacks an heir. Ambitious High Lords plot and maneuver to place their Houses in positions of power, and a war of succession looms on the horizon. Far from city politics in the Calderon Valley, the boy Tavi struggles with his lack of furycrafting. At fifteen, he has no wind fury to help him fly, no fire fury to light his lamps. Yet as the Alerans' most savage enemy - the Marat - return to the Valley, he will discover that his destiny is much greater than he could ever imagine. Caught in a storm of deadly wind furies, Tavi saves the life of a runaway slave named Amara. But she is actually a spy for Gaius Sextus, sent to the Valley to gather intelligence on traitors to the Crown, who may be in league with the barbaric Marat horde.",
            "cover_art": "https://i.imgur.com/q6nnLnR.png",
            "created_at": "2009-08-11T15:45:30Z"
        },
        {
            "author_id": 12,
            "title": "Cursor's Fury",
            "blurb": "Cursor's Fury propels readers into the heart of Alera, a realm where elemental forces shape destinies and deadly enemies threaten from all sides. As Tavi, a young Cursor without the traditional fury-crafting abilities, rises through the ranks of Aleran society, he becomes embroiled in a desperate battle against the invading Canim forces. With cunning, courage, and a unique strategic mind, Tavi must rally his allies and outwit his foes to protect his homeland from annihilation.",
            "cover_art": "https://i.imgur.com/OXNWh5n.png",
            "created_at": "2010-08-11T15:45:30Z"
        },
        {
            "author_id": 13,
            "title": "Elven Star",
            "blurb": "Elven Star immerses readers in a realm where ancient prophecies and magical artifacts hold the key to both salvation and destruction. As the companions from Earth continue their quest in the enchanted world of Theros Ironfeld, they uncover deeper layers of intrigue and danger. With alliances tested and enemies closing in, they must navigate a landscape fraught with mystical creatures and political machinations to uncover the truth about the Elven Star.",
            "cover_art": "https://i.imgur.com/soXnrzZ.png",
            "created_at": "2005-02-17T15:45:30Z"
        },
        {
            "author_id": 13,
            "title": "Fire Sea",
            "blurb": "Fire Sea plunges readers into the depths of a world divided by elemental forces and ancient mysteries. As the companions journey deeper into the realms of Arianus, they discover the Fire Sea—a place where molten rivers flow and ancient secrets lie buried. With each step, they face trials that test their courage, wisdom, and loyalty, navigating a landscape where danger lurks at every turn.",
            "cover_art": "https://i.imgur.com/C8kNuUO.png",
            "created_at": "2006-02-17T15:45:30Z"
        },
        {
            "author_id": 13,
            "title": "Serpent Mage",
            "blurb": "Serpent Mage continues the gripping saga of the Death Gate Cycle, where realms of magic and technology collide in a battle for survival. As Haplo, the enigmatic Patryn, ventures deeper into the mysterious labyrinth of worlds, he encounters new allies and adversaries alike. Amidst shifting alliances and ancient prophecies, Haplo must navigate treacherous landscapes and confront powerful forces to unravel the secrets of the Serpent Mage.",
            "cover_art": "https://i.imgur.com/mVOrj05.png",
            "created_at": "2007-02-17T15:45:30Z"
        },
        {
            "author_id": 13,
            "title": "The Hand of Chaos",
            "blurb": "Hand of Chaos thrusts readers into a tumultuous world where chaos reigns and the fate of civilizations hangs in the balance. As the heroes of the Death Gate Cycle continue their quest across the realms, they confront the devastating aftermath of wars between elemental forces. Amidst treacherous landscapes and ancient ruins, they unravel the mysteries of the Hand of Chaos—a powerful artifact with the potential to reshape reality itself.",
            "cover_art": "https://i.imgur.com/KzU64pS.png",
            "created_at": "2008-02-17T15:45:30Z"
        }
    ]

    for data in books_data:
        created_at = datetime.strptime(data["created_at"], "%Y-%m-%dT%H:%M:%SZ")
        book = Book(
            author_id=data["author_id"],
            title=data["title"],
            blurb=data["blurb"],
            cover_art=data["cover_art"],
            created_at=created_at
        )
        db.session.add(book)

    db.session.commit()

def undo_books():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.books RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM books"))

    db.session.commit()
