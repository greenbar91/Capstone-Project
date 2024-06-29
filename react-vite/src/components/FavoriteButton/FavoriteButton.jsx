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
      <div>{favorited ? "Unfavorite" : "Favorite"}</div>
      <FaHeart
        onClick={handleFavoriteToggle}
        style={{
          color: favorited ? "red" : "gray",
          cursor: "pointer",
        }}
      ></FaHeart>
    </div>
  );
};

export default FavoriteButton;
