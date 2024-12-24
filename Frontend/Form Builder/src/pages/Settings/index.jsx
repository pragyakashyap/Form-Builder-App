import {useState} from 'react'
import styles from "./settings.module.css"
import { useNavigate } from 'react-router-dom';

const Settings = () => {
    const [profile, setProfile] = useState({
        name: "",
        email: "",
        oldPassword: "",
        newPassword: "",
      });
    const [tempData, setTempData] = useState(profile); // Temporary data for editing
    const [formData, setFormData] = useState(profile);
    const navigate=useNavigate()
      // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTempData({ ...tempData, [name]: value });
  };
  const handleLogout = ()=>{
    navigate("/login")
  }
  return (
    <div className={styles.setting}>
        <h3>Settings</h3>
       
            <form className={styles.profileForm}>
                <input type="text" name="name" value={tempData.name} onChange={handleInputChange} placeholder='Name'/>
                <input type="email" name="email" value={tempData.email} onChange={handleInputChange} placeholder='Email'/>
                <input type="password" name="oldPassword" value={tempData.oldPassword} onChange={handleInputChange} placeholder='Old Password'/>
                <input type="password" name="newPassword" value={tempData.newPassword} onChange={handleInputChange} placeholder='New Password'/>
                <button type='submit'>Update</button>
            </form>
            <div className={styles.logOut} onClick={handleLogout}>
                <img src="Logout.png"/>
                <p>Log out</p>
            </div>
        
    </div>
  )
}

export default Settings