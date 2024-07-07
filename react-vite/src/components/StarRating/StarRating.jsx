import "./StarRating.css"


function StarRating({ rating }){
    const totalStars = 5;
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    return (
      <div className="star-rating">
        {[...Array(fullStars)].map((star, index) => (
          <span key={index} className="filled-star">
            ★
          </span>
        ))}
        {hasHalfStar && (
          <span className="half-star">
            ★
          </span>
        )}
        {[...Array(totalStars - fullStars - (hasHalfStar ? 1 : 0))].map((star, index) => (
          <span key={index} className="empty-star">
            ★
          </span>
        ))}
      </div>
    );
  }

  export default StarRating;
