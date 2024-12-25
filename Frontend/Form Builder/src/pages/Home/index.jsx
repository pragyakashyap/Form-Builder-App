import styles from "./home.module.css";
import WorkSpace from "./WorkSpace";
import WorkSpaceDropdown from "./WorkSpaceDropdown";
import ShareWorkspaceModal from "./ShareWorkspaceModal";
import { useState } from "react";
import { useEffect } from "react";

const Home = () => {
  const [workspaces,setWorkspaces] = useState([{ id: "workspace1", name: "Pragya Kashyap's workspace" }]) 

  const handleWorkspaceChange = (id) => {
    console.log("Workspace selected:", id);
  };

  const [isLightMode, setIsLightMode] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleTheme = () => {
    setIsLightMode((prev) => !prev);
  };

  const handleShareWorkspace = (email, permission) => {
    console.log(`Shared workspace with ${email} (${permission})`);
    setWorkspaces([...workspaces, { id: `shared-${Date.now()}`, name: `${email}'s workspace`, permission }]);
    setIsModalOpen(false);
  };
  

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      setIsLightMode(!(savedTheme === "dark"));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("theme", isLightMode ? "light" : "dark");
    if (isLightMode) {
      document.body.classList.add("light");
    } else {
      document.body.classList.remove("light");
    }
  }, [isLightMode]);

  const [folders, setFolders] = useState([]);
  const [forms, setForms] = useState([]);
  const [permissions, setPermissions] = useState("edit"); // Can be "view" or "edit"

  const handleAddFolder = (folderName) => {
    setFolders([
      ...folders,
      { id: Date.now(), name: folderName },
    ]);
  };

  const handleAddForm = (formName) => {
    setForms([...forms, { id: Date.now(), name: formName }]);
  };

 

 
  
  

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
                isLightMode ? `${styles.themeLight}` : `${styles.theme}`
              }
              onClick={toggleTheme}
            >
              <div className={styles.themeDiv}></div>
              <div
                className={
                  isLightMode
                    ? `${styles.themeClickLight}`
                    : `${styles.themeClick}`
                }
              ></div>
            </div>
            <span>Dark</span>
          </div>
          <button onClick={() => setIsModalOpen(true)}>Share</button>
        </div>
      </div>
      <hr className={styles.homeLine} />
      <div className={styles.workspace}>
        <WorkSpace
          folders={folders}
          forms={forms}
          permissions={permissions}
          onAddFolder={handleAddFolder}
          onAddForm={handleAddForm}
          
        />
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
