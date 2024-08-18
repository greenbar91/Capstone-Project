import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";
import { FaBook } from "react-icons/fa";
import { useSelector } from "react-redux";
import { FaPencil } from "react-icons/fa6";
import { FaGithub } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";



function Navigation() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const user = useSelector((state) => state.session.user);

  const handleAuthorClick = () => {
    if (user) {
      navigate("/books/my_books");
    }
  };

  const handleReadClick = () => {
    navigate("/books/all_books");
  };

  return (
    <div className="nav-header-container">
      <div className="nav-header">
        <div className="github-link" style={{color:"black", fontSize:"24px", position:"absolute", top:"2%", left:"1%"}}>
          <a title="GitHub repository" style={{paddingRight:"1rem"}} href="https://github.com/greenbar91/Capstone-Project"><FaGithub/></a>
          <a title="LinkedIn profile" href="https://www.linkedin.com/in/jacob-a-dietz/"><FaLinkedin/></a>
        </div>
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
        <div className="nav-bar">
          <div
            className="nav-bar-buttons"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(13, 91px)",
              gridGap: "2px",
              justifyContent: "center",
              alignItems: "center",
              color: "white",
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
              <ProfileButton setLoading={setLoading} />
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
              <p
                style={{
                  color: "white",
                  paddingLeft: "5px",
                  fontWeight: "bold",
                }}
              >
                Read
              </p>
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
                  cursor: loading ? "not-allowed" : "pointer",
                  pointerEvents: loading ? "none" : "auto",
                }}
                onClick={handleAuthorClick}
              >
                <FaPencil style={{ color: "white" }} />
                <p
                  style={{
                    color: "white",
                    paddingLeft: "5px",
                    fontWeight: "bold",
                  }}
                >
                  Write
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navigation;
