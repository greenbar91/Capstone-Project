import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaUserCircle } from "react-icons/fa";
import { thunkLogout } from "../../redux/session";
import OpenModalMenuItem from "./OpenModalMenuItem";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";
import { useNavigate } from "react-router-dom";
import "./ProfileButton.css";
import DeleteConfirmModal from "../DeleteConfirmModal/DeleteConfirmModal";

function ProfileButton({ setLoading }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);
  const user = useSelector((store) => store.session.user);
  const ulRef = useRef();

  const toggleMenu = (e) => {
    e.stopPropagation();
    setShowMenu(!showMenu);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      if (ulRef.current && !ulRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const closeMenu = () => setShowMenu(false);

  const logout = async () => {
    setLoading(true);
    dispatch(thunkLogout());
    setLoading(false);
    closeMenu();
    navigate("");
  };

  const handleAuthorClick = () => {
    navigate("/books/my_books");
    closeMenu();
  };

  return (
    <div className="profile-button-container" onClick={toggleMenu}>
      <FaUserCircle
        style={{ width: "20px", height: "20px", cursor: "pointer" }}
      />

      {showMenu && (
        <ul className={"profile-dropdown"} ref={ulRef}>
          {user ? (
            <>
              <li
                style={{ cursor: "pointer", fontWeight: "bold" }}
                onClick={handleAuthorClick}
              >
                Author Dashboard
              </li>
              <OpenModalMenuItem itemText="Logout" modalComponent={<DeleteConfirmModal handleDelete={()=> logout()} type="logout"/>}/>

              {/* <li
                style={{ cursor: "pointer", fontWeight: "bold" }}
                onClick={logout}
              >
                Log Out
              </li> */}
            </>
          ) : (
            <>
              <OpenModalMenuItem
                itemText="Log In"
                onItemClick={closeMenu}
                modalComponent={<LoginFormModal />}
              />
              <OpenModalMenuItem
                itemText="Sign Up"
                onItemClick={closeMenu}
                modalComponent={<SignupFormModal />}
              />
            </>
          )}
        </ul>
      )}
    </div>
  );
}

export default ProfileButton;
