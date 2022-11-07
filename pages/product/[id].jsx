import styles from '../../styles/Product.module.css'
import Image from 'next/image'
import { useState } from 'react'
import axios from 'axios'
import Link from 'next/link'

import { useDispatch } from 'react-redux'
import { addProduct } from '../../redux/cartSlice'

const Product = ({ pizza }) => {
  const [price, setPrice] = useState(pizza.prices[0]) 
  const [size, setSize] = useState(0) // size index
  const [extras, setExtras] = useState([]) 
  const [qty, setQty] = useState(1) 


  const dispatch = useDispatch()

  const changePrice = (number) => {
     setPrice(price + number)
  }

  const handleSize =(sizeIndex) => {
    const difference = pizza.prices[sizeIndex] - pizza.prices[size]
    setSize(sizeIndex)
    changePrice(difference)
  }

  const handleChange = (e, option) => {
      const checked = e.target.checked

      if(checked) {
        changePrice(option.price)
        setExtras(prev => [...prev, option])
      }else {
        changePrice(-option.price)
        setExtras(extras.filter(extra => extra._id !== option._id))
      }
  }

  const handleClick = () => {
    dispatch(addProduct({...pizza, extras, price, qty}))
  }

  return (
    <section className={styles.container}>
      <div className={styles.left}>
        <div className={styles.imgContainer}>
          <Image
            src={pizza.img}
            alt={pizza.title}
            fill
            style={{ objectFit: 'contain' }}
          />
        </div>
      </div>
      <div className={styles.right}>
        <h1 className={styles.title}>{pizza.title}</h1>
        <span className={styles.price}>${price}</span>
        <p className={styles.desc}>{pizza.desc}</p>
        <h3 className={styles.choose}>Choose the size</h3>
        <section className={styles.sizes}>
          <article className={styles.size}>
            <Image
              src='/images/size.png'
              alt=''
              fill
              onClick={() => handleSize(0)}
            />
            <span className={styles.number}>Small</span>
          </article>
          <article className={styles.size} onClick={() => handleSize(1)}>
            <Image src='/images/size.png' alt='' fill />
            <span className={styles.number}>Medium</span>
          </article>
          <article className={styles.size} onClick={() => handleSize(2)}>
            <Image src='/images/size.png' alt='' fill />
            <span className={styles.number}>Large</span>
          </article>
        </section>
        <h3 className={styles.choose}>Choose additional ingredients</h3>
        <section className={styles.ingredients}>
          {pizza.extraOptions.map(option => (
          <article className={styles.option} key={option._id}>
            <input
              type='checkbox'
              id={option.text}
              name={option.text}
              className={styles.checkbox}
              onChange={(e)=>handleChange(e, option)}
            />
            <label htmlFor={option.text}>{option.text}</label>
          </article>
          ))}
        </section>
        <div className={styles.add}>
            <input type="number" defaultValue={qty} onChange={(e=>setQty(e.target.value))} className={styles.quantity} />
            {/* <Link href='/Cart' passHref>  */}
             <button className={styles.btn} onClick={handleClick}>Add to Cart</button>
            {/* </Link> */}
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
