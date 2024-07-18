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
  const [errors, setErrors] = useState({});

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

    const newErrors = validateForm();
    if (Object.keys(newErrors).length === 0) {
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
    } else {
      setErrors(newErrors);
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!editTitle.trim()) newErrors.title = "Title is required.";
    if (editTitle.length > 255) newErrors.title = "Title must be less than 255 characters.";
    if (!editBlurb.trim()) newErrors.blurb = "Blurb is required.";
    if (editBlurb.length > 4000) newErrors.blurb = "Blurb must be less than 4000 characters.";
    if (!editCoverArt.trim()) newErrors.coverArt = "Cover art URL is required.";
    if (!checkURL(editCoverArt)) newErrors.coverArt = "Cover art URL must be a .png, .jpg, or .jpeg file.";
    return newErrors;
  };

  const checkURL = (url) => {
    const regex = /\.(png|jpg|jpeg)$/i;
    return regex.test(url);
  };

  return (
    <div className="create-update-book-container">
      <h2 className="create-update-book-header">Edit Book</h2>
      <form onSubmit={handleEditSubmit}>
        <div className="create-update-book-title-container">
          <h4 className="create-update-book-title">Title (255 char limit)</h4>
          <input
            className="create-update-book-input"
            type="text"
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
          />
          {errors.title && <p className="error-message">{errors.title}</p>}
        </div>
        <div className="create-update-book-title-container">
          <h5 className="create-update-book-title">
            Cover Art URL (only .png .jpg or .jpeg files)
          </h5>
          <input
            className="create-update-book-input"
            type="text"
            value={editCoverArt}
            onChange={(e) => setEditCoverArt(e.target.value)}
          />
          {errors.coverArt && <p className="error-message">{errors.coverArt}</p>}
        </div>
        <div className="create-update-book-blurb-container">
          <h4 className="create-update-book-title">Blurb (4000 char limit)</h4>
          <textarea
            className="create-update-book-textarea"
            value={editBlurb}
            onChange={(e) => setEditBlurb(e.target.value)}
          />
          {errors.blurb && <p className="error-message">{errors.blurb}</p>}
        </div>
        <div className="create-update-book-button-container">
          <button type="submit">
            Update Book
          </button>
        </div>
      </form>
    </div>
  );
}

export default UpdateBooks;
