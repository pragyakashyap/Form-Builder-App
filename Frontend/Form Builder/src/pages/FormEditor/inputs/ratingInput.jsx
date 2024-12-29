import styles from "../formEditor.module.css";

export const RatingInput = ({ name, disabled }) => (
    <div className={styles.component} disabled={disabled}>
      <p>{name}</p>
      <span>Hint : User will tap to rate out of 5</span>
    </div>
  );