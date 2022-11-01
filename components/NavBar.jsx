import styles from '../styles/Navbar.module.css'

import Image from 'next/image'

const NavBar = () => {
  return (
    <div className={styles.container}>
      <article className={styles.item}>
        <div className={styles.callButton}>
          <Image src='/images/telephone.png' alt='telephone' width='32' height='32' />
        </div>
        <div className={styles.texts}>
          <div className={styles.text}>ORDER NOW</div>
          <div className={styles.text}>+1 (345) 345 3456</div>
        </div>
      </article>
      <article className={styles.item}>
        <ul className={styles.list}>
          <li className={styles.listItem}>Home</li>
          <li className={styles.listItem}>Products</li>
          <li className={styles.listItem}>Menu</li>
          <div className={styles.logo}>YourPizza</div>
          <li className={styles.listItem}>Events</li>
          <li className={styles.listItem}>Blog</li>
          <li className={styles.listItem}>Contact</li>
        </ul>
      </article>
      <article className={styles.item}>
        <div className={styles.cart}>
          <Image src='/images/cart.png' alt='' width="30" height="30" />
          <div className={styles.counter}>5</div>
        </div>
      </article>
    </div>
  )
}

export default NavBar
