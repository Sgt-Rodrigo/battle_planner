//w bear in mind, modules are only used with namespacing.
//w bootstrap and normal .scss (with no .module) can be used without ${}
import { Link } from 'react-router-dom';
import styles from './Home.module.scss';


function Home() {
  return (
    <>
       <div className={`border d-flex flex-column justify-content-center  ${styles.hero}`}>
          <div className={`${styles.hero__text} container  d-flex align-items-center border`}>
            <h2 className={`flex-1 w-100 black-ops-one-regular`}>
              <span className={styles.word1}>Gear up</span>
              <span className={styles.word2}>Deploy</span>
              <span className={styles.word3}>Conquer</span>
              </h2>
            <p className={`flex-1 w-100 roboto-mono-p`}>
              <Link className='text-decoration-none text-warning border border-warning h3' to='/user/register'><i>Register</i>
              </Link> today for an unparalleled airsoft warfare experience. <br />
            <Link className={`${styles.connect__link} text-decoration-none h2 border border-warning`} to='/user/register'><i> Connect</i></Link> with top-tier airsoft arenas across the globe. <br />
            <Link className='text-decoration-none text-danger h1 border border-danger' to='/user/register'><i> Deploy</i></Link> into the epicenter of <i>immersive warfare simulation</i> and reshape your airsoft experience.
            </p>
          </div>
       </div>
    </>
  )
}

export default Home