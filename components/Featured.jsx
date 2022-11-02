import styles from '../styles/Featured.module.css'
import Image from 'next/image'
import { useState } from 'react'

const Featured = () => {
    const [slideNum, setSlideNum ] = useState(0)

  const images = [
      '/images/featured2.png',
      '/images/featured.png',
    '/images/featured3.png',
  ]

  const handleArrow = (direction) => {
    if(direction === 'l'){
        setSlideNum( slideNum !== 0 ? slideNum -1 : 2)
    }
    if(direction === 'r'){
        setSlideNum( slideNum !== 2 ? slideNum + 1 : 0)
    }
  }
console.log(slideNum)
  return (
    <section className={styles.container}>
      <div className={styles.arrowContainer} style={{ left: 0 }} onClick={()=>handleArrow('l')}>
        <Image src='/images/arrowl.png' alt='' fill style={{objectFit: 'contain'}} />
      </div>
      <div className={styles.wrapper} style={{transform:`translateX(${-100 * slideNum}vw)`}}>
        {images.map((img, index) => (
          <div className={styles.imgContainer} key={index}>
            <Image src={img} alt='featured'  style={{objectFit: 'contain'}}  width='500' height='500' />
          </div>
        ))}
      </div>
      <div className={styles.arrowContainer} style={{ right: 0 }} onClick={()=>handleArrow('r')}>
        <Image src='/images/arrowr.png' alt='' fill style={{objectFit: 'contain'}} />
      </div>
    </section>
  )
}

export default Featured
