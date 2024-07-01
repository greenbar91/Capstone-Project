import { NavLink, useNavigate } from "react-router-dom";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";
import { FaBook } from "react-icons/fa";
import { useSelector } from "react-redux";
import { FaPencil } from "react-icons/fa6";

function Navigation() {
  const navigate = useNavigate();
  const user = useSelector((state) => state.session.user);

  const handleAuthorClick = () => {
    navigate("/books/my_books");
  };

  const handleReadClick = () => {
    navigate("/books/all_books");
  };

  return (
    <div className="nav-header-container">
      <div className="nav-header">
        <div className="nav-home-container">
          <div className="nav-home-link">
            <NavLink to="/">
              <img
                src="https://i.imgur.com/F7CSJLN.png"
                style={{ maxHeight: "5vh" }}
              />
            </NavLink>
          </div>
        </div>
        {/* <div className="nav-bar-container"> */}
        <div className="nav-bar">
          <div
            className="nav-bar-buttons"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(13, 91px)",
              gridGap: "2px",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <div
              className="profile-button-container"
              style={{
                gridColumn: "1 / 2",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <ProfileButton />
            </div>
            <div
              onClick={handleReadClick}
              className="author-navlink-container"
              style={{
                gridColumn: "2 / 3",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                cursor: "pointer",
              }}
            >
              <FaBook
                className="author-navlink"
                style={{ height: "20px", width: "20px" }}
              />
              <p style={{ color: "black", paddingLeft: "5px" }}>Read</p>
            </div>
            {user && (
              <div
                style={{
                  gridColumn: "3 / 4",
                  display: "flex",
                  alignItems: "center",
                  color: "black",
                  justifyContent: "center",
                  textAlign: "center",
                  cursor: "pointer",
                }}
                onClick={handleAuthorClick}
              >
                <FaPencil />
                <p style={{ color: "black", paddingLeft: "5px" }}>Write</p>
              </div>
            )}
            <div
              className="search-bar"
              style={{
                gridColumn: "12/13",
                display: "flex",
                alignItems: "center",
                color: "black",
                justifyContent: "center",
                textAlign: "center",
                paddingLeft: "30px",
              }}
            >
              <input placeholder="Search title..."></input>
            </div>
          </div>
        </div>
      </div>
    </div>
    // </div>
  );
}

export default Navigation;
