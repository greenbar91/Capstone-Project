import { NavLink } from "react-router-dom";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";

function Navigation() {
  return (
    <div className="nav-header-container">
      <div>
        <div className="nav-home-container">
          <div className="nav-home-link">
            <NavLink to="/">Home</NavLink>
          </div>
        </div>
        <div className="nav-bar-container">
          <div className="nav-bar">
            <ProfileButton />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navigation;
