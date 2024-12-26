import styles from "./home.module.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const WorkSpaceDropdown = ({ workspaces, activeWorkspace, onWorkspaceChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState(activeWorkspace);

  const navigate = useNavigate();

  const handleWorkspaceChange = (workspace) => {
    setSelected(workspace);
    setIsOpen(false);
    if (workspace._id === "settings") {
      navigate("/settings");
    } else if (workspace._id === "logout") {
      console.log("Logging out...");
      localStorage.removeItem("token")
      navigate("/login");
    } else {
      onWorkspaceChange(workspace._id);
    }
  };

  return (
    <div
      className={styles.workSpaceDropdown}
      onClick={() => setIsOpen(!isOpen)}
    >
     
     <div className={styles.selectedOption}>
     {selected?.name || "Select Workspace"} {/* Use optional chaining and fallback */}
   </div>
   

      {/* Dropdown Options */}
      {isOpen && (
        <div className={styles.dropdownMenu}>
          {workspaces
            .filter(workspace => workspace._id !== selected.id)  // Exclude the selected option
            .map((workspace) => (
              <div
                key={workspace._id}
                className={styles.dropdownOption}
                onClick={() => handleWorkspaceChange(workspace)}
              >
                {workspace.name}
              </div>
            ))}
          <div
            className={styles.dropdownOption}
            onClick={() =>
              handleWorkspaceChange({ _id: "settings", name: "Settings" })
            }
          >
            Settings
          </div>
          <div
            className={styles.dropdownOption}
            style={{ color: "#FFA54C" }}
            onClick={() =>
              handleWorkspaceChange({ _id: "logout", name: "Logout" })
            }
          >
            Logout
          </div>
        </div>
      )}
    </div>
  );
};

export default WorkSpaceDropdown;
