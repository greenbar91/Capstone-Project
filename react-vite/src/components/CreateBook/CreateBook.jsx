import { useState } from "react";
import "./CreateBook.css"
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { postBookThunk } from "../../redux/book";

function CreateBook(){
    const [title, setTitle] = useState("");
    const [blurb, setBlurb] = useState("");
    const [coverArt, setCoverArt] = useState("");
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newBook = { title, blurb, cover_art: coverArt };
        const bookData = await dispatch(postBookThunk(newBook));
        navigate(`/books/${bookData.id}/tags`);
      };

    return (<div>
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
    </div>)
}

export default CreateBook
