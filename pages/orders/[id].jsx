import axios from 'axios'
import Image from 'next/image'
import styles from '../../styles/Order.module.css'

const Order = ({ order }) => {
  const status = order.status

  const statusClass= (index) => {
    if(index - status < 1) return styles.done
    if(index - status === 1) return styles.inProgress
    if(index - status > 1) return styles.undone
  }
  return (
    <section className={styles.container}>
      <div className={styles.left}>
        <div className={styles.row}>
          <table className={styles.table}>
          <tbody>
            <tr className={styles.trTitle}>
              <th>Order ID</th>
              <th>Customer</th>
              <th>Address</th>
              <th>Total</th>
            </tr>
            <tr className={styles.tr}>
              <td>
                <span className={styles.id}>{order.id}</span>
              </td>
              <td>
                <span className={styles.name}>{order.customer}</span>
              </td>
              <td>
                <span className={styles.address}>{order.address}</span>
              </td>
              <td>
                <span className={styles.total}>${order.total}</span>
              </td>
            </tr>
            </tbody>
          </table>
        </div>
        <div className={styles.row}>
          <div className={statusClass(0)}>
            <Image
              src='/images/paid.png'
              width={30}
              height={30}
              alt='paid icon'
            />
            <span>Payment</span>
            <div className={styles.checkedIcon}>
              <Image
                src='/images/checked.png'
                className={styles.checkedBtn}
                width={20}
                height={20}
                alt='paid icon'
              />
            </div>
          </div>
          <div className={statusClass(1)}>
            <Image
              src='/images/bake.png'
              width={30}
              height={30}
              alt='paid icon'
            />
            <span>Preparing</span>
            <div className={styles.checkedIcon}>
              <Image
                src='/images/checked.png'
                className={styles.checkedBtn}
                width={20}
                height={20}
                alt='paid icon'
              />
            </div>
          </div>
          <div className={statusClass(2)}>
            <Image
              src='/images/bike.png'
              width={30}
              height={30}
              alt='paid icon'
            />
            <span>On the way</span>
            <div className={styles.checkedIcon}>
              <Image
                src='/images/checked.png'
                className={styles.checkedBtn}
                width={20}
                height={20}
                alt='paid icon'
              />
            </div>
          </div>
          <div className={statusClass(3)}>
            <Image
              src='/images/delivered.png'
              width={30}
              height={30}
              alt='paid icon'
            />
            <span>Delivered</span>
            <div className={styles.checkedIcon}>
              <Image
                src='/images/checked.png'
                className={styles.checkedBtn}
                width={20}
                height={20}
                alt='paid icon'
              />
            </div>
          </div>

        </div>
      </div>
      <div className={styles.right}>
        <div className={styles.wrapper}>
          <h2 className={styles.title}>CART TOTAL</h2>
          <div className={styles.totalText}>
            <b className={styles.totalTextTitle}>Subtotal:</b>$79.60
          </div>
          <div className={styles.totalText}>
            <b className={styles.totalTextTitle}>Discount:</b>$0.00
          </div>
          <div className={styles.totalText}>
            <b className={styles.totalTextTitle}>Total:</b>$79.60
          </div>
          <button disabled className={styles.btn}>
            PAID
          </button>
        </div>
      </div>
    </section>
  )
}

export const getServerSideProps = async ({ params }) => {
  const res = await axios.get(`http://localhost:3000/api/orders/${params.id}`)
  return {
    props: {order : res.data}
  }
}

export default Order
