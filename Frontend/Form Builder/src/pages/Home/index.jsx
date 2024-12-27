import styles from "./home.module.css";
import WorkSpace from "./WorkSpace";
import WorkSpaceDropdown from "./WorkSpaceDropdown";
import ShareWorkspaceModal from "./ShareWorkspaceModal";
import { useState } from "react";
import { useEffect } from "react";
import {
  fetchWorkspaces,
  createFolder,
  createForm,
  deleteFolder,
  deleteForm,
} from "../../services";
import ThemeSwitch from "../ThemeSwitch";

const Home = () => {
  const [workspaces, setWorkspaces] = useState([]);
  const [folders, setFolders] = useState([]);
  const [forms, setForms] = useState([]);

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
    const selectedWorkspace = workspaces.find(
      (workspace) => workspace._id === id
    );
    if (selectedWorkspace) {
      setFolders(selectedWorkspace.folders || []);
    } else {
      setFolders([]);
    }
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

  const handleDeleteFolder = async (folderId) => {
    try {
      await deleteFolder(folderId); // API call to delete folder
      const updatedWorkspaces = await fetchWorkspaces();
      const currentWorkspace = updatedWorkspaces.find(
        (ws) => ws._id === workspaces[0]._id
      );
      setFolders(currentWorkspace.folders || []); // Update folders
    } catch (error) {
      console.error("Error deleting folder:", error);
    }
  };

  const handleDeleteForm = async (formId) => {
    try {
      await deleteForm(formId); // API call to delete form
      const updatedWorkspaces = await fetchWorkspaces();
      const currentWorkspace = updatedWorkspaces.find(
        (ws) => ws._id === workspaces[0]._id
      );
      setForms(currentWorkspace.forms || []); // Update forms
    } catch (error) {
      console.error("Error deleting form:", error);
    }
  };

  useEffect(() => {
    console.log("Updated folders:", folders);
  }, [folders]);

  const handleAddForm = async (formName, folderId = null) => {
    try {
      await createForm({
        name: formName,
        workspaceId: workspaces[0]._id,
        folderId: folderId,
      });

      // Fetch updated workspaces
      const updatedWorkspaces = await fetchWorkspaces();
      const currentWorkspace = updatedWorkspaces.find(
        (ws) => ws._id === workspaces[0]._id
      );

      setForms(currentWorkspace.forms || []); // Update forms with the latest data
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

  return (
    <div className={styles.home}>
      <div className={styles.homeNav}>
        <div className={styles.homeDropDown}>
          <WorkSpaceDropdown
            workspaces={workspaces}
            activeWorkspace={
              workspaces[0] || { id: "default", name: "Select Workspace" }
            }
            onWorkspaceChange={handleWorkspaceChange}
          />
        </div>
        <div className={styles.rightNav}>
          <ThemeSwitch />
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
          onDeleteFolder={handleDeleteFolder}
          onDeleteForm={handleDeleteForm}
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
