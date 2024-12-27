import styles from "./formEditor.module.css";

export const InputNumber = ({ name }) => (
    <div className={styles.component}>
      <p>{name}</p>
      <span>Hint : User will input a number on his form</span>
    </div>
  );