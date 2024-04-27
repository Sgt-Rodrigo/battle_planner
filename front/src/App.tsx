import './App.scss'; //w global styles
import MainNavbar from './components/MainNavbar/MainNavbar';
import Home from './views/Home/Home'; 
import MyDeployments from './views/MyDeployments/MyDeployments';


function App() {

  return (
    <>
        <MainNavbar/>
        
      <div className="container">
        <Home/>
        <MyDeployments/>
      </div>

    </>
  )
}

export default App
