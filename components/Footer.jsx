import styles from '../styles/Footer.module.css'
import Image from 'next/image'

const Footer = () => {
  return (
    <footer className={styles.container}>
      <div className={styles.item}>
        <Image src='/images/bg.png' fill alt='' style={{objectFit: 'cover'}} />
      </div>
      <div className={styles.item}>
        <div className={styles.card}>
          <h2 className={styles.motto}>
            OH YES, WE DID. YourPizza, WELL BACKED SLICE OF PIZZA.
          </h2>
        </div>
        <div className={styles.card}>
          <h2 className={styles.title}>FIND OUR RESTAURANTS</h2>
          <p className={styles.text}>
            1000 CURL ROAD #303.
            <br /> Edmonton, 2345
            <br /> (416) 234-1645
          </p>
          <p className={styles.text}>
            123 L. ROAD #339.
            <br /> Alberta, 245
            <br /> (416) 234-00
          </p>
          <p className={styles.text}>
            456 KWd Rd #256.
            <br /> Oakville, 1894
            <br /> (416) 234-1645
          </p>
          <p className={styles.text}>
            1000 CURL ROAD #303.
            <br /> Edmonton, 2345
            <br /> (416) 234-1645
          </p>
        </div>
        <div className={styles.card}>
          <h2 className={styles.title}>WORKING HOURS</h2>
          <p className={styles.text}>
            MONDAY TO FRIDAY
            <br /> 9:00 - 22:00
          </p>
          <p className={styles.text}>
            SATURDAY & SUNDAY
            <br /> 12:00 - 24:00
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
