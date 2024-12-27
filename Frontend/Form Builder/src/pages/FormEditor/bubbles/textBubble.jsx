import styles from "../formEditor.module.css";

export const TextBubble = ({ name, content, onContentChange }) => (
    <div className={styles.component}>
      <p>{name}</p>
      <input type="text" placeholder="Enter text here"   value={content || ""} onChange={(e)=>onContentChange(e.target.value)} required />
    </div>
  );