import styles from "./home.module.css";

const DeleteFormModal = ({onConfirm, onCancel }) => {
  return (
    <div className={styles.sharemodal}>
      <h2>Are you sure you want to delete this form ?</h2>
      <div className={styles.createFolder}>
        <p className={styles.done} onClick={onConfirm}>
          Confirm
        </p>
        <div className={styles.seperator}></div>
        <p className={styles.cancel} onClick={onCancel}>
          Cancel
        </p>
      </div>
    </div>
  );
};

export default DeleteFormModal;
