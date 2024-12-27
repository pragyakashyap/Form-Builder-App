import styles from "../formEditor.module.css";

export const EmailInput = ({ name }) => (
    <div className={styles.component}>
      <p>{name}</p>
      <span>Hint : User will input an email on his form</span>
    </div>
  );