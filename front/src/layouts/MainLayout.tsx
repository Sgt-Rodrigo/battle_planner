import { Outlet } from "react-router-dom"
import MainFooter from "../components/MainFooter/MainFooter"
import MainNavbar from "../components/MainNavbar/MainNavbar"
import styles from "./MainLayout.module.scss";
import { Bounce, ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';




function MainLayout() {
  return (
    <>
        <div className={styles.layout_container}>
          <MainNavbar/>
          {/* do not wrapp or style the 'outlet' here cause you will restrict all views to specific styles like margins for instance, but your hero dont have margins, it should expand all the way        */}
              <Outlet/>
          <MainFooter/>
        </div>
        <ToastContainer/>
    </>
  )
}

export default MainLayout