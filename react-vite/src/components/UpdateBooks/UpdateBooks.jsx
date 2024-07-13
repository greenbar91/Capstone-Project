import { useEffect, useState } from "react";
import "./UpdateBooks.css";
import { useDispatch } from "react-redux";
import { putBookThunk } from "../../redux/book";
import { useNavigate, useParams } from "react-router-dom";

function UpdateBooks() {
  const { bookId } = useParams();
  const [editTitle, setEditTitle] = useState("");
  const [editBlurb, setEditBlurb] = useState("");
  const [editCoverArt, setEditCoverArt] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBookDetailsById = async () => {
      const res = await fetch(`/api/books/${bookId}`);

      if (res.ok) {
        const data = await res.json();
        setEditTitle(data.Book.title);
        setEditBlurb(data.Book.blurb);
        setEditCoverArt(data.Book.cover_art);
      } else {
        const errors = await res.json();
        return errors;
      }
    };
    fetchBookDetailsById(bookId);
  }, [bookId]);

  const handleEditSubmit = (e) => {
    e.preventDefault();

    const updatedBook = {
      title: editTitle,
      blurb: editBlurb,
      cover_art: editCoverArt,
    };

    dispatch(putBookThunk(bookId, updatedBook));

    setEditTitle("");
    setEditBlurb("");
    setEditCoverArt("");
    navigate(`/books/${bookId}/tags/edit`);
  };

  return (
    <div>
      <form onSubmit={handleEditSubmit}>
      <h2>Edit Book</h2>
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
          <textarea
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
    </div>
  );
}

export default UpdateBooks;
