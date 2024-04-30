import { Outlet } from "react-router-dom"
import MainFooter from "../components/MainFooter/MainFooter"
import MainNavbar from "../components/MainNavbar/MainNavbar"




function MainLayout() {
  return (
    <>
        <MainNavbar/>

        <div className="container">
            <Outlet/>
        </div>

        <MainFooter/>
    </>
  )
}

export default MainLayout