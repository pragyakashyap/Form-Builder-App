import styles from "./home.module.css";
import WorkSpace from "./WorkSpace";
import WorkSpaceDropdown from "./WorkSpaceDropdown";
import ShareWorkspaceModal from "./ShareWorkspaceModal";
import { useState } from "react";
import { useEffect, useMemo } from "react";
import {
  fetchWorkspaces,
  createFolder,
  createForm,
  deleteFolder,
  deleteForm,
  shareworkspace,
  fetchWorkspacesById,
} from "../../services";
import ThemeSwitch from "../ThemeSwitch";
import toast from "react-hot-toast";
import { useTheme } from "../../ThemeContext";
import { useSearchParams } from "react-router-dom";

const Home = () => {
  const [workspaces, setWorkspaces] = useState([]);
  const [activeWorkspace, setActiveWorkspace] = useState(null);
  const [folders, setFolders] = useState([]);
  const [forms, setForms] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [permissions, setPermissions] = useState("edit");

  const { theme } = useTheme();

  const userId = localStorage.getItem("userId");
  const userEmail = localStorage.getItem("userEmail");

  const determineUserPermissions = (workspace) => {
    if (!workspace) return "edit";

    if (!workspace.sharedWith || workspace.sharedWith.length === 0) {
      return "edit";
    }

    const currentUserShare = workspace.sharedWith.find(
      (share) => share.email === userEmail
    );

    return currentUserShare ? currentUserShare.permission : "edit";
  };

  useEffect(() => {
    const getWorkspace = async () => {
      try {
        const workspacesResponse = await fetchWorkspacesById(userId);
        console.log("API Response:", workspacesResponse);
        setWorkspaces(workspacesResponse);

        if (workspacesResponse.length > 0) {
          const defaultWorkspace = workspacesResponse[0];
          setActiveWorkspace(defaultWorkspace);
          setFolders(workspacesResponse[0].folders || []);
          setForms(workspacesResponse[0].forms || []);
          setPermissions(determineUserPermissions(defaultWorkspace));
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
    console.log(selectedWorkspace);
    if (selectedWorkspace) {
      setActiveWorkspace(selectedWorkspace);
      setFolders(selectedWorkspace.folders || []);
      setForms(selectedWorkspace.forms || []);
      setPermissions(determineUserPermissions(selectedWorkspace));
    }
  };

  const handleAddFolder = async (folderName) => {
    if (permissions !== "edit") {
      toast.error("You do not have permission to perform this action.");
      return;
    }

    try {
      const response = await createFolder({
        name: folderName,
        workspaceId: activeWorkspace._id,
      });
      console.log("Folder creation response:", response);

      // Update the active workspace's folders
      const updatedFolders = [...folders, response];
      setFolders(updatedFolders);

      // Sync back to the workspaces array
      setWorkspaces((prevWorkspaces) =>
        prevWorkspaces.map((ws) =>
          ws._id === activeWorkspace._id
            ? { ...ws, folders: updatedFolders }
            : ws
        )
      );
    } catch (err) {
      console.error("Error creating folder:", err);
    }
  };

  const handleDeleteFolder = async (folderId) => {
    try {
      await deleteFolder(folderId);

      // Update the active workspace's folders
      const updatedFolders = folders.filter(
        (folder) => folder._id !== folderId
      );
      setFolders(updatedFolders);

      // Sync back to the workspaces array
      setWorkspaces((prevWorkspaces) =>
        prevWorkspaces.map((ws) =>
          ws._id === activeWorkspace._id
            ? { ...ws, folders: updatedFolders }
            : ws
        )
      );
    } catch (error) {
      console.error("Error deleting folder:", error);
    }
  };

  const handleAddForm = async (formName, folderId = null) => {
    if (permissions !== "edit") {
      toast.error("You do not have permission to perform this action.");
      return;
    }

    try {
      await createForm({
        name: formName,
        workspaceId: activeWorkspace._id,
        folderId,
      });

      const updatedWorkspaces = await fetchWorkspacesById(userId); // Fetch updated data
      setWorkspaces(updatedWorkspaces);
      const updatedWorkspace = updatedWorkspaces.find(
        (ws) => ws._id === activeWorkspace._id
      );
      setActiveWorkspace(updatedWorkspace);
      setFolders(updatedWorkspace.folders || []);
      setForms(updatedWorkspace.forms || []);
    } catch (err) {
      console.error("Error creating form:", err);
    }
  };

  const handleDeleteForm = async (formId) => {
    try {
      await deleteForm(formId);

      const updatedForms = forms.filter((form) => form._id !== formId);
      setForms(updatedForms);

      setWorkspaces((prevWorkspaces) =>
        prevWorkspaces.map((ws) =>
          ws._id === activeWorkspace._id ? { ...ws, forms: updatedForms } : ws
        )
      );
    } catch (error) {
      console.error("Error deleting form:", error);
    }
  };

  const handleShareWorkspace = async (email, permission) => {
    try {
      const data = {
        workspaceId: activeWorkspace._id,
        email,
        permission,
      };

      const workspace = await shareworkspace(data);
      toast(workspace.message);

      // Update the specific workspace in the state
      setWorkspaces((prevWorkspaces) =>
        prevWorkspaces.map((ws) => (ws._id === workspace._id ? workspace : ws))
      );

      setIsModalOpen(false);
    } catch (error) {
      console.error("Error sharing workspace:", error);
      toast.error(
        error.message || "An error occurred while sharing the workspace."
      );
    }
  };

  const handleCopyLink = () => {
    const token = btoa(`${activeWorkspace._id}:view`);
    const url = `${window.location.origin}/share?token=${token}`;
    navigator.clipboard
        .writeText(url)
        .then(() => toast.success("Workspace link copied to clipboard!"))
        .catch(() => toast.error("Failed to copy the link"));
};

  
  return (
    <>
      <div className={styles.home}>
        <div className={styles.homeNav}>
          <div className={styles.homeDropDown}>
            <WorkSpaceDropdown
              workspaces={workspaces}
              activeWorkspace={
                activeWorkspace ?? { id: "default", name: "Select Workspace" }
              }
              onWorkspaceChange={handleWorkspaceChange}
            />
          </div>
          <div className={styles.rightNav}>
            <ThemeSwitch />
            <button onClick={() => setIsModalOpen(true)}>Share</button>
          </div>
        </div>
      </div>
      <hr className={styles.homeLine} />
      <div className={styles.home}>
        <div className={styles.workspace}>
          <WorkSpace
            folders={folders}
            forms={forms}
            permissions={permissions}
            onAddFolder={permissions === "edit" ? handleAddFolder : null}
            onAddForm={permissions === "edit" ? handleAddForm : null}
            onDeleteFolder={permissions === "edit" ? handleDeleteFolder : null}
            onDeleteForm={permissions === "edit" ? handleDeleteForm : null}
          />
          {isModalOpen && (
            <ShareWorkspaceModal
              onClose={() => setIsModalOpen(false)}
              onShare={handleShareWorkspace}
              onShareByLink={handleCopyLink}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default Home;
