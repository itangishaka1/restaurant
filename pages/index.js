import axios from 'axios'
import Head from 'next/head'
import Featured from '../components/Featured'
import PizzaList from '../components/PizzaList'
import styles from '../styles/Home.module.css'

export default function Home({ allPizzas, admin }) {
  return (
    <div className={styles.container}>
      <Head>
        <title>Pizza Restaurant in Toronto</title>
        <meta name="description" content="Best pizza shop in town" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Featured />
      {admin && (<span>Hello</span>)}
      <PizzaList allPizzas={allPizzas} />
    </div>
  )
}

export const getServerSideProps = async (context) => {
    const myCookie = context.req?.cookies || ''

    let admin = false

    if(myCookie.token === process.env.TOKEN){
      admin = true

    }

    const res = await axios.get('http://localhost:3000/api/product')
    return {
      props: {
        allPizzas: res.data,
        admin
      }
    }
}