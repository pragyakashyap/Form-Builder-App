import styles from "./home.module.css";
import WorkSpaceDropdown from "./WorkSpaceDropdown";
import { useState } from "react";
import {useNavigate} from "react-router-dom"

const Home = () => {
  const [workspaces, setWorkspaces] = useState([
    { id: "1", name: "My Workspace" },
    { id: "2", name: "Shared Workspace 1"},
  ]); // Dummy data for workspaces
  const [activeWorkspace, setActiveWorkspace] = useState("1"); // Default to the first workspace
  
  const navigate =  useNavigate()
  // Handle workspace switching
  const handleWorkspaceChange = (value) => {
    if (value === "Settings") {
      navigate("/settings"); // Navigate to the Settings page
    } else if (value === "Logout") {
      console.log("Logging out...");
      navigate("/login"); // Redirect to the login page
    } else{
    setActiveWorkspace(value);
    }
  };

  return (
    <div className={styles.home}>
      <div className={styles.homeNav}>
        <div className={styles.homeDropDown}>
          <WorkSpaceDropdown
            workspaces={workspaces}
            activeWorkspace={activeWorkspace}
            onWorkspaceChange={handleWorkspaceChange}
          />
        </div>
        <div className={styles.themeSwitch}>
            <span>Light</span>
            <div className={styles.theme}>
                <div className={styles.themeDiv}>

                </div>
                <div className={styles.themeClick}></div>
            </div>
            <span>Dark</span>
        </div>
        <button>Share</button>
      </div>
    </div>
  );
};

export default Home;
