import AddFolderModal from "./addFolderModal";
import AddFormModal from "./addFormModal";
import DeleteFormModal from "./deleteFormModal";
import styles from "./home.module.css";
import { useState, useEffect } from "react";

const WorkSpace = ({ folders, forms, permissions, onAddFolder, onAddForm }) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [isFormModalOpen, setFormModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModal] = useState(false);
  const handleAddForm = (formName) => {
    onAddForm(formName); // Add the form to the parent state
    setFormModalOpen(false); // Close the modal
  };
  const handleAddFolder = (folderName) => {
    onAddFolder(folderName); // Add the form to the parent state
    setModalOpen(false); // Close the modal
  };

  return (
    <div className={styles.formFolderContainer}>
      <div className={styles.folder}>
        {permissions === "edit" && (
          <div className={styles.folderArea} onClick={() => setModalOpen(true)}>
            <img src="folder.png" />
            <span>Create a folder</span>
          </div>
        )}
        {folders.map((folder) => (
          <div key={folder._id} className={styles.folderArea}>
            {folder.name || "Unnamed Folder"} {/* Fallback to avoid crash */}
            <img className={styles.deleteFolder} src="delete.png" />
          </div>
        ))}
      </div>
      <div className={styles.form}>
        {permissions === "edit" && (
          <div
            className={styles.formarea}
            onClick={() => setFormModalOpen(true)}
          >
            <div className={styles.addFormIcon}>+</div>
            <div className={styles.createform}>Create a TypeBot</div>
          </div>
        )}
        {forms.map((form) => (
          <div
            key={form.id}
            className={`${styles.formarea} ${styles.formareaCreated}`}
          >
            {form.name}
            <img className={styles.delete} src="delete.png" />
          </div>
        ))}
      </div>
      {isModalOpen && (
        <AddFolderModal
          onDone={handleAddFolder}
          onCancel={() => setModalOpen(false)}
        />
      )}
      {isFormModalOpen && (
        <AddFormModal
          onDone={handleAddForm}
          onCancel={() => setFormModalOpen(false)}
        />
      )}
    </div>
  );
};

export default WorkSpace;
