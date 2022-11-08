import styles from '../styles/Add.module.css'
import axios from 'axios'
import { useRouter } from 'next/router'
import { useState } from 'react'

const Add = ({ setClose }) => {
  const [file, setFile] = useState(null)
  const [title, setTitle] = useState(null)
  const [desc, setDesc] = useState(null)
  const [prices, setPrices] = useState([])
  const [extra, setExtra] = useState(null)
  const [extraOptions, setExtraOptions] = useState([])

  const handleExtraInput = (e) => {
    setExtra({ ...extra, [e.target.name]: e.target.value })
  }

  const handleExtra = (e) => {
    setExtraOptions((prev) => [...prev, extra])
  }

  const changePrice = (e, index) => {
    const currentPrices = prices
    currentPrices[index] = e.target.value
    setPrices(currentPrices)
  }

  const handleCreate = async () => {
    const data = new FormData()
    data.append('file', file)
    data.append('upload_preset', 'uploads')
    try {
      const uploadResponse = await axios.post(
        'https://api.cloudinary.com/v1_1/dn0fylcim/image/upload',
        data
      )
      const { url } = uploadResponse.data
      const newProduct = {
        title,
        desc,
        prices,
        extraOptions,
        img: url,
      }

      await axios.post('http://localhost:3000/api/product', newProduct)
      setClose(true)
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <section className={styles.container}>
      <div className={styles.wrapper}>
        <span onClick={() => setClose(true)} className={styles.close}>
          X
        </span>
        <h1>Add a new Pizza</h1>
        <article className={styles.item}>
          <label htmlFor='' className={styles.label}>
            Choose an image
          </label>
          <input type='file' onChange={(e) => setFile(e.target.files[0])} />
        </article>
        <article className={styles.item}>
          <label htmlFor='' className={styles.label}>
            Title
          </label>
          <input
            type='text'
            className={styles.input}
            onChange={(e) => setTitle(e.target.value)}
          />
        </article>
        <article className={styles.item}>
          <label htmlFor='' className={styles.label}>
            Desc
          </label>
          <textarea
            type='text'
            className={styles.textarea}
            onChange={(e) => setDesc(e.target.value)}
            row={4}
          />
        </article>
        <article className={styles.item}>
          <label htmlFor='' className={styles.label}>
            Prices
          </label>
          <div className={styles.priceContainer}>
            <input
              type='number'
              placeholder='Small'
              className={` ${styles.input} ${styles.inputSm}`}
              // onChange={(e) => changePrice(e, index)}
              onChange={(e) => changePrice(e, 0)}
            />
            <input
              type='number'
              placeholder='Medium'
              className={` ${styles.input} ${styles.inputSm}`}
              onChange={(e) => changePrice(e, 1)}
            />
            <input
              type='number'
              placeholder='Large'
              className={` ${styles.input} ${styles.inputSm}`}
              onChange={(e) => changePrice(e, 2)}
            />
          </div>
        </article>
        <article className={styles.item}>
          <label htmlFor='' className={styles.label}>
            Extras
          </label>
          <div className={styles.extra}>
            <input
              type='text'
              className={`${styles.input} ${styles.inputSm}`}
              placeholder='Item'
              name='text'
              onChange={handleExtraInput}
            />
            <input
              type='number'
              className={`${styles.input} ${styles.inputSm}`}
              placeholder='Price'
              name='price'
              onChange={handleExtraInput}
            />
            <button className={styles.extraBtn} onClick={handleExtra}>
              Add
            </button>
          </div>
          <article className={styles.extraItems}>
            {extraOptions.map((option) => (
              <span key={option.text} className={styles.extraItem}>
                {option.text}
              </span>
            ))}
          </article>
        </article>
        <button className={styles.addBtn} onClick={handleCreate}>
          Create
        </button>
      </div>
    </section>
  )
}

export default Add
