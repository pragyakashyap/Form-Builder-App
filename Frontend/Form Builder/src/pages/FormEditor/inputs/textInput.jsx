import styles from "../formEditor.module.css";

export const InputText = ({ name , disabled}) => (
    <div className={`${styles.component} ${disabled ? styles.disabled : ''}`}>
      <p>{name}</p>
      <span>Hint : User will input a text on his form</span>
    </div>
  );