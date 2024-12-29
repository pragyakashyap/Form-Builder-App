import styles from "../formEditor.module.css";

export const DateInput = ({ name , disabled}) => (
    <div className={`${styles.component} ${disabled ? styles.disabled : ''}`}>
      <p>{name}</p>
      <span>Hint : User will input a date on his form</span>
    </div>
  );