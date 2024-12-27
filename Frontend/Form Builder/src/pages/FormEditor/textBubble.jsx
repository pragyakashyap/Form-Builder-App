import styles from "./formEditor.module.css";

export const TextBubble = ({ name }) => (
    <div className={styles.component}>
      <p>{name}</p>
      <input type="text" placeholder="Enter text here" />
    </div>
  );