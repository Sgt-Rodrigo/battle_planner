import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import './main.scss'; //w global styles
import Home from './views/Home/Home';
import ErrorPage from './views/Error/ErrorPage';
import Register from './views/Register/Register';
import MainLayout from './layouts/MainLayout';
import Login from './views/Login/Login';

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
      }
      
    ]    
  },
]);

//w RouterProvider component, serves the routes
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>,
)
