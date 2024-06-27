import "./ChapterDetails.css";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Comments from "../Comments";

function ChapterDetails() {
  const [chapterObject, setChapterObject] = useState({});
  const [chapters, setChapters] = useState([]);
  const { bookId, chapterId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchChapterDetails = async () => {
      const res = await fetch(`/api/books/${bookId}/chapters/${chapterId}`);

      if (res.ok) {
        const data = await res.json();
        setChapterObject(data);
      }
    };

    const fetchChapters = async () => {
      const res = await fetch(`/api/books/${bookId}/chapters`);

      if (res.ok) {
        const data = await res.json();
        setChapters(data.Chapters);
      }
    };

    fetchChapterDetails();
    fetchChapters();
  }, [bookId, chapterId]);

  const convertNewlinesToBr = (text) => {
    return text.replace(/\n/g, "<br>");
  };

  const currentChapterIndex = chapters.findIndex((chapter) => chapter.id === parseInt(chapterId));
  const previousChapterId = currentChapterIndex > 0 ? chapters[currentChapterIndex - 1]?.id : null;
  const nextChapterId = currentChapterIndex < chapters.length - 1 ? chapters[currentChapterIndex + 1]?.id : null;

  const handlePreviousClick = () => {
    if (previousChapterId) {
      navigate(`/books/${bookId}/chapters/${previousChapterId}`);
    }
  };

  const handleNextClick = () => {
    if (nextChapterId) {
      navigate(`/books/${bookId}/chapters/${nextChapterId}`);
    }
  };

  const handleBackToIndexClick = () => {
    navigate(`/books/${bookId}`);
  };

  return (
    <div>
      <h2>{chapterObject.title}</h2>

      {chapterObject.body && (
        <div dangerouslySetInnerHTML={{ __html: convertNewlinesToBr(chapterObject?.body) }} />
      )}

      <div className="chapter-navigation">
        <button onClick={handlePreviousClick} disabled={!previousChapterId}>Previous</button>
        <button onClick={handleNextClick} disabled={!nextChapterId}>Next</button>
        <button onClick={handleBackToIndexClick}>Back to Index</button>
      </div>
      <div>
        <Comments chapterId={chapterObject.id}/>
      </div>
    </div>
  );
}

export default ChapterDetails;
