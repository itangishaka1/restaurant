import styles from '../../styles/Product.module.css'
import Image from 'next/image'
import { useState } from 'react'
import axios from 'axios'

const Product = ({ pizza }) => {
  const [size, setSize] = useState(0) // price index
  // const pizza = {
  //   id: 1,
  //   img: '/images/pizza.png',
  //   name: 'PIZZA NAME',
  //   price: [4.5, 8.99, 12.5],
  //   desc: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Non adipisci consequatur quo temporibus optio ad!',
  // }
  return (
    <section className={styles.container}>
      <div className={styles.left}>
        <div className={styles.imgContainer}>
          <Image
            src={pizza.img}
            alt={pizza.name}
            fill
            style={{ objectFit: 'contain' }}
          />
        </div>
      </div>
      <div className={styles.right}>
        <h1 className={styles.title}>{pizza.name}</h1>
        <span className={styles.price}>${pizza.prices[size]}</span>
        <p className={styles.desc}>{pizza.desc}</p>
        <h3 className={styles.choose}>Choose the size</h3>
        <section className={styles.sizes}>
          <article className={styles.size}>
            <Image
              src='/images/size.png'
              alt=''
              fill
              onClick={() => setSize(0)}
            />
            <span className={styles.number}>Small</span>
          </article>
          <article className={styles.size} onClick={() => setSize(1)}>
            <Image src='/images/size.png' alt='' fill />
            <span className={styles.number}>Medium</span>
          </article>
          <article className={styles.size} onClick={() => setSize(2)}>
            <Image src='/images/size.png' alt='' fill />
            <span className={styles.number}>Large</span>
          </article>
        </section>
        <h3 className={styles.choose}>Choose additional ingredients</h3>
        <section className={styles.ingredients}>
          <article className={styles.option}>
            <input
              type='checkbox'
              id='double'
              name='double'
              className={styles.checkbox}
            />
            <label htmlFor='double'>Double Ingredients</label>
          </article>
          <article className={styles.option}>
            <input
              type='checkbox'
              id='cheese'
              name='cheese'
              className={styles.checkbox}
            />
            <label htmlFor='cheese'>Extra Cheese</label>
          </article>
          <article className={styles.option}>
            <input
              type='checkbox'
              id='spicy'
              name='spicy'
              className={styles.checkbox}
            />
            <label htmlFor='spicy'>Spicy Sauce</label>
          </article>
          <article className={styles.option}>
            <input
              type='checkbox'
              id='garlic'
              name='garlic'
              className={styles.checkbox}
            />
            <label htmlFor='garlic'>Garlic Sauce</label>
          </article>
        </section>
        <div className={styles.add}>
            <input type="number" defaultValue={1} className={styles.quantity} />
            <button className={styles.btn}>Add to Cart</button>
        </div>
      </div>
    </section>
  )
}

export const getServerSideProps = async ({ params }) => {
  const res = await axios.get(`http://localhost:3000/api/product/${params.id}`)
  return {
    props: {
      pizza: res.data
    }
  }
}

export default Product
