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
  ]

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
        profile_pic: profilePic
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

  return (
    <>
      <h1>Sign Up</h1>
      {errors.server && <p>{errors.server}</p>}
      <form onSubmit={handleSubmit}>
        <label>
          Email
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        {errors.email && <p>{errors.email}</p>}
        <label>
          Username
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </label>
        {errors.username && <p>{errors.username}</p>}
        <label>
          Password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        {errors.password && <p>{errors.password}</p>}
        <label>
          Confirm Password
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </label>
        {errors.confirmPassword && <p>{errors.confirmPassword}</p>}
        <div className="profile-pic-selection">
          <h2>Select Profile Picture</h2>
          <div className="profile-pic-options">
            {profilePics.map((pic, index) => (
              <img
                key={index}
                src={pic}
                alt={`Profile ${index}`}
                className={`profile-pic ${profilePic === pic ? "selected" : ""}`}
                onClick={() => handleProfilePicSelect(pic)}
              />
            ))}
          </div>
          {errors.profilePic && <p>{errors.profilePic}</p>}
        </div>
        <button type="submit">Sign Up</button>
      </form>
    </>
  );
}

export default SignupFormModal;
