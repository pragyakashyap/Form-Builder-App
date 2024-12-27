import styles from "./formEditor.module.css";

export const ImageBubble = ({ name }) => (
    <div className={styles.component}>
      <p>{name}</p>
      <input type="text" placeholder="Enter image URL here" />
    </div>
  );