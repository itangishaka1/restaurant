import styles from '../styles/PizzaList.module.css'
import PizzaCard from './PizzaCard'

const PizzaList = ({allPizzas }) => {
  return (
    <section className={styles.container}>
      <h1 className={styles.title}>THE BEST PIZZA IN TOWN</h1>
      <p className={styles.desc}>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores,
        libero! Error earum nobis sequi aliquid sapiente voluptatum libero!
        Error earum nobis sequi aliquid sapiente voluptatum exercitationem,
        maiores rem!
      </p>
      <div className={styles.wrapper}>
        {allPizzas.map(pizza => (
          <PizzaCard  key={pizza._id} pizza={pizza}/>
        ))}
      </div>
    </section>
  )
}

export default PizzaList
