import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteFavoriteThunk, postFavoriteThunk } from "../../redux/favorite";
import { FaHeart } from "react-icons/fa6";

const FavoriteButton = ({ book }) => {
  const { id, favorites } = book;
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.session.user);
  const isFavorited = favorites?.some(
    (favorite) => favorite.user_id === currentUser.id
  );
  const [favorited, setFavorited] = useState(isFavorited);

  useEffect(() => {
    setFavorited(isFavorited);
  }, [isFavorited]);

  const handleFavoriteToggle = async () => {
    if (favorited) {
      await dispatch(deleteFavoriteThunk(id));
    } else {
      await dispatch(postFavoriteThunk(id));
    }
    setFavorited(!favorited);
  };

  return (
    <div>
      <div
        style={{
          paddingBottom: "5px",
          width: "50px",
          display: "flex",
          justifyContent: "center",
        }}
      >
        {favorited ? "Unfavorite" : "Favorite"}
      </div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <FaHeart
          onClick={handleFavoriteToggle}
          style={{
            color: favorited ? "red" : "gray",
            cursor: "pointer",
            display: "flex",
            justifyItems: "center",
            paddingBottom: "10px",
          }}
        ></FaHeart>
      </div>
    </div>
  );
};

export default FavoriteButton;
