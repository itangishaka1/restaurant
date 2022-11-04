import axios from 'axios'
import Head from 'next/head'
import Image from 'next/image'
import Featured from '../components/Featured'
import PizzaList from '../components/PizzaList'
import styles from '../styles/Home.module.css'

export default function Home({ allPizzas }) {
  return (
    <div className={styles.container}>
      <Head>
        <title>Pizza Restaurant in Toronto</title>
        <meta name="description" content="Best pizza shop in town" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Featured />
      <PizzaList allPizzas={allPizzas} />
    </div>
  )
}

export const getServerSideProps = async () => {
    const res = await axios.get('http://localhost:3000/api/product')
    return {
      props: {
        allPizzas: res.data
      }
    }
}