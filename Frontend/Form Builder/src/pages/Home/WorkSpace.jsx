import AddFolderModal from "./addFolderModal";
import AddFormModal from "./addFormModal";
import DeleteModal from "./deleteModal";
import styles from "./home.module.css";
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

const WorkSpace = ({
  folders,
  forms,
  permissions,
  onAddFolder,
  onAddForm,
  onDeleteFolder,
  onDeleteForm,
}) => {

  const navigate = useNavigate();

  const handleEditForm = (formId) => {
    navigate(`/form-editor/${formId}`);
  };

  const [isModalOpen, setModalOpen] = useState(false);
  const [isFormModalOpen, setFormModalOpen] = useState(false);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null); // Store folder or form details
  const [deleteType, setDeleteType] = useState(""); // 'folder' or 'form'

  const [selectedFolderId, setSelectedFolderId] = useState(null);

  const handleFolderClick = (folderId) => {
    setSelectedFolderId(folderId); // Mark the clicked folder as selected
  };

  const handleOpenDeleteModal = (target, type) => {
    setDeleteTarget(target);
    setDeleteType(type);
    setDeleteModalOpen(true);
  };

  const handleConfirmDelete = () => {
    if (deleteType === "folder") {
      onDeleteFolder(deleteTarget._id); // Call the parent delete folder function
    } else if (deleteType === "form") {
      onDeleteForm(deleteTarget._id); // Call the parent delete form function
    }
    setDeleteModalOpen(false); // Close the modal
  };

  const handleCancelDelete = () => {
    setDeleteModalOpen(false); // Close the modal without action
  };

  const handleAddForm = (formName) => {
    onAddForm(formName, selectedFolderId); // Add the form to the parent state
    setFormModalOpen(false); // Close the modal
  };
  const handleAddFolder = (folderName) => {
    onAddFolder(folderName); // Add the form to the parent state
    setModalOpen(false); // Close the modal
  };

  const workspaceRef = useRef(null);

  // Handle clicks outside the workspace to deselect the folder
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        workspaceRef.current &&
        !workspaceRef.current.contains(event.target)
      ) {
        setSelectedFolderId(null); // Deselect the folder
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div className={styles.formFolderContainer} ref={workspaceRef}>
      <div className={styles.folder} >
        {permissions === "edit" && (
          <div className={styles.folderArea} onClick={() => setModalOpen(true)}>
            <img src="folder.png" />
            <span>Create a folder</span>
          </div>
        )}
        {folders.map((folder) => (
          <div
            key={folder._id}
            className={`${styles.folderArea} ${
              folder._id === selectedFolderId ? styles.selectedFolder : ""
            }`}
            onClick={() => handleFolderClick(folder._id)}
          >
            {folder.name || "Unnamed Folder"} {/* Fallback to avoid crash */}
            <img
              className={styles.deleteFolder}
              src="delete.png"
              onClick={(e) => {
                e.stopPropagation(); // Prevent click event from propagating to parent
                handleOpenDeleteModal(folder, "folder");
              }}
            />
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
        {forms
          .filter(
            (form) =>
              selectedFolderId
                ? form.folderId === selectedFolderId // Show forms in the selected folder
                : !form.folderId // Show only forms outside folders
          )
          .map((form) => (
            <div
              key={form._id}
              className={`${styles.formarea} ${styles.formareaCreated}`}
              onClick={() => handleEditForm(form._id)}
            >
              {form.name}
              <img
                className={styles.delete}
                src="delete.png"
                onClick={(e) => {
                  e.stopPropagation();
                  handleOpenDeleteModal(form, "form");
                }}
              />
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

      {isDeleteModalOpen && (
        <DeleteModal
          message={deleteType}
          onConfirm={handleConfirmDelete}
          onCancel={handleCancelDelete}
        />
      )}
    </div>
  );
};

export default WorkSpace;
