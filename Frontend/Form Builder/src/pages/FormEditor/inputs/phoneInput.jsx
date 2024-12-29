import styles from "../formEditor.module.css";

export const PhoneInput = ({ name, disabled }) => (
    <div className={`${styles.component} ${disabled ? styles.disabled : ''}`}>
      <p>{name}</p>
      <span>Hint : User will input a phone number on his form</span>
    </div>
  );