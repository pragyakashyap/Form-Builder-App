import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import styles from "./authentication.module.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { register } from "../../services";
import Background from "./background";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/login");
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const validatePasswords = () => {
    if (formData.password !== formData.confirmPassword) {
      setError("Enter same password in both fields");
      return false;
    }
    setError("");
    return true;
  };

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  const handleBack = () => {
    navigate("/login");
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    if (validatePasswords()) {
      try {
        setLoading(() => true);
        const response = await register(formData);
        if (response && response.token) {
          toast.success(response.message || "Signup successful!");
          localStorage.setItem("token", response.token);
          localStorage.setItem("userId", response.id);
          navigate("/login");
        } else if (response && response.message) {
          toast.error(response.message || "Something went wrong.");
        }
      } catch (error) {
        toast.error("An unexpected error occurred. Please try again.");
        console.error(error);
      } finally {
        setLoading(false);
      }
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
        <form
          className={styles.loginForm}
          style={{ marginTop: "0.5%" }}
          onSubmit={handleRegister}
        >
          <label>Username</label>
          <input
            type="String"
            name="name"
            placeholder="Enter a username"
            onChange={handleChange}
            required
          />
          <label>Email</label>
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            onChange={handleChange}
            required
          />
          <label>Password</label>
          <input
            type="password"
            name="password"
            placeholder="*********"
            onChange={handleChange}
            required
          />
          <label className={error ? styles.errorLabel : ''}>Confirm Password</label>
          <input
            type="password"
            name="confirmPassword"
            placeholder="*********"
            onChange={handleChange}
            className={error ? styles.error : ''}
           
          />
          {error && <span className={styles.errorMessage}>{error}</span>}
          <div className={styles.loginButtons}>
            <button
              disabled={loading}
              type="submit"
              className={styles.loginButton}
            >
              Sign Up
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
              <span style={{ marginLeft: "25%" }}>Sign Up with Google</span>
            </button>
          </div>
          <div className={styles.loginRegister}>
            <p>
              Already have an account ?{" "}
              <span onClick={handleClick} style={{ cursor: "pointer" }}>
                Login
              </span>
            </p>
          </div>
        </form>
      </div>
      <Background />
    </>
  );
};

export default Register;
