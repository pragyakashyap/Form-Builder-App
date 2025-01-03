import styles from "../formEditor.module.css";

export const ButtonInput = ({ name, disabled }) => (
  <div className={`${styles.component} ${disabled ? styles.disabled : ""}`}>
    <p>{name}</p>
    <button></button>
  </div>
);
