import { Formik, Form, Field, ErrorMessage} from 'formik';
import axios from 'axios';
import { validateLoginForm } from '../../helpers/validateLoginForm';
import { LoginValues } from '../../typings/interfaces/FormValues';
import {  useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../redux/state/store';
import { loginUserSuccess } from '../../redux/slices/userSlice';
import { useNavigate } from 'react-router-dom';






function Login() {
  //w I dont need this selector here cause I m not interpolating any data in this view.This is just for testing the output.
  const userData = useSelector((state:RootState)=>state.user);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();



  async function loginUser(values:LoginValues,{setSubmitting}:{setSubmitting:(isSubmitting:boolean)=> void}){
    try {
      const uri = 'http://localhost:3001/users/login';

      const res = await axios.post(uri, {
        usrName:values.usrName,
        password: values.password
      })

      const userData = res.data
      console.log(userData);

      dispatch(loginUserSuccess(userData));
      console.log(userData.user.name);
      console.log(userData.user.email);
      console.log(userData.user.appointments)

      alert('Login successful')
      navigate('/user/deployments');
     
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
    <h1>Login</h1>
    <Formik
      initialValues={{ usrName: '', password: '' }}
      validate={validateLoginForm}
      onSubmit={loginUser}
    >
      {({ isSubmitting }) => (
        <Form className='d-flex flex-column align-items-center'>
           <label htmlFor="usrName">User Name</label>
          <Field type="text" name="usrName" />
          <ErrorMessage name="usrName" component="div" />

          <label htmlFor="password">Password</label>
          <Field type="password" name="password" />
          <ErrorMessage name="password" component="div" />

          <button type="submit" disabled={isSubmitting}>
            Submit
          </button>
        </Form>
      )}
    </Formik>
  </div>
  )
}

export default Login