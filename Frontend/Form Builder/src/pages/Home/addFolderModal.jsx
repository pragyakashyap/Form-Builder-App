import {useState} from 'react'
import styles from "./home.module.css"

const AddFolderModal = ({onDone,onCancel}) => {
    const [foldername,setFoldername] = useState("")
    const handleDone = (e)=>{
        e.preventDefault();
        onDone(foldername);
    }

  return (
    <div className={`${styles.sharemodal}`}>
        <h2>Create New Folder</h2>
        <input
        type='text'
        placeholder='Enter folder name'
        onChange={(e) => setFoldername(e.target.value)}
        />
        <div className={styles.createFolder}>
            <p className={styles.done} onClick={handleDone}> Done</p>
            <div className={styles.seperator}></div>
            <p className={styles.cancel} onClick={onCancel}>Cancel</p>
        </div>
    </div>
  )
}

export default AddFolderModal