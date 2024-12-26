import { useState } from "react";
import styles from "./settings.module.css";
import { useNavigate } from "react-router-dom";
import { updateUser } from "../../services";
import toast from "react-hot-toast";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope,faUser,faLock  } from "@fortawesome/free-solid-svg-icons";

const Settings = () => {
  const profile = {
    name: "",
    email: "",
    oldPassword: "",
    newPassword: "",
  };
  const [tempData, setTempData] = useState(profile); // Temporary data for editing
  const [formData, setFormData] = useState(profile);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTempData({ ...tempData, [name]: value });
  };
  const handleLogout = () => {
    navigate("/login");
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    if (!token) {
      alert("You must be logged in to update your profile");
      return;
    }
    try {
      setLoading(true);
      const response = await updateUser(tempData);

      setFormData(tempData);
      toast(response.message);
    } catch (error) {
      toast.error("An unexpected error occurred. Please try again.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className={styles.setting}>
      <h3>Settings</h3>

      <form className={styles.profileForm} onSubmit={handleUpdate}>
        <div className={styles.inputContainer}>
          <FontAwesomeIcon icon={faUser} className={styles.inputIcon} />
          <input
            type="text"
            name="name"
            value={tempData.name}
            onChange={handleInputChange}
            placeholder="Name"
          />
        </div>
        <div className={styles.inputContainer}>
          <FontAwesomeIcon icon={faEnvelope} className={styles.inputIcon} />
          <input
            type="email"
            name="email"
            value={tempData.email}
            onChange={handleInputChange}
            placeholder="Email"
          />
        </div>
        <div className={styles.inputContainer}>
          <FontAwesomeIcon icon={faLock} className={styles.inputIcon} />
          <input
            type="password"
            name="oldPassword"
            value={tempData.oldPassword}
            onChange={handleInputChange}
            placeholder="Old Password"
          />
        </div>
        <div className={styles.inputContainer}>
          <FontAwesomeIcon icon={faLock} className={styles.inputIcon} />
          <input
            type="password"
            name="newPassword"
            value={tempData.newPassword}
            onChange={handleInputChange}
            placeholder="New Password"
          />
        </div>
        <button disabled={loading ? true : false} type="submit">
          Update
        </button>
      </form>
      <div className={styles.logOut} onClick={handleLogout}>
        <img src="Logout.png" />
        <p>Log out</p>
      </div>
    </div>
  );
};

export default Settings;
