import { useState } from "react";
import "./CreateBook.css";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { postBookThunk } from "../../redux/book";

function CreateBook() {
  const [title, setTitle] = useState("");
  const [blurb, setBlurb] = useState("");
  const [coverArt, setCoverArt] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newBook = { title, blurb, cover_art: coverArt };
    const bookData = await dispatch(postBookThunk(newBook));
    navigate(`/books/${bookData.id}/tags`);
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
          <h4 className="create-update-book-title">Title (255 char limit)</h4>
          <input
            className="create-update-book-input"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="create-update-book-title-container">
          <h5 className="create-update-book-title">
            Cover art URL (only .png .jpg or .jpeg files)
          </h5>
          <input
            className="create-update-book-input"
            type="text"
            value={coverArt}
            onChange={(e) => setCoverArt(e.target.value)}
          />
        </div>
        <div className="create-update-book-blurb-container">
          <h4 className="create-update-book-title">Blurb (4000 char limit)</h4>
          <textarea
            value={blurb}
            onChange={(e) => setBlurb(e.target.value)}
            className="create-update-book-textarea"
          />
        </div>
        <div className="create-update-book-button-container">
          <button
            disabled={
              !title ||
              !blurb ||
              !coverArt ||
              !checkURL(coverArt) ||
              title.length > 255 ||
              blurb.length > 4000
            }
            type="submit"
          >
            Add Book
          </button>
        </div>
      </form>
    </div>
  );
}

export default CreateBook;
