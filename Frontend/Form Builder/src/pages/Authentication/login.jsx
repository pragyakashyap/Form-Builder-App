import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import styles from "./authentication.module.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

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

  return (
    <>
      <div className={styles.login}>
        <FontAwesomeIcon className={styles.icon} icon={faArrowLeft} onClick={handleBack} />

        <form className={styles.loginForm}>
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
