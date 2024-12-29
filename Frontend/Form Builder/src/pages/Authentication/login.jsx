import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import styles from "./authentication.module.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../../services";
import toast from "react-hot-toast";
import Background from "./background";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/register");
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  const handleBack = () => {
    navigate("/");
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      setLoading(() => true);
      const response = await login(formData);
      console.log(response)
      if (response && response.token) {
        toast.success(response.message || "Login successful!"); // Success toast
        localStorage.setItem("userEmail", response.email);
        localStorage.setItem("token", response.token);
        localStorage.setItem("userId", response.id);
        navigate("/home");
      } else if (response && response.message) {
        toast.error(response.message || "Invalid credentials.");
      }
    } catch (error) {
      toast.error("An unexpected error occurred. Please try again.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className={styles.login}>
        <FontAwesomeIcon
          className={styles.icon}
          icon={faArrowLeft}
          onClick={handleBack}
        />

        <form className={styles.loginForm} onSubmit={handleLogin}>
          <label>Email</label>
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            onChange={handleChange}
          />
          <label>Password</label>
          <input
            type="password"
            name="password"
            placeholder="**************"
            onChange={handleChange}
          />
          <div className={styles.loginButtons}>
            <button
              disabled={loading}
              type="submit"
              className={styles.loginButton}
            >
              Log in
            </button>
            <div className={styles.loginOption}>OR</div>
            <button className={styles.loginGoogle}>
              <div
                style={{
                  borderRadius: "50%",
                  backgroundColor: "white",
                  width: "20px",
                  height: "20px",
                }}
              >
                <img
                  style={{
                    marginTop: "2px",
                    objectFit: "contain",
                    width: "15px",
                  }}
                  src="Google Icon.png"
                />
              </div>
              <span style={{ marginLeft: "25%" }}>Sign In with Google</span>
            </button>
          </div>
          <div className={styles.loginRegister}>
            <p>
              Don’t have an account?{" "}
              <span onClick={handleClick} style={{ cursor: "pointer" }}>
                Register now
              </span>
            </p>
          </div>
        </form>
      </div>
      <Background />
    </>
  );
};

export default Login;
