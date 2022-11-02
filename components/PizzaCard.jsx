import styles from '../styles/PizzaCard.module.css'
import Image from 'next/image'

const PizzaCard = () => {
  return (
    <article className={styles.container}>
        <Image src='/images/pizza.png' alt='pizza' width='250' height='250' />
        <h2 className={styles.title}>PIZZA NAME HERE</h2>
        <span className={styles.price}>$9.99</span>
        <p className={styles.desc}>Lorem ipsum dolor sit amet consectetur, adipisicing elit.</p>
    </article>
  )
}

export default PizzaCard