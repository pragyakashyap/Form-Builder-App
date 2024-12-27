import styles from "./formEditor.module.css";

export const PhoneInput = ({ name }) => (
    <div className={styles.component}>
      <p>{name}</p>
      <span>Hint : User will input a phone number on his form</span>
    </div>
  );