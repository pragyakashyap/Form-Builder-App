import styles from "./home.module.css";
import WorkSpace from "./WorkSpace";
import WorkSpaceDropdown from "./WorkSpaceDropdown";
import ShareWorkspaceModal from "./ShareWorkspaceModal";
import { useState } from "react";
import { useEffect } from "react";
import { fetchWorkspaces, createFolder, createForm } from "../../services";

const Home = () => {
  const [workspaces, setWorkspaces] = useState([]);
  const [folders, setFolders] = useState([]);
  const [forms, setForms] = useState([]);
  const [isLightMode, setIsLightMode] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [permissions, setPermissions] = useState("edit"); // Can be "view" or "edit"

  useEffect(() => {
    const getWorkspace = async () => {
      try {
        const workspacesResponse = await fetchWorkspaces();
        console.log("API Response:", workspacesResponse);
        setWorkspaces(workspacesResponse);

        if (workspacesResponse.length > 0) {
          setFolders(workspacesResponse[0].folders || []);
          setForms(workspacesResponse[0].forms || []);
        }
      } catch (error) {
        console.error("Error fetching workspaces:", error);
      }
    };
    getWorkspace();
  }, []);

  const handleWorkspaceChange = (id) => {
    console.log("Workspace selected:", id);
    const selectedWorkspace = workspaces.find((workspace) => workspace._id === id);
    if (selectedWorkspace) {
      setFolders(selectedWorkspace.folders || []);
    } else {
      setFolders([]);
    }
  };

  const toggleTheme = () => {
    setIsLightMode((prev) => !prev);
  };

  const handleAddFolder = async (folderName) => {
    try {
      const response = await createFolder({
        name: folderName,
        workspaceId: workspaces[0]._id, // Pass the current workspace ID
      });
      console.log("Folder creation response:", response);
       // Fetch updated folders
    const updatedWorkspaces = await fetchWorkspaces();
    const updatedFolders = updatedWorkspaces.find(
      (ws) => ws._id === workspaces[0]._id
    ).folders;

    setFolders(updatedFolders); // Update folders with the latest data
    } catch (err) {
      console.error("Error creating folder:", err);
    }
  };

  const handleDeleteFolder = async (folderId) =>{
    
  }

  
  useEffect(() => {
    console.log("Updated folders:", folders);
  }, [folders]);

  const handleAddForm = async (formName, folderId = null) => {
    try {
      const response = await createForm({
        name: formName,
        workspaceId: workspaces[0]._id,
        folderId: folderId, // Pass folderId if inside a folder
      });
  
      console.log("Form creation response:", response);
      const form = response?.data || response;
  
      if (form && form.name && form._id) {
        setForms((prev) => [...prev, form]);
      } else {
        console.error("Invalid form data received from API:", form);
      }
    } catch (err) {
      console.error("Error creating form:", err);
    }
  };
  

  const handleShareWorkspace = (email, permission) => {
    console.log(`Shared workspace with ${email} (${permission})`);
    setWorkspaces([
      ...workspaces,
      { id: `shared-${Date.now()}`, name: `${email}'s workspace`, permission },
    ]);
    setIsModalOpen(false);
  };

  useEffect(() => {
    localStorage.setItem("theme", isLightMode ? "light" : "dark");
    if (isLightMode) {
      document.body.classList.add("light");
    } else {
      document.body.classList.remove("light");
    }
  }, [isLightMode]);

  return (
    <div className={styles.home}>
      <div className={styles.homeNav}>
        <div className={styles.homeDropDown}>
          <WorkSpaceDropdown
            workspaces={workspaces}
            activeWorkspace={workspaces[0] || { id: "default", name: "Select Workspace" }}
            onWorkspaceChange={handleWorkspaceChange}
          />
        </div>
        <div className={styles.rightNav}>
          <div className={styles.themeSwitch}>
            <span>Light</span>
            <div
              className={isLightMode ? `${styles.themeLight}` : `${styles.theme}`}
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

