import { useState } from "react";
import "./CreateBook.css";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { postBookThunk } from "../../redux/book";

function CreateBook() {
  const [title, setTitle] = useState("");
  const [blurb, setBlurb] = useState("");
  const [coverArt, setCoverArt] = useState("");
  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validateForm();
    if (Object.keys(newErrors).length === 0) {
      const newBook = { title, blurb, cover_art: coverArt };
      const bookData = await dispatch(postBookThunk(newBook));
      navigate(`/books/${bookData.id}/tags`);
    } else {
      setErrors(newErrors);
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!title.trim()) newErrors.title = "Title is required.";
    if (title.length > 255) newErrors.title = "Title must be less than 255 characters.";
    if (!blurb.trim()) newErrors.blurb = "Blurb is required.";
    if (blurb.length > 4000) newErrors.blurb = "Blurb must be less than 4000 characters.";
    if (!coverArt.trim()) newErrors.coverArt = "Cover art URL is required.";
    if (!checkURL(coverArt)) newErrors.coverArt = "Cover art URL must be a .png, .jpg, or .jpeg file.";
    return newErrors;
  };

  const checkURL = (url) => {
    const regex = /\.(png|jpg|jpeg)$/i;
    return regex.test(url);
  };

  return (
    <div className="create-update-book-container">
      <h2 className="create-update-book-header">Add a new book</h2>
      <form onSubmit={handleSubmit}>
        <div className="create-update-book-title-container">
          <h4 className="create-update-book-title">Title</h4>
          <input
            className="create-update-book-input"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          {errors.title && <p className="error-message">{errors.title}</p>}
        </div>
        <div className="create-update-book-title-container">
          <h5 className="create-update-book-title">
            Cover art URL
          </h5>
          <input
            className="create-update-book-input"
            type="text"
            value={coverArt}
            onChange={(e) => setCoverArt(e.target.value)}
          />
          {errors.coverArt && <p className="error-message">{errors.coverArt}</p>}
        </div>
        <div className="create-update-book-blurb-container">
          <h4 className="create-update-book-title">Blurb</h4>
          <textarea
            value={blurb}
            onChange={(e) => setBlurb(e.target.value)}
            className="create-update-book-textarea"
          />
          {errors.blurb && <p className="error-message">{errors.blurb}</p>}
        </div>
        <div className="create-update-book-button-container">
          <button type="submit">
            Add Book
          </button>
        </div>
      </form>
    </div>
  );
}

export default CreateBook;
