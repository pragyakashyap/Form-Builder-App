import styles from "../formEditor.module.css";

export const ImageBubble = ({ name, content, onContentChange }) => (
    <div className={styles.component}>
      <p>{name}</p>
      <input type="text" placeholder="Enter image URL here" value={content || ""}  onChange={(e)=>onContentChange(e.target.value)} required="true"/>
    </div>
  );