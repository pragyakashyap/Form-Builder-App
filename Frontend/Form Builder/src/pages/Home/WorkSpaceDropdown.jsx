import React from "react";
import styles from "./home.module.css";

const WorkSpaceDropdown = ({
  workspaces,
  activeWorkspace,
  onWorkspaceChange,
}) => {
  return (
    <div className={styles.workSpaceDropdown}>
      <select
        value={activeWorkspace}
        onChange={(e) => onWorkspaceChange(e.target.value)}
        style={{ padding: "0.5rem", fontSize: "1rem" }}
      >
        {workspaces.map((workspace) => (
          <option key={workspace.id} value={workspace.id}>
            {workspace.name}
          </option>
        ))}
        <option>Settings</option>
        <option style={{color:"#FFA54C"}}>Logout</option>
      </select>
    </div>
  );
};

export default WorkSpaceDropdown;
