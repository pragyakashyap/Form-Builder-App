import {useState} from 'react'
import styles from "./home.module.css"

const AddFormModal = ({onDone,onCancel}) => {
    const [formname,setformname] = useState("")
    const handleDone = (e)=>{
        e.preventDefault();
        onDone(formname);
    }

  return (
    <div className={styles.sharemodal}>
        <h2>Create New form</h2>
        <input
        type='text'
        placeholder='Enter form name'
        onChange={(e) => setformname(e.target.value)}
        required
        />
        <div className={styles.createFolder}>
            <p className={styles.done} onClick={handleDone}> Done</p>
            <div className={styles.seperator}></div>
            <p className={styles.cancel} onClick={onCancel}>Cancel</p>
        </div>
    </div>
  )
}

export default AddFormModal