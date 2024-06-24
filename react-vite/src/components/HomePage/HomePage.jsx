import  { useState, useEffect } from "react";
import "./HomePage.css";
import { useDispatch, useSelector } from "react-redux";
import { getAllBooksThunk, postBookThunk, selectAllBooks} from "../../redux/book";


export default function HomePage() {
  const [title, setTitle] = useState("");
  const [blurb, setBlurb] = useState("");
  const [coverArt, setCoverArt] = useState("");
  const [userBooks,setUserBooks] = useState([])
  const [bookById, setBookById] = useState({})

  const dispatch = useDispatch();
  const books = useSelector(selectAllBooks);
  // const user = useSelector((state)=> state.session.user)

  useEffect(()=> {
    const fetchBookById = async() => {
      const res = await fetch(`/api/books/${5}`)

      if(res.ok){
        const data = await res.json()
        setBookById(data.Book)
      }
    }
    fetchBookById()
  },[ books])

  useEffect(()=> {
    const fetchUserBooks = async () => {
      const res = await fetch("/api/books/my_books")

      if(res.ok){
        const data = await res.json()
        setUserBooks(data.Books)
      }
    }
    fetchUserBooks()
  },[dispatch,books])

  useEffect(() => {
    dispatch(getAllBooksThunk());
  }, [dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newBook = {title, blurb, cover_art: coverArt };
    dispatch(postBookThunk(newBook));
  };
  // console.log(userBooks)

  return (
    <div>
      <h1>Books List</h1>
      <ul>
        {books.map((book) => (
          <li key={book.id}>{book.title}</li>
        ))}
      </ul>
      <h1>Current User Books</h1>
        <ul>
          {userBooks && userBooks?.map((book) => (
            <li key={book.id}>{book.title}<img src={book.cover_art}></img></li>

          ))}
        </ul>
      <h1>Book by Id</h1>
      {bookById && (<div>{bookById.title}</div>)}
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
}
