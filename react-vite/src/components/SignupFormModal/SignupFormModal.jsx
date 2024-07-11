import { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { thunkSignup } from "../../redux/session";
import "./SignupForm.css";

function SignupFormModal() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [profilePic, setProfilePic] = useState("");
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();

  const profilePics = [
    "https://i.imgur.com/IMbFAhO.png",
    "https://i.imgur.com/L78qAS7.png",
    "https://i.imgur.com/kMyOzh9.png",
    "https://i.imgur.com/tSP9i2z.png",
    "https://i.imgur.com/jJBAZYU.png",
    "https://i.imgur.com/rabxZL5.png",
    "https://i.imgur.com/ppCbkEM.png",
    "https://i.imgur.com/axwpXKb.png",
    "https://i.imgur.com/1ZDZHYE.png",
    "https://i.imgur.com/B8ULFSE.png",
    "https://i.imgur.com/nrBG1gy.png",
    "https://i.imgur.com/KdBuqAf.png",
    "https://i.imgur.com/b5v6GCO.png",
    "https://i.imgur.com/vd6EQKq.png",
    "https://i.imgur.com/FLzttdQ.png",
    "https://i.imgur.com/rdKRZJQ.png",
    "https://i.imgur.com/JMulBxr.png",
    "https://i.imgur.com/PRpyoZB.png",
    "https://i.imgur.com/axrI0KB.png",
    "https://i.imgur.com/a1igDPh.png",
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      return setErrors({
        confirmPassword:
          "Confirm Password field must be the same as the Password field",
      });
    }

    const serverResponse = await dispatch(
      thunkSignup({
        email,
        username,
        password,
        profile_pic: profilePic,
      })
    );

    if (serverResponse) {
      setErrors(serverResponse);
    } else {
      closeModal();
    }
  };

  const handleProfilePicSelect = (pic) => {
    setProfilePic(pic);
  };

  const isFormValid = email && username && password && confirmPassword && profilePic;

  return (
    <div className="signup-container">
      <h1 className="signup-header-title">Sign Up</h1>
      {errors.server && <p>{errors.server}</p>}
      <form className="signup-form-container" onSubmit={handleSubmit}>
        <div>
          <label style={{ fontWeight: "bold", fontSize: "18px" }}>
            1. Email
          </label>
        </div>
        <div style={{ paddingBottom: "30px" }}>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Please enter your email"
            required
          />
          {errors.email && (
            <p
              style={{
                position: "absolute",
                color: "red",
                fontSize: "12px",
                paddingTop: "5px",
              }}
            >
              {errors.email}
            </p>
          )}
        </div>
        <div>
          <label style={{ fontWeight: "bold", fontSize: "18px" }}>
            2. Username
          </label>
        </div>
        <div style={{ paddingBottom: "30px" }}>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            placeholder="Choose a username"
          />
          {errors.username && (
            <p
              style={{
                position: "absolute",
                color: "red",
                fontSize: "12px",
                paddingTop: "5px",
              }}
            >
              {errors.username}
            </p>
          )}
        </div>
        <div>
          <label style={{ fontWeight: "bold", fontSize: "18px" }}>
            3. Password
          </label>
        </div>

        <div style={{ paddingBottom: "30px" }}>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="Choose your password"
          />
          {errors.password && (
            <p
              style={{
                position: "absolute",
                color: "red",
                fontSize: "12px",
                paddingTop: "5px",
              }}
            >
              {errors.password}
            </p>
          )}
        </div>

        <div>
          <label style={{ fontWeight: "bold", fontSize: "18px" }}>
            4. Confirm Password
          </label>
        </div>
        <div style={{ paddingBottom: "20px" }}>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            placeholder="Confirm your password"
          />
          {errors.confirmPassword && (
            <p
              style={{
                position: "absolute",
                color: "red",
                fontSize: "12px",
                paddingTop: "5px",
              }}
            >
              {errors.confirmPassword}
            </p>
          )}
        </div>
        <div className="profile-pic-selection">
          <h3 style={{ paddingBottom: "10px", paddingTop: "10px" }}>
            5. Select Profile Picture
          </h3>
          <div className="profile-pic-options">
            {profilePics.map((pic, index) => (
              <img
                key={index}
                src={pic}
                alt={`Profile ${index}`}
                className={`profile-pic ${
                  profilePic === pic ? "selected" : ""
                }`}
                onClick={() => handleProfilePicSelect(pic)}
              />
            ))}
            {errors.profilePic && (
              <p
                style={{
                  position: "absolute",
                  color: "red",
                  fontSize: "12px",
                  paddingTop: "5px",
                }}
              >
                {errors.profilePic}
              </p>
            )}
          </div>
        </div>
        <button
          className="signup-button"
          style={{
            width: "150px",
            height: "40px",
            backgroundColor: "#557492",
            color: "white",
            border: "none",
            cursor: "pointer",
            fontWeight: "bold",
          }}
          type="submit"
          disabled={!isFormValid}
        >
          Sign Up
        </button>
      </form>
    </div>
  );
}

export default SignupFormModal;
