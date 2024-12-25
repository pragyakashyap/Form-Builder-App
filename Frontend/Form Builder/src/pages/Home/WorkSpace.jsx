import styles from "./home.module.css";

const WorkSpace = () => {
  return (
    <div className={styles.formFolderContainer}>
        <div className={styles.folderArea}>
        <img src="folder.png"/>
        <span>Create a folder</span>
        </div>
        <div className={styles.formarea}>
            <div className={styles.addFormIcon}>
                +
            </div>
            <div className={styles.createform}>
                Create a TypeBot
            </div>
        </div>
    </div>
  )
}

export default WorkSpace