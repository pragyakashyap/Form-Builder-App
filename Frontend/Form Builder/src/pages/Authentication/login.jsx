import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import styles from "./authentication.module.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {login} from "../../services"
import toast from "react-hot-toast";

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
    //overflow: hidden to the body
    document.body.style.overflow = "hidden";
  

    return () => {
      // Resetting overflow when component unmounts
      document.body.style.overflow = "auto";
    };
  }, []);

  const handleBack = ()=>{
    navigate("/")
  }

  const handleLogin=async(e)=>{
    e.preventDefault();
    try {
      setLoading(true);
      const response = await login(formData);
      if (response && response.token) {
        toast.success(response.message || "Login successful!"); // Success toast
        localStorage.setItem("token", response.token);
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
  }

  return (
    <>
      <div className={styles.login}>
        <FontAwesomeIcon className={styles.icon} icon={faArrowLeft} onClick={handleBack} />

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
            placeholder="*********"
            onChange={handleChange}
          />
          <button type="submit" className={styles.loginButton}>
            Log in
          </button>
          <div className={styles.loginOption}>OR</div>
          <button className={styles.loginGoogle}>
            <div
              style={{
                borderRadius: "50%",
                backgroundColor: "white",
                padding: "2px",
                width: "20px",
                height: "20px",
              }}
            >
              <img
                style={{
                  marginTop: "3px",
                  objectFit: "contain",
                  width: "15px",
                }}
                src="Google Icon.png"
              />
            </div>
            <span style={{ marginLeft: "25%" }}>Sign In with Google</span>
          </button>
          <div className={styles.loginRegister}>
            <p>
              Don’t have an account?{" "}
              <span onClick={handleClick}>Register now</span>
            </p>
          </div>
        </form>
      </div>
      <div className={styles.triangle}>
        <img src="Group 2.png" />
      </div>
      <div className={styles.ellipse1}>
        <img src="Ellipse 1.png" />
      </div>
      <div className={styles.ellipse2}>
        <img src="Ellipse 2.png" />
      </div>
    </>
  );
};

export default Login;
