import { useEffect, useState } from "react";
import "./AuthorHomePage.css";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteBookThunk,
  postBookThunk,
  putBookThunk,
  selectAllBooks,
} from "../../redux/book";
import {
  getAllChaptersThunk,
  postChapterThunk,
  updateChapterThunk,
  deleteChapterThunk,
  selectAllChapters,
} from "../../redux/chapter";
import OpenModalButton from "../OpenModalButton/OpenModalButton";

const AuthorHomePage = () => {
  const dispatch = useDispatch();
  const [userBooks, setUserBooks] = useState([]);
  const [editBookId, setEditBookId] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editBlurb, setEditBlurb] = useState("");
  const [editCoverArt, setEditCoverArt] = useState("");
  const [title, setTitle] = useState("");
  const [blurb, setBlurb] = useState("");
  const [coverArt, setCoverArt] = useState("");
  const [chapterTitle, setChapterTitle] = useState("");
  const [chapterContent, setChapterContent] = useState("");
  const [editChapterId, setEditChapterId] = useState(null);
  const [editChapterTitle, setEditChapterTitle] = useState("");
  const [editChapterContent, setEditChapterContent] = useState("");
  const books = useSelector(selectAllBooks);
  const chapters = useSelector(selectAllChapters);

  const handleBookClick = async (bookId) => {
    await dispatch(getAllChaptersThunk(bookId));
    setEditBookId(bookId);
  };

  useEffect(() => {
    const fetchUserBooks = async () => {
      const res = await fetch("/api/books/my_books");

      if (res.ok) {
        const data = await res.json();
        setUserBooks(data.Books);
      }
    };
    fetchUserBooks();
  }, [dispatch, books]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newBook = { title, blurb, cover_art: coverArt };
    dispatch(postBookThunk(newBook));
  };

  const handleEditClick = (book) => {
    setEditBookId(book.id);
    setEditTitle(book.title);
    setEditBlurb(book.blurb);
    setEditCoverArt(book.cover_art);
  };

  const handleDeleteClick = (bookId) => {
    dispatch(deleteBookThunk(bookId));
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    const updatedBook = {
      title: editTitle,
      blurb: editBlurb,
      cover_art: editCoverArt,
    };
    dispatch(putBookThunk(editBookId, updatedBook));
    setEditBookId(null);
    setEditTitle("");
    setEditBlurb("");
    setEditCoverArt("");
  };

  const handleChapterSubmit = (e) => {
    e.preventDefault();
    const newChapter = { title: chapterTitle, body: chapterContent };
    dispatch(postChapterThunk(editBookId, newChapter));
    setChapterTitle("");
    setChapterContent("");
  };

  const handleEditChapterClick = (chapter) => {
    setEditChapterId(chapter.id);
    setEditChapterTitle(chapter.title);
    setEditChapterContent(chapter.body);
  };

  const handleEditChapterSubmit = (e) => {
    e.preventDefault();
    const updatedChapter = { title: editChapterTitle, body: editChapterContent };
    dispatch(updateChapterThunk(editBookId, editChapterId, updatedChapter));
    setEditChapterId(null);
    setEditChapterTitle("");
    setEditChapterContent("");
  };

  const handleDeleteChapterClick = (chapterId) => {
    dispatch(deleteChapterThunk(editBookId, chapterId));
  };

  return (
    <div>
      <h1>Current User Books</h1>
      <ul>
        {userBooks &&
          userBooks.map((book) => (
            <li key={book.id}>
              <div onClick={() => handleBookClick(book.id)}>{book.title}</div>

              <button onClick={() => handleEditClick(book)}>Edit</button>

              <button onClick={() => handleDeleteClick(book.id)}>Delete</button>
            </li>
          ))}
      </ul>
      {editBookId && (
        <div>
          <h2>Edit Book</h2>
          <form onSubmit={handleEditSubmit}>
            <div>
              <label>Title</label>
              <input
                type="text"
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
              />
            </div>
            <div>
              <label>Blurb</label>
              <input
                type="text"
                value={editBlurb}
                onChange={(e) => setEditBlurb(e.target.value)}
              />
            </div>
            <div>
              <label>Cover Art URL</label>
              <input
                type="text"
                value={editCoverArt}
                onChange={(e) => setEditCoverArt(e.target.value)}
              />
            </div>
            <button type="submit">Update Book</button>
          </form>
          <h2>Add a New Chapter</h2>
          <form onSubmit={handleChapterSubmit}>
            <div>
              <label>Chapter Title</label>
              <input
                type="text"
                value={chapterTitle}
                onChange={(e) => setChapterTitle(e.target.value)}
              />
            </div>
            <div>
              <label>Chapter Content</label>
              <textarea
                value={chapterContent}
                onChange={(e) => setChapterContent(e.target.value)}
              />
            </div>
            <button type="submit">Add Chapter</button>
          </form>
          <h2>Chapters</h2>
          <ul>
            {chapters.map((chapter) => (
              <li key={chapter.id}>
                <div>
                  {chapter.title}
                  <button onClick={() => handleEditChapterClick(chapter)}>Edit</button>
                  <button onClick={() => handleDeleteChapterClick(chapter.id)}>Delete</button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
      {editChapterId && (
        <div>
          <h2>Edit Chapter</h2>
          <form onSubmit={handleEditChapterSubmit}>
            <div>
              <label>Chapter Title</label>
              <input
                type="text"
                value={editChapterTitle}
                onChange={(e) => setEditChapterTitle(e.target.value)}
              />
            </div>
            <div>
              <label>Chapter Content</label>
              <textarea
                value={editChapterContent}
                onChange={(e) => setEditChapterContent(e.target.value)}
              />
            </div>
            <button type="submit">Update Chapter</button>
          </form>
        </div>
      )}
      <h2>Add a New Book</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div>
          <label>Blurb</label>
          <input
            type="text"
            value={blurb}
            onChange={(e) => setBlurb(e.target.value)}
          />
        </div>
        <div>
          <label>Cover Art URL</label>
          <input
            type="text"
            value={coverArt}
            onChange={(e) => setCoverArt(e.target.value)}
          />
        </div>
        <button type="submit">Add Book</button>
      </form>
    </div>
  );
};

export default AuthorHomePage;
