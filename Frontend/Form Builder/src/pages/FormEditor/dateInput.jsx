import styles from "./formEditor.module.css";

export const DateInput = ({ name }) => (
    <div className={styles.component}>
      <p>{name}</p>
      <span>Hint : User will input a date on his form</span>
    </div>
  );