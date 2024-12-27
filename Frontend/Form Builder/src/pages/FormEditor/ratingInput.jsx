import styles from "./formEditor.module.css";

export const RatingInput = ({ name }) => (
    <div className={styles.component}>
      <p>{name}</p>
      <span>Hint : User will tap to rate out of 5</span>
    </div>
  );