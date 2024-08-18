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
