import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import './main.scss'; //w global styles
import Home from './views/Home/Home';
import ErrorPage from './views/Error/ErrorPage';
import Register from './views/Register/Register';
import MainLayout from './layouts/MainLayout';
import Login from './views/Login/Login';
import { Provider } from 'react-redux';
import { store } from './redux/state/store';
import MyDeployments from './views/MyDeployments/MyDeployments';

//w createBrowserRouter(newest implementation), here you set all your client side routes

const router= createBrowserRouter([
  {
    path:'/',
    element: <MainLayout/>,
    errorElement:<ErrorPage/>,
    children: [
      {
        path: '/',
        element: <Home/>,
      },
      {
        path:'/user/register',
        element: <Register/>,
      },
      {
        path:'/user/login',
        element:<Login/>
      },
      {
        path:'/user/deployments',
        element:<MyDeployments/>
      }
      
    ]    
  },
]);

//w RouterProvider component, serves the routes
//w Provider from redux conects Redux with React (makes the global state available to all components)
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router}/>
    </Provider>
  </React.StrictMode>,
)
