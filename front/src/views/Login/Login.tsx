import { Formik, Form, Field, ErrorMessage} from 'formik';
import axios from 'axios';
import { validateLoginForm } from '../../helpers/validateLoginForm';
import { LoginValues } from '../../typings/interfaces/FormValues';
import {  useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../redux/state/store';
import { loginUserSuccess } from '../../redux/slices/userSlice';
import { Link, useNavigate } from 'react-router-dom';
import { Bounce, toast } from 'react-toastify';



function Login() {
  //w I dont need this selector here cause I m not interpolating any data in this view.This is just for testing the output.
  const userData = useSelector((state:RootState)=>state.user);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();


  //w onSubmit function
 async function loginUser(values:LoginValues,{setSubmitting}:{setSubmitting:(isSubmitting:boolean)=> void}){
    try {
      const uri = 'http://localhost:3001/users/login';

      const res = await axios.post(uri, {
        usrName:values.usrName,
        password: values.password
      })

      const userData = res.data
      console.log('Data Received from controller',userData);

      dispatch(loginUserSuccess(userData.user));
      console.log(userData.user.name);
      console.log(userData.user.email);
      console.log(userData.user.appointments)

      toast.success(`Gear up ${userData.user.name}!!!!`,{
        position: "top-right",
        autoClose: 2500,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce
        })
      return navigate('/user/deployments');
     
    } catch (error) {
      if(error instanceof Error){
        console.log('Login Error:', error.message)
        alert('Login Failed: check username and password')
      }
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className='container'>
    <h1 className='text-center black-ops-one-regular'>Login</h1>
    <Formik
      initialValues={{ usrName: '', password: '' }}
      validate={validateLoginForm}
      onSubmit={loginUser}
    >
      {({ isSubmitting }) => (
        <Form className='d-flex flex-column align-items-center'>
           <label htmlFor="usrName">User Name</label>
          <Field type="text" name="usrName" />
          <ErrorMessage className='text-danger' name="usrName" component="div" />

          <label htmlFor="password">Password</label>
          <Field type="password" name="password" />
          <ErrorMessage className='text-danger' name="password" component="div" />

          <button className='btn btn-lg btn-outline-warning my-3' type="submit" disabled={isSubmitting}>
            Submit
          </button>

          <div className="login h5">
              <p>Still not a member?
                <Link to='/user/register' className='text-decoration-none text-warning'> Enlist here</Link>
                </p>
            </div>
        </Form>
      )}
    </Formik>
  </div>
  )
}

export default Login