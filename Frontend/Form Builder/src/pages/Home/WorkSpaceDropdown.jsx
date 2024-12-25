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
    if (workspace.id === "settings") {
      navigate("/settings");
    } else if (workspace.id === "logout") {
      console.log("Logging out...");
      navigate("/login");
    } else {
      onWorkspaceChange(workspace.id);
    }
  };

  return (
    <div
      className={styles.workSpaceDropdown}
      onClick={() => setIsOpen(!isOpen)}
    >
      {/* Selected Option */}
      <div className={styles.selectedOption}>
        {selected.name}
      </div>

      {/* Dropdown Options */}
      {isOpen && (
        <div className={styles.dropdownMenu}>
          {workspaces
            .filter(workspace => workspace.id !== selected.id)  // Exclude the selected option
            .map((workspace) => (
              <div
                key={workspace.id}
                className={styles.dropdownOption}
                onClick={() => handleWorkspaceChange(workspace)}
              >
                {workspace.name}
              </div>
            ))}
          <div
            className={styles.dropdownOption}
            onClick={() =>
              handleWorkspaceChange({ id: "settings", name: "Settings" })
            }
          >
            Settings
          </div>
          <div
            className={styles.dropdownOption}
            style={{ color: "#FFA54C" }}
            onClick={() =>
              handleWorkspaceChange({ id: "logout", name: "Logout" })
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
