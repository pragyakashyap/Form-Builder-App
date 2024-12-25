import { useState } from "react";
import styles from "./home.module.css";

const ShareWorkspaceModal = ({ onClose, onShare }) => {
  const [email, setEmail] = useState("");
  const [permission, setPermission] = useState("view");
  const handleSubmit = (e) => {
    e.preventDefault();
    onShare(email, permission);
  };
  return (
    <div className={styles.sharemodal}>
      <form className={styles.shareForm} onSubmit={handleSubmit}>
        <h3>Invite by Email</h3>
        <div className={styles.close} onClick={onClose}>
          <img src="close.png" />
        </div>
        <input
          type="email"
          value={email}
          placeholder="Enter email id"
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <select
          value={permission}
          onChange={(e) => setPermission(e.target.value)}
          className={styles.permission}
        >
          <option value="view">View Only</option>
          <option value="edit">Edit</option>
        </select>
        <button onClick={onShare} className={styles.sendInvite}>
          Send Invite
        </button>
        <h3>Invite by Link</h3>
        <button onClick={onShare} className={styles.sendInvite}>
          Copy link
        </button>
      </form>
    </div>
  );
};

export default ShareWorkspaceModal;
