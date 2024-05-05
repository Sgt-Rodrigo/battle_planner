//w bear in mind, modules are only used with namespacing.
//w bootstrap and normal .scss (with no .module) can be used without ${}
import { Link } from 'react-router-dom';
import styles from './Home.module.scss';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/state/store';
import {Bounce, toast} from 'react-toastify';


function Home() {
  const userData = useSelector((state:RootState)=>state.user);
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
            {
                !userData.login ? 
                  <Link className='text-decoration-none text-warning border border-warning h3' to='/user/register'>
                    <i>Register</i>
                  </Link> 
                : 
                <a className='text-decoration-none text-warning border border-warning h3' href='#'onClick={() => toast.info('You are already logged in', {
                  position: "top-right",
                  autoClose: 2000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
                  theme: "dark",
                  transition: Bounce,
                  })}>
                <i>Register</i>
              </a> 
                
            }
               today for an unparalleled airsoft warfare experience. <br />
               {
                !userData.login ? 
                <Link className={`${styles.connect__link} text-decoration-none h2 border border-warning`} to='/user/login'>
                <i> Connect</i>
                </Link> :
                 <Link className={`${styles.connect__link} text-decoration-none h2 border border-warning`} to='/user/new_deployment'>
                 <i> Connect</i>
                 </Link>
               }
                with top-tier airsoft arenas across the globe. <br />
                
                {
                  !userData.login ? 
                  <Link className='text-decoration-none text-danger h1 border border-danger' to='/user/login'>
                  <i> Deploy</i>
                  </Link> :
                   <Link className='text-decoration-none text-danger h1 border border-danger' to='/user/deployments'>
                   <i> Deploy</i>
                   </Link>
                }
               
                  into the epicenter of <i>immersive warfare simulation</i> and reshape your airsoft experience.
            </p>
          </div>
       </div>
    </>
  )
}

export default Home