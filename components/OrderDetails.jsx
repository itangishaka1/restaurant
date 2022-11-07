import { useState } from 'react'
import styles from '../styles/OrderDetails.module.css'

const OrderDetails = ({ total, createOrder }) => {
  const [customer, setCustomer] = useState('')
  const [phone, setPhone] = useState('')
  const [address, setAddress] = useState('')

  const handleClick = () => {
    createOrder({customer, address, total, method:0 })
  }

  return (
    <section className={styles.container}>
      <div className={styles.wrapper}>
        <h1 className={styles.title}>You will pay $12 after delivery</h1>
        <article className={styles.item}>
          <label htmlFor='' className={styles.label}>
            {' '}
            Name Surname
          </label>
          <input
            type='text'
            placeholder='Ita Abdullah'
            className={styles.input}
            onChange={(e) => setCustomer(e.target.value)}
          />
        </article>
        <article className={styles.item}>
          <label htmlFor='' className={styles.label}>
          Phone Number
          </label>
          <input
            type='text'
            placeholder='+1 234 567 89'
            className={styles.input}
            onChange={(e) => setPhone(e.target.value)}
          />
        </article>
        <article className={styles.item}>
          <label htmlFor='' className={styles.label}>
          Address
          </label>
          <textarea
            rows={5}
            type='text'
            placeholder=' Kigali St. 430 NYami'
            className={styles.textarea}
            onChange={(e) => setAddress(e.target.value)}
          />
        </article>
        <button onClick={handleClick} className={styles.btn}>Order</button>
      </div>
    </section>
  )
}

export default OrderDetails
