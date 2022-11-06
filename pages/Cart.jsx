import styles from '../styles/Cart.module.css'
import Image from 'next/image'
import { useSelector, useDispatch } from 'react-redux'

const Cart = () => {
  const dispatch = useDispatch()
  const cart = useSelector(state=> state.cart)  //choose everything inside my store
  console.log(cart)
  
  return (
    <main className={styles.container}>
      <div className={styles.left}>
        <table className={styles.table}>
          <tbody>
          <tr className={styles.trTitle}>
            <th>Product</th>
            <th>Name</th>
            <th>Extras</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Total</th>
          </tr>
          {cart.products.map(product => (
          <tr className={styles.tr} key={product._id}>
            <td>
              <div className={styles.imgContainer}>
                <Image
                  src={product.img}
                  alt={product.title}
                  fill
                  style={{ objectFit: 'cover' }}
                />
              </div>
            </td>
            <td>
              <span className={styles.name}>{product.title}</span>
            </td>
            <td>
              <span className={styles.extras}>
                {product.extras.map(extra => (
                  <span key={extra._id}>{extra.text}, </span>          
                ))}
              </span>
            </td>
            <td>
              <span className={styles.price}>${product.price}</span>
            </td>
            <td>
              <span className={styles.quantity}>{product.qty}</span>
            </td>
            <td>
              <span className={styles.total}>${product.price * product.qty }</span>
            </td>
          </tr>
          ))}
          </tbody>
        </table>
      </div>
      <div className={styles.right}>
        <div className={styles.wrapper}>
          <h2 className={styles.title}>CART TOTAL</h2>
          <div className={styles.totalText}>
            <b className={styles.totalTextTitle}>Subtotal:</b>${cart.total}
          </div>
          <div className={styles.totalText}>
            <b className={styles.totalTextTitle}>Discount:</b>$0.00
          </div>
          <div className={styles.totalText}>
            <b className={styles.totalTextTitle}>Total:</b>${cart.total}
          </div>
          <button className={styles.btn}>CHECKOUT NOW!</button>
        </div>
      </div>
    </main>
  )
}

export default Cart
