import styles from "./formEditor.module.css";

export const ButtonInput = ({ name }) => (
    <div className={styles.component}>
      <p>{name}</p>
      <button></button>
    </div>
  );