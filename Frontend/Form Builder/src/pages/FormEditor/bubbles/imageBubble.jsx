import styles from "../formEditor.module.css";

export const ImageBubble = ({ name, content, onContentChange, disabled }) => (
    <div className={`${styles.component} ${disabled ? styles.disabled : ''}`}>
      <p>{name}</p>
      <input type="text" placeholder="Enter image URL here" value={content || ""}   onChange={(e) => !disabled && onContentChange(e.target.value)}
      disabled={disabled} required/>
    </div>
  );