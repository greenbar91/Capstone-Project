from app.models import db, Book, environment, SCHEMA
from sqlalchemy.sql import text
from datetime import datetime

def seed_books():
    books_data = [
        {
  "author_id": 1,
  "title": "Dragons of Ansalon",
  "blurb": "Dragons of Ansalon transports readers to a world plagued by political intrigue, imminent threats, and the resilience of its inhabitants. Kara Silvermoon, a young elven council member, faces the challenge of convincing her peers to adopt a new defense strategy amidst rising tensions with the Dark Knights of Neraka. Meanwhile, Lorien Silverleaf, a skilled elven scout, braves a devastating storm and battles against the forces of darkness to protect his homeland. Their intertwined stories unfold against a backdrop of ancient prophecies and impending conflict, where alliances must be forged and sacrifices made to ensure survival.",
  "cover_art": "placeholder.png",
  "created_at": "2020-06-19T15:45:30Z"
    },
    {
  "author_id": 1,
  "title": "Defenders of the Citadel",
  "blurb": "Defenders of the Citadel unfolds amidst the chaos of Beryl's assault on the Citadel of Light. Elyndra Starbreeze, an elven healer, and Seraphina Brightblade, a courageous Solamnic Knight, find themselves at the forefront of the defense against Beryl's draconic forces. As the dragons' onslaught threatens to overwhelm them, Elyndra, Seraphina, and their allies must rally the villagers and knights to safety while holding off the relentless attacks. Amidst the chaos, new alliances are forged, ancient magic is awakened, and the defenders of the Citadel of Light must unite to protect their world from the darkness that threatens to consume it.",
  "cover_art": "placeholder.png",
  "created_at": "2021-06-19T15:45:30Z"
}
,
{
  "author_id": 1,
  "title": "Echoes of Destiny",
  "blurb": "Echoes of Destiny weaves a tale across the ancient forests of Silvanesti to the bustling city of Palanthas, where young heroes like Lyriel Silverbreeze and Gareth Ironblade find themselves drawn into a web of intrigue and danger. As dark forces stir and ancient artifacts beckon, Lyriel, Gareth, and their companions—Elara Windrider, Alden the mage, Kalen Nightshade, and Seren Windrider—must confront shadows from the past and the looming threat of a sinister mage seeking to upset the balance of Krynn. With each step they take, their destinies intertwine, shaping the future of their world amidst whispers of Raistlin's legacy and the specter of new conflicts.",
  "cover_art": "placeholder.png",
  "created_at": "2022-06-19T15:45:30Z"
}
,
{
  "author_id": 6,
  "title": "Echoes of the Ancients",
  "blurb": "Echoes of the Ancients follows Lia, an adept healer of the Cerulean Order, and Thane, a warrior of the Silver Guard, as they are thrust into a world of dark sorcery and ancient artifacts. Captured by the Nightshades, followers of the malevolent sorcerer Maldrake, Lia discovers a latent power within herself that Maldrake seeks to exploit. With the help of Thane and their newfound allies, they escape into the mystical forest, pursued by the Nightshades and their sinister leader. As they uncover the secrets of an ancient temple and a powerful artifact, Lia and Thane must navigate treacherous alliances and confront the darkness that threatens to consume their world. With each step, they draw closer to a final confrontation that will test their courage and resolve.",
  "cover_art": "placeholder.png",
  "created_at": "2022-01-01T15:45:30Z"
}
,
{
  "author_id": 6,
  "title": "The Guardian and the Magician",
  "blurb": "The Guardian and the Magician intertwines the lives of Arin, protector of the enchanted glade Elantris, and Alexei, a young mage with a secret druidic heritage. Arin, bound by ancient duty, watches over Elantris—a mystical sanctuary teeming with magical creatures and potent energies. Her tranquil existence is disrupted by the arrival of outsiders, forcing her to confront the isolation of her magical world. Meanwhile, Alexei navigates the complexities of a magical academy, where his affinity for nurturing nature clashes with his peers' pursuit of power. His hidden druidic lineage, revealed through a friendship with the ambitious Liora, reshapes his understanding of magic and earns him recognition in unexpected ways. As their paths intertwine, Arin and Alexei discover that their fates are linked by the very essence of magic itself, leading them on a journey of self-discovery and the rediscovery of ancient truths.",
  "cover_art": "placeholder.png",
  "created_at": "2022-01-01T15:45:30Z"
}
,
{
  "author_id": 7,
  "title": "The Initiation of Shadows",
  "blurb": "The Initiation of Shadows begins in 'The Wandering Quill,' a quaint bookshop in Albion, where Lena, the owner, leads a quiet life surrounded by books and routine. One fateful morning, a mysterious visitor named Aelarion enters seeking a legendary book, 'The Chronicle of Shadows,' rumored to hold ancient magic and secrets of otherworldly realms. Joined by Elliot, a regular customer with a passion for the occult, Lena embarks on a journey beyond her wildest imagination. As they uncover hidden doors and mystical books, Lena finds herself initiated into a new reality governed by 'The System,' where she must choose a class and navigate a tutorial to harness her newfound abilities. With danger looming and worlds at stake, Lena must embrace her role in this unfolding adventure, discovering courage, friendship, and the true nature of magic.",
  "cover_art": "placeholder.png",
  "created_at": "2022-03-01T15:45:30Z"
}
,
{
  "author_id": 8,
  "title": "Whispering Tree Chronicles: Quest for the Lunar Lotus",
  "blurb": "Whispering Tree Chronicles: Quest for the Lunar Lotus begins in the Mystic Woods, where Aria, a spirited girl from the Sun Clan, faces the Rite of Renewal under the ancient Whispering Tree. Despite her dreams of becoming a Seer, Aria is branded as Spiritless when the tree remains silent upon her touch. Undeterred, she embarks on a journey of self-discovery, uncovering hidden powers and ancient secrets within the Mystic Woods. Guided by the wise owl Ori and the spirit Elandor, Aria learns to harness her unique abilities and redefine her destiny.\n\nIn Sacred Valley, Renna of the Azure Peak Clan seeks the mythical Lunar Lotus to save her sick brother. Teaming up with Kael, a knowledgeable local, Renna navigates the bustling marketplace and clandestine paths to the forbidden gardens controlled by the Fallen Leaf School. Their quest for the Lunar Lotus is fraught with danger as they face rival sacred artists and unforeseen challenges. With determination and strategic planning, Renna and Kael set out under cover of night, ready to confront whatever dangers await in their pursuit of the legendary flower.\n\nWhispering Tree Chronicles intertwines the tales of Aria and Renna, showcasing their courage, resilience, and quest for personal growth against the backdrop of mystical forests and hidden valleys. As they challenge tradition and confront adversaries, both young women discover the true extent of their abilities and the strength that comes from forging their own paths.",
  "cover_art": "placeholder.png",
  "created_at": "2019-07-12T15:45:30Z"
}
,
{
  "author_id": 8,
  "title": "Secrets of Eldarion",
  "blurb": "Secrets of Eldarion follows the adventures of Kael and Elara in the mystical forests of Farwood. In Chapter One: Farwood, Kael, a novice ranger, and Elara, a budding mage, journey to the Heartstone Glade, seeking a powerful relic that enhances magical abilities. Amidst the ancient trees and magical creatures, they face a shadowy figure intent on claiming the Heartstone's power for himself. With Elara's newfound magical prowess and Kael's protective instincts, they emerge victorious, their bond strengthened by their shared triumph.\n\nIn Chapter Two: Trials of the Ancients, Kael and Elara venture to the ancient ruins of Eldarion, where they uncover mysteries guarded by spectral guardians and ancient artifacts. As they navigate the ruins' treacherous depths, Elara's connection to the Heartstone amplifies her magical abilities, enabling them to overcome formidable challenges. Their discovery of a crystal amulet marks the beginning of a new quest, one that tests their unity and resolve as they unravel the secrets of the past and face the uncertainties of their future.\n\nFarwood Chronicles intertwines themes of friendship, bravery, and the pursuit of knowledge against the backdrop of enchanted forests and ancient ruins. Kael and Elara's journey is a testament to the power of perseverance and the bonds that transcend time and adversity.",
  "cover_art": "placeholder.png",
  "created_at": "2020-07-12T15:45:30Z"
}
,
{
  "author_id": 9,
  "title": "Shadows of the Black Serpent",
  "blurb": "Shadows of the Black Serpent follows Prince Elian, the reluctant heir to the throne of Eldoria. In Chapter One: The Reluctant Heir, Elian grapples with the impending responsibility of leadership as his father, King Aldric, falls gravely ill. Tasked with uniting a kingdom divided by wealth and poverty, Elian faces his fears and prepares to ascend to the throne amidst uncertainty and doubt.\n\nIn Chapter Two: The Unseen Threat, Elian confronts a new peril as reports of the Shadow Clan's resurgence reach Eldoria. Led by the enigmatic Black Serpent, this ruthless faction threatens the kingdom's stability with dark magic and ambitious schemes. Determined to protect his people, Elian delves into the underworld of Eldoria, seeking alliances and gathering intelligence to thwart the Shadow Clan's dangerous plans.\n\nEldoria Chronicles weaves a tale of courage, intrigue, and the burdens of leadership in the face of adversity. As Prince Elian navigates treacherous political waters and confronts supernatural threats, he discovers the strength within himself to safeguard his kingdom and forge a brighter future for all.",
  "cover_art": "placeholder.png",
  "created_at": "2023-10-21T15:45:30Z"
}
,
{
  "author_id": 10,
  "title": "Whispers of the Necropolis",
  "blurb": "Whispers of the Necropolis follows Lysandra and Corvin, two young necromancers seeking to break free from the strict doctrines of the Council of the Undying. In Chapter One: The Rebirth, Lysandra and Corvin embark on a daring journey into the forbidden Whispering Woods, a realm where necromantic power thrives amidst the whispers of restless spirits. Determined to uncover the ancient secrets of their craft, they face spectral apparitions and animated bones, testing their skills and courage.\n\nAs they delve deeper into the woods, they confront an ancient altar pulsating with dark energy and encounter a wraith-like guardian. To prove themselves worthy of the forbidden knowledge, they must battle skeletal warriors and harness their combined necromantic abilities. Their quest for true mastery of necromancy takes them beyond the Council’s constraints, forging a path toward understanding the essence of life and death.\n\nWhispers of the Necropolis weaves a tale of forbidden magic, perilous exploration, and the pursuit of knowledge that challenges the boundaries of mortality. Lysandra and Corvin's journey into the Whispering Woods is a testament to their determination to reshape their destiny and uncover the dark mysteries hidden within their ancient heritage.",
  "cover_art": "placeholder.png",
  "created_at": "2019-11-24T15:45:30Z"
}
,
{
  "author_id": 10,
  "title": "Shadows of the Desert",
  "blurb": "Shadows of the Desert follows Liora, a renowned necromancer who has forsaken her clan and title to roam the desolate sands of Kherith. In Chapter One: The Wandering Necromancer, Liora navigates the harsh desert landscape, guided by the whispers of forgotten spirits and the ancient power of her necromantic staff. Her journey leads her to an ancient temple buried beneath the shifting sands, where she encounters Amara, a young girl held captive by bandits intent on awakening the temple’s dormant powers.\n\nAs Liora strives to protect Amara and unravel the mysteries of the temple, she faces a shadowy adversary whose dark intentions threaten both their lives. With courage and necromantic prowess, Liora battles against the forces that seek to exploit the girl’s connection to the temple’s power, forging a bond that transcends their shared peril.\n\nShadows of the Desert weaves a tale of redemption, sacrifice, and the enduring power of compassion in the face of darkness. Liora’s journey through the desert is a testament to her resilience and her unwavering commitment to safeguarding those who cannot protect themselves.",
  "cover_art": "placeholder.png",
  "created_at": "2020-11-24T15:45:30Z"
}
,
{
  "author_id": 10,
  "title": "Whispers of the Forest",
  "blurb": "Whispers of the Forest follows Kara, a spirited young woman in the tranquil village of Alderwood, who senses an impending darkness lurking at the edge of their peaceful existence. In Chapter One: The Shattered Silence, Kara encounters Aiden, a mysterious boy with a haunting past and a solemn mission to confront the spreading darkness that threatens their village.\n\nAs Kara and Aiden embark on their journey into the ancient forest, they face daunting challenges and uncover secrets that bind them closer together. In Chapter Two: Into the Forest, they navigate through the dense woods, driven by a shared purpose and a growing sense of camaraderie. Aiden's knowledge of the darkness and Kara's intuitive connection to the forest's whispers guide them towards the ominous heart of the Shadow Grove, where they must confront the source of the encroaching darkness.\n\nWhispers of the Forest weaves a tale of courage, friendship, and the indomitable spirit of youth against the backdrop of a mystical forest teeming with secrets and peril. Kara and Aiden's journey is a testament to the strength found in unlikely alliances and the determination to protect their home from ancient malevolence.",
  "cover_art": "placeholder.png",
  "created_at": "2021-11-24T15:45:30Z"
}
,
{
  "author_id": 11,
  "title": "The Heartstone Chronicles: The Year of No One",
  "blurb": "The Heartstone Chronicles: The Year of No One unfolds in the desolate kingdom of Arathorn, cursed by perpetual winter. Rhiannon, once a humble healer, now bears the weight of her people's hope as she embarks on a perilous quest. In Chapter One: The Year of No One, she journeys through the frozen wastelands, driven by a prophecy and guided by the memory of her mentor, Eldric. Her mission: to find the legendary Heartstone of Thalor, the only artifact capable of breaking the curse.\n\nIn Chapter Two: The Trial of Shadows, Rhiannon returns triumphant with the Heartstone, but her journey is far from over. With the artifact's power in her grasp, she faces the daunting Trial of Shadows—a test of her resolve and purity. Battling through illusions and confronting dark adversaries, she harnesses the Heartstone's magic to vanquish the curse and restore Arathorn to its former glory.\n\nThe Heartstone Chronicles is a tale of resilience, magic, and the unyielding spirit of a heroine who braves the darkest depths to save her kingdom. Rhiannon's journey is a testament to the power of hope and the enduring strength found within oneself.",
  "cover_art": "placeholder.png",
  "created_at": "2011-11-24T15:45:30Z"
}
,
{
  "author_id": 11,
  "title": "The Eldara Chronicles",
  "blurb": "The Eldara Chronicles follows Elara, a young scholar driven by her fascination with ancient magic and the mysteries of Eldara. In Chapter One: Whispering Shadows, she ventures into the heart of the ancient city to uncover the secrets hidden within the Tower of Whispers. Guided by her knowledge and protected by an amulet from her mentor, she discovers the Book of Whispers—an artifact rumored to hold the wisdom of the Elders. Yet, her quest is fraught with peril as she faces the rogue sorcerer Malric, who seeks the book's power for his own dark ambitions.\n\nIn Chapter Two: Shadows of the Past, Elara returns triumphant but wary, her mind racing with the possibilities and dangers posed by the ancient knowledge. With the support of her ally Aelric, she delves deeper into the book's secrets, uncovering spells, histories, and the looming threat that shadows Eldara. As she prepares to confront the darkness spreading through the city, Elara realizes that her journey has only just begun. Armed with the wisdom of the Elders and the strength of her allies, she vows to protect Eldara from those who seek to exploit its magic.\n\nThe Eldara Chronicles is a tale of discovery, courage, and the enduring power of knowledge. Elara's journey embodies the struggle against darkness and the quest for enlightenment in a city haunted by its past.",
  "cover_art": "placeholder.png",
  "created_at": "2013-03-24T15:45:30Z"
}
,
{
  "author_id": 12,
  "title": "The Veil of Shadows",
  "blurb": "The Veil of Shadows follows the daring adventures of Lyra, a skilled archer, and Rowan, a gifted mage, as they unravel the mysteries of the Forest of Veils. In Chapter One: The Veil of Shadows, they are tasked by the king to investigate the dark magic plaguing their kingdom. Venturing deep into the forbidden grove, they confront malevolent guardians and a sinister tree radiating dark magic. Together, they must overcome ancient curses and deadly adversaries to restore balance to their land.\n\nIn Chapter Two: Echoes of the Past, Lyra and Rowan return victorious but haunted by the shadows of their recent encounter. Their journey is interrupted by Elena, a young girl whose village has fallen victim to the same dark forces. Racing against time, they bring Elena safely to the capital and uncover a deeper conspiracy threatening the kingdom. As they face new challenges and revelations, they realize that their battle against darkness has only just begun.\n\nThe Veil of Shadows is a tale of courage, friendship, and the relentless pursuit of justice in a world overshadowed by ancient malevolence. Lyra and Rowan's quest embodies the enduring strength of hope in the face of adversity.",
  "cover_art": "placeholder.png",
  "created_at": "2009-08-11T15:45:30Z"
}
,
{
  "author_id": 12,
  "title": "The Shattered Relic: Quest of Elara and Finn",
  "blurb": "The Shattered Relic: Quest of Elara and Finn follows the daring adventurers as they unearth ancient mysteries and face the consequences of awakening a powerful relic. In Chapter One: The Shattered Relic, Elara and Finn venture into the Wyrwood Forest in search of the Relic of Eryndor, only to inadvertently shatter it and transport themselves to a strange and dangerous realm. Guided by Seraphina, guardian of the Relic, they learn of their mission to reunite its scattered shards across different realms before darkness consumes everything they hold dear.\n\nIn Chapter Two: The Evershadow Trial, Elara and Finn find themselves in the dark and foreboding realm of Evershadow. To prove their worthiness, they face the Trial of Shadows, confronting their deepest fears amidst the eerie landscape. With courage and determination, they succeed in retrieving the first shard of the Relic, setting the stage for a perilous journey ahead.\n\nThe Shattered Relic is a tale of resilience, friendship, and the pursuit of redemption in the face of unforeseen consequences. Elara and Finn's quest tests their bonds and strengths as they navigate through realms teeming with ancient secrets and malevolent forces.",
  "cover_art": "placeholder.png",
  "created_at": "2010-08-11T15:45:30Z"
}
,
{
  "author_id": 13,
  "title": "Secrets of the Astral Key",
  "blurb": "Secrets of the Astral Key unfolds within the ancient city of Lyria, where Isla manages The Hidden Library, a sanctuary of rare and forbidden texts. In Chapter One: The Hidden Library, Isla encounters Liora, a Seeker of the Arcane, who seeks 'The Chronicle of Shadows'—a fabled tome rumored to hold ancient magics. As they delve into the depths of Isla's secret collection, they uncover the book and embark on a journey to decipher its mysteries.\n\nChapter Two: Unveiling the Past takes them to the Whispering Woods in search of the Astral Key, an artifact crucial to Liora's quest to save her people. Together, they navigate treacherous paths and confront spectral guardians within the ruins of the Temple of Zylara. Through courage and knowledge, they retrieve the Astral Key, setting the stage for greater challenges and discoveries ahead.\n\nThe Chronicle of Shadows is a tale of friendship, bravery, and the pursuit of ancient wisdom. Isla and Liora's journey illuminates the hidden corners of history and the enduring power of knowledge in the face of darkness.",
  "cover_art": "placeholder.png",
  "created_at": "2005-02-17T15:45:30Z"
}
,
{
  "author_id": 13,
  "title": "The Forbidden Grove",
  "blurb": "The Forbidden Grove unfolds in the ancient forest of Eldara, where Elysia, a young mage driven by a desire to save her dying village, ventures into the sacred grove under the light of a crescent moon. In Chapter One: The Forbidden Grove, she encounters Sylas, the Guardian of the Grove, who challenges her to prove her worth through three trials of heart, mind, and spirit. Overcoming each trial, Elysia earns the grove's knowledge, setting her on a path to restore her village with newfound magic.\n\nChapter Two: A New Purpose follows Elysia's return to her village, empowered by the grove's magic. She revitalizes her community, but soon faces a darker challenge—an ancient darkness awakened by her use of magic. With courage and wisdom, she confronts the Dark Enchanter's lingering malevolence, leading her allies to destroy its essence and safeguard their home.\n\nThe Forbidden Grove chronicles Elysia's journey of discovery, courage, and sacrifice as she navigates the complexities of magic and protects her people from looming threats.",
  "cover_art": "placeholder.png",
  "created_at": "2006-02-17T15:45:30Z"
}
,
{
  "author_id": 13,
  "title": "The Lost Heir",
  "blurb": "The Lost Heir begins deep within the caverns of Lumaria, where Lyria, a young elven maiden raised by a hermit after being abandoned as a child, embarks on a journey to uncover her true heritage. In Chapter One: The Lost Heir, guided by her mentor Elion's words, Lyria navigates treacherous tunnels to seek the Oracle of Lumaria. There, she discovers her royal lineage and the daunting task ahead—to reclaim her throne and vanquish the darkness plaguing her land.\n\nChapter Two: Gathering Allies follows Lyria's intensive training with Elion, preparing her for the challenges ahead. Armed with newfound knowledge, she sets out to find allies crucial to her quest. Her journey leads her to Thalor, Guardian of the Forest of Elden, who tests her worthiness with a trial that binds her to Lumaria's ancient magic. With Thalor's pledge of support, Lyria sets her sights on Torin, where she seeks Valen, a master blacksmith and warrior, whose skills will aid in her battle to restore peace to Lumaria.\n\nThe Lost Heir chronicles Lyria's journey of self-discovery, courage, and alliance-building as she faces formidable foes and embraces her destiny as Lumaria's last hope.",
  "cover_art": "placeholder.png",
  "created_at": "2007-02-17T15:45:30Z"
}
,
{
  "author_id": 13,
  "title": "The Crystal of Drakar's Hollow",
  "blurb": "In The Crystal of Drakar's Hollow, Alara, a young mage with a deep affinity for magical energies, uncovers a hidden vein of power within the enchanted mines of Drakar's Hollow. Chapter One: The Hidden Vein follows Alara's discovery of a mysterious tunnel leading to a cavern dominated by a colossal crystal pulsating with ancient magic. Her encounter with Korrin, a fellow miner consumed by ambition, sets off a battle to protect the crystal from exploitation.\n\nChapter Two: The Council's Decision explores Alara's presentation of the crystal's discovery to the council of elders. With their decision to fortify the mine against further threats, Alara assumes a leadership role in safeguarding the crystal and its potent magic. As she faces challenges and confronts adversaries like Korrin, Alara's journey becomes a test of her courage and determination to ensure the crystal's power is used for the greater good.",
  "cover_art": "placeholder.png",
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
