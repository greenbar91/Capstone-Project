# FantasyScribe

Discover adventure through fantastic worlds and characters on FantasyScribe! 

![](https://image-storage-portfolio.s3.us-east-2.amazonaws.com/x3jxcWU+-+Imgur.png)

Come read new and exciting works by your favorite new authors while discussing and supporting their novels. Watch their fantasy adventures unfold each week as new chapters and books are added. 

# Overview
FantasyScribe is a site for new and veteran authors and their readers to share their love for reading, writing and discussing fantasy novels as they are written. Developed in order to shine the light on upcoming fantasy stars, FantasyScribe is your one stop shop for anything fantasy novel related. With countless features for both authors and readers, FantasyScribes' ease of use and beautiful design is the complete package.

On FantasyScribe, users can:

* Select from an ever expanding collection of novels that are constantly having new pages and chapters added.
  <div align="center">   
  <img src="https://image-storage-portfolio.s3.us-east-2.amazonaws.com/allbooks.png" alt="drawing" width="500" height="500" />
  </div>


* Read the newest books and review their favorite authors
  <div align="center">
   <img src="https://image-storage-portfolio.s3.us-east-2.amazonaws.com/bookdetails.png" alt="drawing" width="500" height="500"/>
  </div>


* Read the newest chapters in a sleek format
  <div align="center">
   <img src="https://image-storage-portfolio.s3.us-east-2.amazonaws.com/chapterdetails.png" alt="drawing" width="500" height="500"/>
  </div>

* Write new books/chapters with the Author Dashboard
  <div align="center">
   <img src="https://image-storage-portfolio.s3.us-east-2.amazonaws.com/authordashboard.png" alt="drawing" width="500" height="500"/>
  </div>

# Index

- [API Docs](https://github.com/greenbar91/Capstone-Project/wiki/API-Docs)
- [Database Schema](https://github.com/greenbar91/Capstone-Project/wiki/Database-Schema)
- [Feature List](https://github.com/greenbar91/Capstone-Project/wiki/Feature-List)
- [User Stories](https://github.com/greenbar91/Capstone-Project/wiki/User-Stories)
- [Wireframe](https://github.com/greenbar91/Capstone-Project/wiki/Wireframe)

# Installation
1. Clone the repository
* `git clone https://github.com/greenbar91/Capstone-Project.git`
  * `cd capstone`

2. Install dependencies in main directory and in /react-vite
  * `pipenv install -r requirements.txt`
  * `cd /react-vite` && `npm install`

3. Set up environment variables
* Create a .env and .flaskenv file in the root directory and add your configuration details:
   * .flaskenv `FLASK_APP=app
FLASK_DEBUG=true
FLASK_RUN_PORT=8000
`
   * .env `DATABASE_URL=sqlite:///dev.db`

5. Run database migrations
* Use flask to run the migrations and set up your database/seeds in the home directory.

   * `flask run db migrate` && `flask run db upgrade` &&  `flask run seed all`

5. Run the development server
* Using two terminal windows.
  * `flask run` in root directory and `npm run dev` in /react-vite
 
# Technologies Used

- JavaScript
- React/Redux
- CSS
- Python
- Flask/SQLAlchemy


# Technical showcase

One of the features I wanted most on my landing page was a recommended books list using an algorithm based on a users already favorited books. I went through a few variations, including a weighted tier system that gave certain tags a higher weight but I decided it was too arbitrary and finalized on an equal weighting to insure all books would be sorted without bias. Using a mix of sets and lists, I was able to optimize the run time of this api call to reduce loading time on the frontend and ensure better UX. Eventually I want to add random seeds to all generated users in order to fill the initial recommended books until enough books are favorited.

![](https://image-storage-portfolio.s3.us-east-2.amazonaws.com/capstonerec.png)

Another challenge I had was coming up with a way for my Recommended Books and Popular Books to show as a sliding list, showing a certain amount of books per "page" and seamlessly translating between them. In order to do this I needed to seperate the list and toggle between previous and next states.

![](https://image-storage-portfolio.s3.us-east-2.amazonaws.com/prevnext.png)

Next, I needed to adjust the shown books based on the current state index so only the 5 books on the first or second page would be shown.

![](https://image-storage-portfolio.s3.us-east-2.amazonaws.com/translateX.png)

Lastly, I needed to make sure that my styling would follow these rules without clipping and being adjustable for various resolutions.

![](https://image-storage-portfolio.s3.us-east-2.amazonaws.com/slideCSS.png)



# Challenges

Another feature that I heavily leaned on (and is a key component in book sites) is tags to represent sub-genres or other specified terms in order to better categorize books. All of the initial setup was fairly simple but I came across a challenge when trying to delete or edit tags from the frontend. Because I had set up my delete method to only accept single tags I wanted a DRY method to accept multiple tags when deleting/updating. After looking through docs and old lessons, I remembered that `Promise.all()` accounts for this situation perfectly! Using this method I could write a single statement in my handleSubmit for both `POST` and `DELETE`. 

![](https://image-storage-portfolio.s3.us-east-2.amazonaws.com/tagsEX.png)

One challenge I came across when working on my chapter component was realizing that my texts from seeds and new chapters was showing as a single block of text, even with `\n` being used in my pre-seeded chapters. After researching the interaction between json strings and python dicts, I couldn't figure out how to get the json to recognize `\n` as a linebreak when showing in the browser. However, I eventually remembered a way to convert using HTML directly instead of having to map over the entire text and replacing/adding newlines. 

![](https://image-storage-portfolio.s3.us-east-2.amazonaws.com/BRcode.png)

After seeing that `dangerouslySetInnerHTML` worked, I simply added a regex to replace any `\n` with `<br>` and got my desired result!

![](https://image-storage-portfolio.s3.us-east-2.amazonaws.com/BRregex.png)

