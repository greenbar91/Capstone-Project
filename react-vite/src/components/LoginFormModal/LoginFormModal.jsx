import { useState } from "react";
import { thunkLogin } from "../../redux/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import "./LoginForm.css";

function LoginFormModal() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const serverResponse = await dispatch(
      thunkLogin({
        email,
        password,
      })
    );

    if (serverResponse) {
      setErrors(serverResponse);
    } else {
      closeModal();
    }
  };

  return (
    <div className="login-modal-container">
      <div className="login-header">
        <h1 style={{ cursor: "default" }}>Log In</h1>
      </div>
      <div className="login-modal">
        <form onSubmit={handleSubmit} className="login-form-container">
          <div className="email-container">
            <div>
              <label style={{ fontSize: "20px" }}>Email</label>
            </div>
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="email-errors">
            {errors.email && <p>* {errors.email}</p>}
          </div>
          <div className="password-container">
            <div>
              <label style={{ fontSize: "20px" }}>Password</label>
            </div>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="password-errors">
            {errors.password && <p>* {errors.password}</p>}
          </div>
          <div className="login-button">
            <button type="submit" disabled={!email || !password}>
              Log In
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginFormModal;
