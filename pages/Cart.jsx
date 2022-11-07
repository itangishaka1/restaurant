import styles from '../styles/Cart.module.css'
import Image from 'next/image'
import { useSelector, useDispatch } from 'react-redux'

import { useEffect, useState } from 'react'
import {
  PayPalScriptProvider,
  PayPalButtons,
  usePayPalScriptReducer,
} from '@paypal/react-paypal-js'
import axios from 'axios'
import { useRouter } from 'next/router'
// import Router from "next/router";
import { reset } from '../redux/cartSlice'

const Cart = () => {
  const cart = useSelector((state) => state.cart) //choose everything inside my store
  const [open, setOpen] = useState(false)
  const amount = cart.total
  const currency = 'USD'
  const style = { layout: 'vertical' }
  const dispatch = useDispatch()
  const router = useRouter()

  const createOrder = async (data) => {
    try {
      const res = axios.post('http://localhost:3000/api/orders', data)
      res.status === 201 && router.push('/orders/' + res.data._id)
      dispatch(reset())
    } catch (error) {
      console.log(error)
    }
  }

  // Custom component to wrap the PayPalButtons and handle currency changes
  const ButtonWrapper = ({ currency, showSpinner }) => {
    const [{ options, isPending }, dispatch] = usePayPalScriptReducer()

    useEffect(() => {
      dispatch({
        type: 'resetOptions',
        value: {
          ...options,
          currency: currency,
        },
      })
    }, [currency, showSpinner])

    return (
      <>
        {showSpinner && isPending && <div className='spinner' />}
        <PayPalButtons
          style={style}
          disabled={false}
          forceReRender={[amount, currency, style]}
          fundingSource={undefined}
          createOrder={(data, actions) => {
            return actions.order
              .create({
                purchase_units: [
                  {
                    amount: {
                      currency_code: currency,
                      value: amount,
                    },
                  },
                ],
              })
              .then((orderId) => {
                // Your code here after create the order
                return orderId
              })
          }}
          onApprove={function (data, actions) {
            return actions.order.capture().then(function (details) {
              const shipping = details.purchase_units[0].shipping
              createOrder({
                customer: shipping.name.full_name,
                address: shipping.address.address_line_1,
                total: cart.total,
                method: 1,
              })
              // method: 1 is for paypal
              // method: 0 is for cash method
            })
          }}
        />
      </>
    )
  }

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
            {cart.products.map((product) => (
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
                    {product.extras.map((extra) => (
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
                  <span className={styles.total}>
                    ${product.price * product.qty}
                  </span>
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
          {open ? (
            <div className={styles.paymentMethods}>
              <button className={styles.payCashBtn}>CASH ON DELIVERY</button>
              <PayPalScriptProvider
                options={{
                  'client-id':
                    'ATI4SB6RjcvZ54Sylw1lVjueNwAZ9QJzRXfcwrbYQNhrh36oVDafYMpOOXNiSAlcnJX5P84fBPWgKsOI',
                  components: 'buttons',
                  currency: 'USD',
                  'disable-funding': 'card',
                  // card = Credit or debit cards
                  // credit = PayPal Credit
                }}
              >
                <ButtonWrapper currency={currency} showSpinner={false} />
              </PayPalScriptProvider>
            </div>
          ) : (
            <button onClick={() => setOpen(true)} className={styles.btn}>
              CHECKOUT NOW!
            </button>
          )}
        </div>
      </div>
    </main>
  )
}

export default Cart
