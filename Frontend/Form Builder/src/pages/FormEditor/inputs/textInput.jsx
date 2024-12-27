import styles from "../formEditor.module.css";

export const InputText = ({ name }) => (
    <div className={styles.component}>
      <p>{name}</p>
      <span>Hint : User will input a text on his form</span>
    </div>
  );