
import "./ReviewStars.css";

const ReviewStars = ({ filled, onClick, onMouseEnter, onMouseLeave }) => {
  return (
    <div
      className={`star ${filled ? "filled" : ""}`}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      ★
    </div>
  );
};

export default ReviewStars;
