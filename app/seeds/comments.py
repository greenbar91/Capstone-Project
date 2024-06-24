from datetime import datetime
from app.models import db, Comment, environment, SCHEMA
from sqlalchemy.sql import text

def seed_comments():
    comments_data = [
   {
    "user_id": 2,
    "chapter_id": 1,
    "body": "I'm really intrigued by Kara's determination. I hope the council sees the value in her strategy!",
    "created_at": "2020-06-20T10:30:00Z"
},
{
    "user_id": 3,
    "chapter_id": 1,
    "body": "Lorian's defection adds a great twist to the story. Can't wait to see how this plays out.",
    "created_at": "2020-06-21T08:15:00Z"
},
{
    "user_id": 4,
    "chapter_id": 1,
    "body": "The description of Silvanesti and the council dynamics is so vivid. Excellent start!",
    "created_at": "2020-06-22T09:45:00Z"
},{
        "user_id": 3,
        "chapter_id": 2,
        "body": "The intensity of the storm and Lorien's determination really set the stage for an epic tale of survival and sacrifice.",
        "created_at": "2020-07-22T09:30:00Z"
    },
    {
        "user_id": 5,
        "chapter_id": 2,
        "body": "The imagery of the storm and its aftermath is vivid and haunting. Lorien's journey through adversity is gripping.",
        "created_at": "2020-07-20T11:15:00Z"
    },
    {
        "user_id": 4,
        "chapter_id": 2,
        "body": "Lorien's character development in the face of tragedy is compelling. I'm eager to see how he rises from this moment.",
        "created_at": "2020-07-21T08:45:00Z"
    },
    {
        "user_id": 5,
        "chapter_id": 3,
        "body": "The bravery of Elyndra and her companions is truly inspiring. This chapter vividly captures the chaos and determination in the face of overwhelming odds.",
        "created_at": "2021-06-22T10:30:00Z"
    },
    {
        "user_id": 9,
        "chapter_id": 3,
        "body": "I was on the edge of my seat throughout this chapter! The imagery of the battle and Elyndra's resilience really pulled me into the story.",
        "created_at": "2021-06-21T16:45:00Z"
    },
    {
        "user_id": 11,
        "chapter_id": 3,
        "body": "The interaction between Elyndra and the draconian soldier was a poignant moment amidst the chaos of battle. Looking forward to seeing how this conflict unfolds!",
        "created_at": "2021-06-20T09:15:00Z"
    },
    {
        "user_id": 6,
        "chapter_id": 4,
        "body": "Seraphina's leadership and Kael's mysterious presence added a compelling layer to this intense battle scene. I'm eager to see how they'll strategize and overcome the dragons' onslaught.",
        "created_at": "2021-07-22T08:00:00Z"
    },
    {
        "user_id": 10,
        "chapter_id": 4,
        "body": "The description of the battle and the characters' determination kept me glued to every word. This chapter brilliantly captures the tension and heroism of defending against overwhelming forces.",
        "created_at": "2021-07-21T13:30:00Z"
    },
    {
        "user_id": 13,
        "chapter_id": 4,
        "body": "I was particularly drawn to Elara's bravery and quick thinking amidst the chaos. Her actions added a personal touch to the larger narrative of the Citadel's defense.",
        "created_at": "2021-07-20T09:45:00Z"
    },
    {
        "user_id": 4,
        "chapter_id": 5,
        "body": "The introduction of Lyriel and Gareth sets a promising tone for this new adventure. I'm intrigued by the convergence of their paths and the looming threat from Neraka.",
        "created_at": "2022-06-22T10:15:00Z"
    },
    {
        "user_id": 7,
        "chapter_id": 5,
        "body": "The contrast between Lyriel's curiosity and Gareth's sense of duty adds depth to their characters. I'm curious to see how their journeys will intertwine in the face of impending danger.",
        "created_at": "2022-06-21T14:30:00Z"
    },
    {
        "user_id": 11,
        "chapter_id": 5,
        "body": "The mysterious figure in Neraka adds an intriguing layer of suspense. I'm eager to learn more about their role in the unfolding events of Krynn's fate.",
        "created_at": "2022-06-20T09:45:00Z"
    }
    ,
    {
        "user_id": 2,
        "chapter_id": 6,
        "body": "The dynamic between Lyra and Kalen is captivating, especially their bond as siblings facing danger together. The introduction of the dark mage adds a thrilling twist to their quest.",
        "created_at": "2022-07-22T08:30:00Z"
    },
    {
        "user_id": 8,
        "chapter_id": 6,
        "body": "I enjoyed the mix of magic and adventure in this chapter. Lyra's determination and Thalanis's wisdom make for a strong team. Looking forward to seeing how they handle the crystal orb.",
        "created_at": "2022-07-20T12:45:00Z"
    },
    {
        "user_id": 12,
        "chapter_id": 6,
        "body": "The temple scene was intense! The battle against the dark mage kept me on the edge of my seat. I'm curious to see what role the crystal orb will play in the unfolding story.",
        "created_at": "2022-07-21T09:00:00Z"
    }
    ,
      {
        "user_id": 4,
        "chapter_id": 7,
        "body": "Lia's escape was thrilling to read! The tension and atmosphere of the misty forest were vividly described, making the scene feel immersive and urgent.",
        "created_at": "2022-01-04T10:30:00Z"
    },
    {
        "user_id": 9,
        "chapter_id": 7,
        "body": "Maldrake's introduction was chilling. The way Lia used her magic to escape was clever and intense. I'm intrigued to see how she and Thane will confront the Nightshades next.",
        "created_at": "2022-01-03T16:45:00Z"
    },
    {
        "user_id": 11,
        "chapter_id": 7,
        "body": "The teleportation twist was unexpected and added a thrilling element to the escape. Lia and Thane's determination to fight back against Maldrake sets up an exciting conflict ahead.",
        "created_at": "2022-01-02T14:15:00Z"
    },
     {
        "user_id": 2,
        "chapter_id": 8,
        "body": "Lyra's connection with the guardian and the discovery of the artifact added an intriguing mystical element to the story. The tension during the battle with the guardian and the impending threat of the Night Brigade kept me on the edge of my seat!",
        "created_at": "2022-02-04T09:30:00Z"
    },
    {
        "user_id": 5,
        "chapter_id": 8,
        "body": "The temple setting was vividly described, and the stakes felt high throughout the chapter. Lyra's determination and Elysia's bravery made for a compelling duo in their fight against the Night Brigade.",
        "created_at": "2022-02-03T14:45:00Z"
    },
    {
        "user_id": 10,
        "chapter_id": 8,
        "body": "I loved how Lyra's character developed through her connection with the guardian and the artifact. The scene where they make their escape amidst the chaos of battle was exhilarating and left me eager for more.",
        "created_at": "2022-02-02T11:15:00Z"
    },
     {
        "user_id": 4,
        "chapter_id": 9,
        "body": "Arin's connection with the enchanted glade and her deep bond with nature make for a captivating read. The descriptions of Elantris evoke a sense of wonder and mystery, drawing me into the magical world she protects.",
        "created_at": "2022-01-04T08:30:00Z"
    },
    {
        "user_id": 8,
        "chapter_id": 9,
        "body": "I was enchanted by Arin's serene yet powerful presence in the forest. The contrast between the magical glade and the ordinary world outside adds depth to the narrative, highlighting the importance of her role as guardian.",
        "created_at": "2022-01-03T14:45:00Z"
    },
    {
        "user_id": 11,
        "chapter_id": 9,
        "body": "The concept of Elantris as a sanctuary filled with ancient magic is intriguing. Arin's dedication to her duty and her connection with the Great Tree paint a vivid picture of a guardian deeply rooted in her environment.",
        "created_at": "2022-01-02T11:15:00Z"
    },
     {
        "user_id": 7,
        "chapter_id": 10,
        "body": "Alexei and Liora's partnership in blending druidic and arcane magic is inspiring. Their story illustrates the power of collaboration and acceptance of different magical traditions within the academy.",
        "created_at": "2022-02-04T09:15:00Z"
    },
    {
        "user_id": 12,
        "chapter_id": 10,
        "body": "I enjoyed reading about Alexei's journey to embrace his druidic heritage amidst the structured environment of the magical academy. The contrast between his peaceful garden work and the trials adds depth to his character.",
        "created_at": "2022-02-03T16:30:00Z"
    },
    {
        "user_id": 9,
        "chapter_id": 10,
        "body": "Liora's character development alongside Alexei's journey was well portrayed. Their friendship and mutual respect for each other's magical abilities make this chapter a delightful read.",
        "created_at": "2022-02-02T11:45:00Z"
    },
     {
        "user_id": 3,
        "chapter_id": 11,
        "body": "The introduction of Aelarion and the mysterious quest for 'The Chronicle of Shadows' immediately captured my imagination. I'm curious to see how Lena and Elliot's journey unfolds in this magical adventure.",
        "created_at": "2022-03-03T08:30:00Z"
    },
    {
        "user_id": 10,
        "chapter_id": 11,
        "body": "Lena's encounter with Aelarion brings an intriguing blend of mystery and fantasy to the story. The dynamic between the characters promises an exciting exploration into unknown realms.",
        "created_at": "2022-03-02T14:45:00Z"
    },
    {
        "user_id": 5,
        "chapter_id": 11,
        "body": "The setting of 'The Wandering Quill' and the introduction of Aelarion set a vivid stage for what promises to be a captivating adventure. I'm excited to follow Lena and Elliot's journey into the world of magic and myth.",
        "created_at": "2022-03-02T10:15:00Z"
    },
     {
        "user_id": 4,
        "chapter_id": 12,
        "body": "Lena's unexpected journey into 'The System' is a thrilling twist! The introduction of classes and skills adds a fascinating layer to the story. I'm eager to see how she navigates this new reality as a Mage.",
        "created_at": "2022-04-03T10:00:00Z"
    },
    {
        "user_id": 9,
        "chapter_id": 12,
        "body": "The concept of 'The System' and Lena's transformation into a Mage are gripping. It's like stepping into a whole new world of possibilities. I can't wait to follow her adventures through this mysterious tutorial.",
        "created_at": "2022-04-02T15:30:00Z"
    },
    {
        "user_id": 11,
        "chapter_id": 12,
        "body": "Chapter Two's introduction of Lena's encounter with 'The System' is brilliantly executed. The blend of fantasy and game-like elements is refreshing. I'm intrigued to see how Lena's character develops in this intriguing setup.",
        "created_at": "2022-04-01T18:45:00Z"
    },
    {
    "user_id": 3,
    "chapter_id": 13,
    "body": "Aria's journey through the Mystic Woods is captivating! I love how she defies expectations and discovers her true potential.",
    "created_at": "2019-07-15T00:00:00Z"
  },
  {
    "user_id": 9,
    "chapter_id": 13,
    "body": "The Whispering Tree scene gave me chills! Aria's determination to find her path is truly inspiring.",
    "created_at": "2019-07-14T00:00:00Z"
  },
  {
    "user_id": 4,
    "chapter_id": 13,
    "body": "The mystical atmosphere of the Mystic Woods is beautifully depicted. Aria's connection with nature is so vivid!",
    "created_at": "2019-07-13T00:00:00Z"
  },
   {
    "user_id": 2,
    "chapter_id": 14,
    "body": "Renna and Kael's quest for the Lunar Lotus is gripping! The tension and determination in their journey are palpable.",
    "created_at": "2019-08-15T00:00:00Z"
  },
  {
    "user_id": 6,
    "chapter_id": 14,
    "body": "I love the dynamic between Renna and Kael. Their partnership feels genuine and adds depth to the story.",
    "created_at": "2019-08-14T00:00:00Z"
  },
  {
    "user_id": 10,
    "chapter_id": 14,
    "body": "The Moonlit Tavern scene sets a perfect atmosphere for planning their risky adventure. Excited to see where their quest leads!",
    "created_at": "2019-08-13T00:00:00Z"
  },
   {
    "user_id": 4,
    "chapter_id": 15,
    "body": "Kael and Elara's adventure in Farwood is captivating! The Heartstone Glade scene was especially thrilling.",
    "created_at": "2020-07-15T00:00:00Z"
  },
  {
    "user_id": 9,
    "chapter_id": 15,
    "body": "I loved the dynamic between Kael and Elara. Their friendship and bravery shine throughout the chapter.",
    "created_at": "2020-07-14T00:00:00Z"
  },
  {
    "user_id": 11,
    "chapter_id": 15,
    "body": "The description of Farwood and the magical elements are beautifully written. I felt transported into the forest!",
    "created_at": "2020-07-13T00:00:00Z"
  },
   {
    "user_id": 5,
    "chapter_id": 16,
    "body": "Kael and Elara's exploration of the ancient ruins was thrilling! The encounter with the spectral guardians was particularly gripping.",
    "created_at": "2020-08-15T00:00:00Z"
  },
  {
    "user_id": 10,
    "chapter_id": 16,
    "body": "I loved the magical atmosphere in Eldarion's ruins. The description of the artifacts and their powers was captivating.",
    "created_at": "2020-08-14T00:00:00Z"
  },
  {
    "user_id": 12,
    "chapter_id": 16,
    "body": "The bond between Kael and Elara grows stronger with each chapter. Their teamwork in facing challenges is inspiring!",
    "created_at": "2020-08-13T00:00:00Z"
  },
  {
    "user_id": 3,
    "chapter_id": 17,
    "body": "Prince Elian's journey from uncertainty to leadership is inspiring. His nighttime walks among his people show his genuine commitment to understanding their lives.",
    "created_at": "2023-10-24T00:00:00Z"
  },
  {
    "user_id": 6,
    "chapter_id": 17,
    "body": "I admire Elian's courage to step into his role despite his doubts. His dedication to bridging the gap between the palace and the city is commendable.",
    "created_at": "2023-10-23T00:00:00Z"
  },
  {
    "user_id": 11,
    "chapter_id": 17,
    "body": "The contrast between palace life and the struggles of the common people adds depth to Elian's character. I look forward to seeing how he navigates these challenges.",
    "created_at": "2023-10-22T00:00:00Z"
  },
   {
    "user_id": 4,
    "chapter_id": 18,
    "body": "The intrigue and danger introduced by the Shadow Clan's new leader, the Black Serpent, add an exciting twist to Elian's journey. I'm curious to see how he'll navigate this escalating threat.",
    "created_at": "2023-11-24T00:00:00Z"
  },
  {
    "user_id": 7,
    "chapter_id": 18,
    "body": "Elian's decision to gather intelligence from the streets of Eldoria shows his dedication to understanding and protecting his kingdom. The Black Serpent's presence raises the stakes dramatically.",
    "created_at": "2023-11-23T00:00:00Z"
  },
  {
    "user_id": 12,
    "chapter_id": 18,
    "body": "The emergence of the Black Serpent as a formidable adversary adds a thrilling element to Elian's leadership journey. I'm eager to see how he strategizes to defend Eldoria against this unseen threat.",
    "created_at": "2023-11-22T00:00:00Z"
  },
  {
    "user_id": 2,
    "chapter_id": 19,
    "body": "The Whispering Woods setting adds such an atmospheric backdrop to Lysandra and Corvin's quest for deeper necromantic knowledge. Their courage in defying the Council's rules makes them intriguing protagonists.",
    "created_at": "2019-11-27T00:00:00Z"
  },
  {
    "user_id": 5,
    "chapter_id": 19,
    "body": "Lysandra and Corvin's journey into the forbidden Whispering Woods sets a thrilling tone for their exploration of necromancy beyond the Council's teachings. The encounter with the wraith promises even greater challenges ahead.",
    "created_at": "2019-11-26T00:00:00Z"
  },
  {
    "user_id": 10,
    "chapter_id": 19,
    "body": "I'm captivated by the dark allure of the Realm of Shadows and Lysandra and Corvin's quest for forbidden necromantic knowledge. The atmosphere is rich with mystery and danger.",
    "created_at": "2019-11-25T00:00:00Z"
  },
   {
    "user_id": 6,
    "chapter_id": 20,
    "body": "Lysandra and Corvin's encounter with the wraith in the Whispering Woods is gripping! The oath they swear at the ancient altar adds depth to their quest for forbidden necromantic knowledge.",
    "created_at": "2019-12-27T00:00:00Z"
  },
  {
    "user_id": 3,
    "chapter_id": 20,
    "body": "The imagery of the ancient altar and the surge of power Lysandra and Corvin experience are beautifully described. This chapter sets a promising stage for their journey into the depths of necromancy.",
    "created_at": "2019-12-26T00:00:00Z"
  },
  {
    "user_id": 1,
    "chapter_id": 20,
    "body": "I'm captivated by Lysandra and Corvin's determination and the mystical atmosphere of the Whispering Woods. The wraith's warning adds intrigue to their pursuit of forbidden magic.",
    "created_at": "2019-12-25T00:00:00Z"
  },
   {
    "user_id": 4,
    "chapter_id": 21,
    "body": "Liora's encounter with Amara in the ancient temple is both haunting and heroic. Her determination to protect the girl against the shadowy figure showcases her depth as a character.",
    "created_at": "2020-11-27T00:00:00Z"
  },
  {
    "user_id": 8,
    "chapter_id": 21,
    "body": "The setting of the desert and the ancient ruins adds such a rich atmosphere to Liora's journey. The twist with the shadowy figure was unexpected and intensified the suspense.",
    "created_at": "2020-11-26T00:00:00Z"
  },
  {
    "user_id": 11,
    "chapter_id": 21,
    "body": "Liora's decision to protect Amara despite the dangers reflects her complex morality and strength of character. This chapter sets a gripping tone for the rest of her journey.",
    "created_at": "2020-11-25T00:00:00Z"
  },
   {
    "user_id": 6,
    "chapter_id": 22,
    "body": "The introduction of Master Kaelin adds a compelling twist to Liora's journey, hinting at deeper mysteries and dangers ahead. I'm eager to see how Liora balances her duty to Amara with the guild's urgent call.",
    "created_at": "2020-12-27T00:00:00Z"
  },
  {
    "user_id": 3,
    "chapter_id": 22,
    "body": "The oasis scene beautifully contrasts the harsh desert environment with moments of respite and reflection for Liora and Amara. The arrival of Master Kaelin raises the stakes dramatically, promising a new phase in Liora's quest.",
    "created_at": "2020-12-26T00:00:00Z"
  },
  {
    "user_id": 12,
    "chapter_id": 22,
    "body": "Liora's decision to answer the call despite her bond with Amara showcases her depth of character and the complexities of her journey. Master Kaelin's appearance hints at a larger conflict brewing, which adds an exciting layer to the story.",
    "created_at": "2020-12-25T00:00:00Z"
  },
   {
    "user_id": 4,
    "chapter_id": 23,
    "body": "Kara's encounter with Aiden sets a gripping tone for their journey, blending mystery and a sense of impending danger. I'm eager to see how their partnership unfolds as they confront the darkness lurking in the woods.",
    "created_at": "2021-11-27T00:00:00Z"
  },
  {
    "user_id": 8,
    "chapter_id": 23,
    "body": "The atmosphere of Alderwood village and the introduction of Aiden create a compelling start. Kara's decision to join Aiden despite her fears reflects her courage and curiosity. I'm intrigued to learn more about the darkness they seek to confront.",
    "created_at": "2021-11-26T00:00:00Z"
  },
  {
    "user_id": 11,
    "chapter_id": 23,
    "body": "The setting of Alderwood is beautifully described, setting the stage for a mysterious and perilous journey ahead. Aiden's enigmatic presence adds a layer of suspense that promises an exciting adventure. I look forward to seeing how Kara and Aiden navigate the challenges ahead.",
    "created_at": "2021-11-25T00:00:00Z"
  },
  {
    "user_id": 5,
    "chapter_id": 24,
    "body": "The journey into the forest is beautifully depicted, setting a tense and atmospheric tone. Aiden and Kara's evolving dynamic and shared determination to confront the darkness make for compelling storytelling. I'm eager to see how they navigate the challenges ahead.",
    "created_at": "2021-12-28T00:00:00Z"
  },
  {
    "user_id": 9,
    "chapter_id": 24,
    "body": "Aiden's backstory adds depth to the unfolding plot, blending mystery with a sense of urgency. Kara's growing courage and their journey deeper into the forest create a gripping narrative. I'm curious about the rituals they will encounter in the Shadow Grove.",
    "created_at": "2021-12-27T00:00:00Z"
  },
  {
    "user_id": 12,
    "chapter_id": 24,
    "body": "The imagery of the forest and the palpable tension as Kara and Aiden face the unknown are vividly portrayed. The mention of the Shadow Grove as the source of darkness adds an intriguing layer of mystery and danger. I'm hooked and looking forward to their next steps.",
    "created_at": "2021-12-26T00:00:00Z"
  },
  {
    "user_id": 4,
    "chapter_id": 25,
    "body": "Rhiannon's journey through the cursed kingdom of Arathorn is gripping and evocative. The introduction of the Heartstone as a pivotal artifact adds depth to the narrative, and Rhiannon's determination is inspiring. I'm eager to see how she uses the Heartstone to confront the darkness that plagues her land.",
    "created_at": "2011-11-27T00:00:00Z"
  },
  {
    "user_id": 8,
    "chapter_id": 25,
    "body": "The imagery of the desolate kingdom and Rhiannon's quest to lift the curse are vividly described. The encounter with the guardian spirit and the test of worthiness add an exciting mystical element to the story. I'm intrigued to learn more about the history of the Heartstone and its role in Arathorn's fate.",
    "created_at": "2011-11-26T00:00:00Z"
  },
  {
    "user_id": 10,
    "chapter_id": 25,
    "body": "Rhiannon's transformation from a humble healer to a courageous seeker of the Heartstone is captivating. The guardian spirit's challenge and Rhiannon's display of magic create a compelling climax to the chapter. I look forward to seeing how she uses the Heartstone's power to restore Arathorn.",
    "created_at": "2011-11-25T00:00:00Z"
  },
  {
    "user_id": 2,
    "chapter_id": 26,
    "body": "Rhiannon's journey back to Arathorn with the Heartstone is filled with courage and determination. The trials she faces in the shadow realm are gripping, especially her battle against the dark figure. This chapter vividly portrays her strength and the power of hope in overcoming seemingly insurmountable odds.",
    "created_at": "2011-12-27T00:00:00Z"
  },
  {
    "user_id": 6,
    "chapter_id": 26,
    "body": "The symbolism of Rhiannon's trials resonates deeply, particularly the Trial of Shadows and her ultimate triumph over darkness. The Heartstone's role as both a physical artifact and a source of spiritual strength is beautifully depicted. This chapter is a testament to the resilience of the human spirit.",
    "created_at": "2011-12-26T00:00:00Z"
  },
  {
    "user_id": 12,
    "chapter_id": 26,
    "body": "Rhiannon's leadership and unwavering determination shine in this chapter as she faces the trials required to unlock the Heartstone's power. The description of the shadow realm and her battle with the dark figure are intense and captivating. I'm eager to see how she will restore Arathorn and lead her people forward.",
    "created_at": "2011-12-25T00:00:00Z"
  },
  {
    "user_id": 5,
    "chapter_id": 27,
    "body": "Elara's exploration of the Tower of Whispers and her confrontation with Malric are riveting. The blend of ancient magic and personal courage makes this chapter a captivating read. I'm eager to see how Elara continues to wield the power of the Book of Whispers.",
    "created_at": "2013-03-27T00:00:00Z"
  },
  {
    "user_id": 8,
    "chapter_id": 27,
    "body": "The Tower of Whispers comes alive with mystery and danger in Elara's quest for knowledge. Her struggle against Malric showcases her strength and determination. This chapter sets a thrilling tone for the journey ahead.",
    "created_at": "2013-03-26T00:00:00Z"
  },
  {
    "user_id": 13,
    "chapter_id": 27,
    "body": "Elara's encounter with Malric in the Tower of Whispers is intense and gripping. The clash of their ideologies adds depth to the story, highlighting the consequences of seeking power for selfish ends. I'm curious to see how Elara will use the Book of Whispers to shape the fate of Eldara.",
    "created_at": "2013-03-25T00:00:00Z"
  },
   {
    "user_id": 9,
    "chapter_id": 28,
    "body": "Elara's return to her cottage and her study of the Book of Whispers paints a vivid picture of her dedication and the depth of her knowledge. The introduction of Aelric adds an intriguing new dynamic to the story, setting the stage for a broader conflict ahead.",
    "created_at": "2013-04-27T00:00:00Z"
  },
  {
    "user_id": 4,
    "chapter_id": 28,
    "body": "The discovery of the Book of Whispers and Elara's determination to use its power for the good of Eldara are compelling. The addition of Aelric as a supportive ally adds depth to the narrative and hints at the challenges they will face together.",
    "created_at": "2013-04-26T00:00:00Z"
  },
  {
    "user_id": 6,
    "chapter_id": 28,
    "body": "Elara's study of the ancient texts in the Tower of Whispers and her subsequent plans to protect Eldara showcase her intellect and bravery. The arrival of Aelric signals the beginning of a strategic alliance that promises exciting developments in the chapters to come.",
    "created_at": "2013-04-25T00:00:00Z"
  },
  {
    "user_id": 5,
    "chapter_id": 29,
    "body": "Lyra and Rowan's adventure in the Forest of Veils is captivating! The description of their battle against the dark magic and the guardians of the grove kept me on the edge of my seat.",
    "created_at": "2009-08-14T00:00:00Z"
  },
  {
    "user_id": 10,
    "chapter_id": 29,
    "body": "The dynamic between Lyra and Rowan as they confront the ancient tree and its guardians is both thrilling and heartening. Their bravery and teamwork shine through brilliantly.",
    "created_at": "2009-08-13T00:00:00Z"
  },
  {
    "user_id": 2,
    "chapter_id": 29,
    "body": "The imagery in this chapter is vivid and evocative, especially in the description of the Forest of Veils and the dark magic infesting the ancient tree. Lyra and Rowan make a formidable duo against the forces of darkness.",
    "created_at": "2009-08-12T00:00:00Z"
  },
  {
    "user_id": 6,
    "chapter_id": 30,
    "body": "Lyra and Rowan's encounter with Elena adds a poignant layer to their mission. The mystery deepens, and I'm eager to see how they unravel the dark forces threatening the kingdom.",
    "created_at": "2009-09-14T00:00:00Z"
  },
  {
    "user_id": 3,
    "chapter_id": 30,
    "body": "The tension and intrigue build beautifully in this chapter. Lyra and Rowan's dedication to protecting the kingdom, coupled with the newfound threat, sets the stage for an epic quest.",
    "created_at": "2009-09-13T00:00:00Z"
  },
  {
    "user_id": 8,
    "chapter_id": 30,
    "body": "The introduction of Elena adds a human element to the story, highlighting the stakes involved in their quest. Lyra and Rowan's resolve to confront the darkness head-on is inspiring.",
    "created_at": "2009-09-12T00:00:00Z"
  },
   {
    "user_id": 5,
    "chapter_id": 31,
    "body": "Elara and Finn's journey into the unknown captivates from the start. The mystery of the Shattered Relic and the introduction of Seraphina set a thrilling tone for what promises to be an epic adventure.",
    "created_at": "2010-08-14T00:00:00Z"
  },
  {
    "user_id": 9,
    "chapter_id": 31,
    "body": "The sudden shift from the tranquil forest to a strange realm is brilliantly executed. Elara and Finn's predicament adds layers of suspense, leaving readers eager to see how they navigate this perilous journey.",
    "created_at": "2010-08-13T00:00:00Z"
  },
  {
    "user_id": 2,
    "chapter_id": 31,
    "body": "The introduction of Seraphina and the shattered relic instantly pull you into the story. Elara and Finn's determination to right their unintentional wrong sets a promising stage for the challenges ahead.",
    "created_at": "2010-08-12T00:00:00Z"
  },
  {
    "user_id": 7,
    "chapter_id": 32,
    "body": "Elara and Finn's encounter with Eldrin and the Trial of Shadows is riveting! The introduction of challenges and the eerie atmosphere of Evershadow add depth to their quest.",
    "created_at": "2010-09-14T00:00:00Z"
  },
  {
    "user_id": 4,
    "chapter_id": 32,
    "body": "The Trial Stone and the illusions they faced provide a thrilling twist to the story. Elara and Finn's determination shines through as they conquer their fears to obtain the first shard.",
    "created_at": "2010-09-13T00:00:00Z"
  },
  {
    "user_id": 11,
    "chapter_id": 32,
    "body": "The progression of Elara and Finn's journey is captivating. The Trial of Shadows adds a compelling layer to their quest, setting a promising tone for their quest to reunite the shards of the Relic.",
    "created_at": "2010-09-12T00:00:00Z"
  },
   {
    "user_id": 8,
    "chapter_id": 33,
    "body": "Isla's encounter with Liora and the discovery of 'The Chronicle of Shadows' evoke an enchanting blend of mystery and intrigue. The Hidden Library is truly a place where the line between reality and myth blurs.",
    "created_at": "2005-02-20T00:00:00Z"
  },
  {
    "user_id": 5,
    "chapter_id": 33,
    "body": "The atmosphere of The Hidden Library is beautifully depicted, making me feel as if I'm wandering through its dimly lit corridors myself. Liora's quest adds an exciting layer to the narrative.",
    "created_at": "2005-02-19T00:00:00Z"
  },
  {
    "user_id": 10,
    "chapter_id": 33,
    "body": "I'm captivated by the introduction of Liora and her quest for 'The Chronicle of Shadows.' The blend of ancient magics and the allure of forbidden knowledge make for a compelling start.",
    "created_at": "2005-02-18T00:00:00Z"
  },
  {
    "user_id": 4,
    "chapter_id": 34,
    "body": "The journey into the Whispering Woods and the discovery of the Temple of Zylara are depicted with such vividness that I felt as though I was there alongside Isla and Liora. The suspense and thrill kept me on the edge of my seat throughout.",
    "created_at": "2005-03-20T00:00:00Z"
  },
  {
    "user_id": 7,
    "chapter_id": 34,
    "body": "Isla and Liora's exploration of the temple and their encounter with the guardians gave me chills! The description of the ancient artifacts and mystical atmosphere are beautifully crafted.",
    "created_at": "2005-03-18T00:00:00Z"
  },
  {
    "user_id": 11,
    "chapter_id": 34,
    "body": "The bond forming between Isla and Liora as they face dangers together is both heartwarming and thrilling. I can't wait to see how their journey unfolds from here!",
    "created_at": "2005-03-19T00:00:00Z"
  },
  {
    "user_id": 9,
    "chapter_id": 35,
    "body": "Elysia's journey into the Forbidden Grove and her encounter with Sylas are beautifully described. The trials she faced resonate with themes of courage and determination.",
    "created_at": "2006-02-20T00:00:00Z"
  },
  {
    "user_id": 6,
    "chapter_id": 35,
    "body": "The imagery of the sacred grove and the trials Elysia undergoes are captivating. This chapter vividly captures the essence of magic and mystery.",
    "created_at": "2006-02-19T00:00:00Z"
  },
  {
    "user_id": 2,
    "chapter_id": 35,
    "body": "Elysia's quest to save her village through the Forbidden Grove's trials is inspiring. The interaction with Sylas adds depth to the mystical setting.",
    "created_at": "2006-02-18T00:00:00Z"
  },
  {
    "user_id": 5,
    "chapter_id": 36,
    "body": "Elysia's journey of using newfound magic to revive her village and then facing the ancient darkness is captivating and full of suspense. Her courage and determination shine through brilliantly.",
    "created_at": "2006-03-20T00:00:00Z"
  },
  {
    "user_id": 8,
    "chapter_id": 36,
    "body": "The blend of magic, danger, and Elysia's leadership makes this chapter a thrilling read. The confrontation with the Dark Enchanter's essence is particularly intense and gripping.",
    "created_at": "2006-03-18T00:00:00Z"
  },
  {
    "user_id": 3,
    "chapter_id": 36,
    "body": "Elysia's commitment to protecting her village, even in the face of ancient darkness, is inspiring. This chapter beautifully continues the story with its depth and suspense.",
    "created_at": "2006-03-19T00:00:00Z"
  },
  {
    "user_id": 6,
    "chapter_id": 37,
    "body": "Lyria's discovery of her royal lineage and the Oracle's prophecy set the stage for an epic journey filled with intrigue and destiny. The imagery of the underground caverns and the Oracle's sanctuary adds a mystical depth to the story.",
    "created_at": "2007-02-19T00:00:00Z"
  },
  {
    "user_id": 9,
    "chapter_id": 37,
    "body": "The revelation of Lyria's true identity as the lost heir is both captivating and poignant. I'm intrigued to see how she will navigate her destiny and confront the darkness that threatens Lumaria.",
    "created_at": "2007-02-18T00:00:00Z"
  },
  {
    "user_id": 4,
    "chapter_id": 37,
    "body": "Lyria's journey from the depths of the Ironfang Mountains to discovering her royal lineage is beautifully narrated. The Oracle's presence and the revelations in the sanctuary create an atmosphere of ancient wisdom and destiny.",
    "created_at": "2007-02-20T00:00:00Z"
  },
  {
    "user_id": 2,
    "chapter_id": 38,
    "body": "Lyria's journey to gather allies is captivating, filled with the rich lore of Lumaria and the challenges she faces in the depths of the Ironfang Mountains. I'm eager to see how she navigates the complexities of gaining Thalor's aid and what awaits her in the Stone City of Torin.",
    "created_at": "2007-03-19T00:00:00Z"
  },
  {
    "user_id": 8,
    "chapter_id": 38,
    "body": "The introduction of Thalor and the Heartstone adds a mystical depth to Lyria's quest. The forest setting and the trials she must face resonate with themes of courage and destiny, setting the stage for an epic adventure.",
    "created_at": "2007-03-18T00:00:00Z"
  },
  {
    "user_id": 11,
    "chapter_id": 38,
    "body": "Lyria's journey to discover her allies is filled with suspense and wonder. Thalor's introduction and the trial of the Heartstone create a compelling narrative that promises an exciting continuation of her quest to reclaim Lumaria.",
    "created_at": "2007-03-20T00:00:00Z"
  },
  {
    "user_id": 7,
    "chapter_id": 39,
    "body": "Alara's discovery of the crystal and her confrontation with Korrin create a gripping tale of magic and ambition deep within the mines. The imagery of the enchanted caverns and the pulsating crystal adds a vivid dimension to the story.",
    "created_at": "2008-02-19T00:00:00Z"
  },
  {
    "user_id": 4,
    "chapter_id": 39,
    "body": "The conflict between Alara and Korrin over the crystal's power is intense and compelling. Alara's courage in defending the legacy of her ancestors resonates strongly, setting a thrilling tone for the chapters to come.",
    "created_at": "2008-02-20T00:00:00Z"
  },
  {
    "user_id": 10,
    "chapter_id": 39,
    "body": "Alara's mastery of magic and her dedication to protecting the crystal showcase her character's strength and determination. The dynamic between her and Korrin adds depth to the narrative, highlighting the consequences of greed versus noble intent.",
    "created_at": "2008-02-18T00:00:00Z"
  },
   {
    "user_id": 6,
    "chapter_id": 40,
    "body": "Alara's leadership and courage in protecting the crystal against Korrin's schemes are truly inspiring. The council's decision to entrust her with such a crucial task reflects her growing importance in the community.",
    "created_at": "2008-03-19T00:00:00Z"
  },
  {
    "user_id": 3,
    "chapter_id": 40,
    "body": "The dynamic between Alara and Korrin creates a gripping narrative of power and responsibility. Alara's determination to safeguard the crystal shows her deep commitment to preserving her people's heritage.",
    "created_at": "2008-03-18T00:00:00Z"
  },
  {
    "user_id": 9,
    "chapter_id": 40,
    "body": "Alara's journey from a curious mage to a leader protecting the crystal is compelling. The council's trust in her abilities sets the stage for further development as she faces new challenges ahead.",
    "created_at": "2008-03-20T00:00:00Z"
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
