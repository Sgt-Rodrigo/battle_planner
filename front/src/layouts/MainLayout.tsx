import { Outlet } from "react-router-dom"
import MainFooter from "../components/MainFooter/MainFooter"
import MainNavbar from "../components/MainNavbar/MainNavbar"
import styles from "./MainLayout.module.scss";




function MainLayout() {
  return (
    <>
        <div className={styles.layout_container}>
          <MainNavbar/>
          <div className="container border">
              <Outlet/>
          </div>
          <MainFooter/>
        </div>
    </>
  )
}

export default MainLayout