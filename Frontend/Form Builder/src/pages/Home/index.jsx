import styles from "./home.module.css";
import WorkSpace from "./WorkSpace";
import WorkSpaceDropdown from "./WorkSpaceDropdown";
import ShareWorkspaceModal from "./ShareWorkspaceModal";
import { useState } from "react";
import { useEffect } from "react";

const Home = () => {
  const workspaces = [{ id: "workspace1", name: "Pragya Kashyap's workspace" }];

  const handleWorkspaceChange = (id) => {
    console.log("Workspace selected:", id);
  };

  const [isDarkMode, setIsDarkMode] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleTheme = () => {
    setIsDarkMode((prev) => !prev);
  };

  const handleShareWorkspace = (email) => {
    console.log(`Shared workspace with ${email}`);
    setIsModalOpen(false);
  };

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      setIsDarkMode(savedTheme === "dark");
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("theme", isDarkMode ? "dark" : "light");
    if (isDarkMode) {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
  }, [isDarkMode]);

  return (
    <div className={styles.home}>
      <div className={styles.homeNav}>
        <div className={styles.homeDropDown}>
          <WorkSpaceDropdown
            workspaces={workspaces}
            activeWorkspace={workspaces[0]}
            onWorkspaceChange={handleWorkspaceChange}
          />
        </div>
        <div className={styles.rightNav}>
          <div className={styles.themeSwitch}>
            <span>Light</span>
            <div
              className={
                isDarkMode ? `${styles.theme}` : `${styles.themeLight}`
              }
              onClick={toggleTheme}
            >
              <div className={styles.themeDiv}></div>
              <div
                className={
                  isDarkMode
                    ? `${styles.themeClick}`
                    : `${styles.themeClickLight}`
                }
              ></div>
            </div>
            <span>Dark</span>
          </div>
          <button onClick={()=>setIsModalOpen(true)}>Share</button>
        </div>
      </div>
      <hr className={styles.homeLine} />
      <div className={styles.workspace}>
        <WorkSpace />
        {isModalOpen && (
        <ShareWorkspaceModal
          onClose={() => setIsModalOpen(false)}
          onShare={handleShareWorkspace}
        />
      )}
      </div>
    </div>
  );
};

export default Home;
