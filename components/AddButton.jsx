import styles from '../styles/AddButton.module.css'

const AddButton = ({ setClose }) => {
  return (
    <div className={styles.mainAddBtn} onClick={() => setClose(false)}>
        Add new pizza
    </div>
  )
}

export default AddButton