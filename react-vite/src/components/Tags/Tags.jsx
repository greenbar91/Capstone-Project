import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { csrfFetch } from "../../redux/csrf";

const Tags = ({ type }) => {
  const { bookId } = useParams();
  const navigate = useNavigate();
  const [selectedTags, setSelectedTags] = useState([]);
  const [existingTags, setExistingTags] = useState([]);

  const allTags = [
    "Anti-Hero Lead",
    "Dungeon",
    "Dystopia",
    "Female Lead",
    "GameLit",
    "Genetically Engineered",
    "Grimdark",
    "High Fantasy",
    "LitRPG",
    "Low Fantasy",
    "Magic",
    "Male Lead",
    "Martial Arts",
    "Multiple Lead Characters",
    "Mythos",
    "Non-Human Lead",
    "Progression",
    "Reincarnation",
    "Secret Identity",
    "Slice of Life",
    "Strategy",
    "Strong Lead",
    "Supernatural",
    "Time Loop",
    "Time Travel",
    "Urban Fantasy",
    "Villainous Lead",
    "War and Military",
    "Wuxia",
    "Xianxia",
  ];

  useEffect(() => {
    const fetchTags = async () => {
      const res = await fetch(`/api/tags/${bookId}`);

      if (res.ok) {
        const data = await res.json();
        setExistingTags(data.Tags);
        if (type === "delete") {
          setSelectedTags(data.Tags.map((tag) => tag.tag_name));
        }
      }
    };
    fetchTags();
  }, [bookId, type]);

  const handleToggle = (tag) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((x) => x !== tag) : [...prev, tag]
    );
  };

  const handleSubmit = async () => {
    const tagsToDelete = existingTags.filter(
      (tag) => !selectedTags.includes(tag.tag_name)
    );
    const tagsToAdd = selectedTags.filter(
      (tag) =>
        !existingTags.map((existingTag) => existingTag.tag_name).includes(tag)
    );

    if (tagsToDelete.length > 0) {
      await Promise.all(
        tagsToDelete.map(async (tag) => {
          await csrfFetch(`/api/tags/${bookId}/tags/${tag.id}`, {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
          });
        })
      );
    }

    if (tagsToAdd.length > 0) {
      await csrfFetch(`/api/tags/${bookId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ tags: tagsToAdd }),
      });
    }

    navigate(`/books/my_books`);
  };

  return (
    <div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "10px",
        }}
      >
        {allTags.map((tag) => (
          <label key={tag}>
            <input
              type="checkbox"
              checked={selectedTags.includes(tag)}
              onChange={() => handleToggle(tag)}
            />
            {tag}
          </label>
        ))}
      </div>
      <button type="submit" onClick={handleSubmit}>
        Submit
      </button>
    </div>
  );
};

export default Tags;
