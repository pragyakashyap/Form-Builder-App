import styles from "../formEditor.module.css";

export const EmailInput = ({ name , disabled}) => (
    <div className={`${styles.component} ${disabled ? styles.disabled : ''}`}>
      <p>{name}</p>
      <span>Hint : User will input an email on his form</span>
    </div>
  );