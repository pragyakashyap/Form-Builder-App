import styles from "../formEditor.module.css";

export const InputNumber = ({ name , disabled}) => (
    <div className={`${styles.component} ${disabled ? styles.disabled : ''}`}>
      <p>{name}</p>
      <span>Hint : User will input a number on his form</span>
    </div>
  );