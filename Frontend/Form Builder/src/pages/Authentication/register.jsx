import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import styles from "./authentication.module.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { register } from "../../services";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);

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

  useEffect(() => {
    //overflow: hidden to the body
    document.body.style.overflow = "hidden";

    return () => {
      // Resetting overflow when component unmounts
      document.body.style.overflow = "auto";
    };
  }, []);

  const handleBack = () => {
    navigate("/login");
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      setLoading(() => true);
      const response = await register(formData);
      if (response && response.token) {
        toast.success(response.message || "Signup successful!");
        localStorage.setItem("token", response.token);
        localStorage.setItem("userId", response.id);
        navigate("/login"); // Redirect to homepage
      } else if (response && response.message) {
        toast.error(response.message || "Something went wrong.");
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
        <form className={styles.loginForm} style={{ marginTop: "3%" }} onSubmit={handleRegister}>
          <label style={{ margin: "0.2rem 0px" }}>Username</label>
          <input
            type="String"
            name="name"
            placeholder="Enter a username"
            onChange={handleChange}
          />
          <label style={{ margin: "0.2rem 0px" }}>Email</label>
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            onChange={handleChange}
          />
          <label style={{ margin: "0.2rem 0px" }}>Password</label>
          <input
            type="password"
            name="password"
            placeholder="*********"
            onChange={handleChange}
          />
          <label style={{ margin: "0.2rem 0px" }}>Confirm Password</label>
          <input
            type="password"
            name="password"
            placeholder="*********"
            onChange={handleChange}
          />
          <button type="submit" className={styles.loginButton}>
            Sign Up
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
            <span style={{ marginLeft: "25%" }}>Sign Up with Google</span>
          </button>
          <div className={styles.loginRegister}>
            <p>
              Already have an account ? <span onClick={handleClick}>Login</span>
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

export default Register;
