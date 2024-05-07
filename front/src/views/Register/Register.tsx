import { Formik, Form, Field, ErrorMessage} from 'formik';
import { validateRegisterForm } from '../../helpers/validateRegisterForm';
import axios from 'axios';
import FormValues from '../../typings/interfaces/FormValues';
import { Link, useNavigate } from 'react-router-dom';
import { PiEye, PiEyeSlash } from "react-icons/pi";
import { PiEyeSlashLight } from "react-icons/pi";
import { useState } from 'react';
import { Bounce, toast } from 'react-toastify';

function Register() {
  //w show/hide password
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmVisibility = () => {
    setShowConfirm(!showConfirm);
  };

  async function registerUser(values:FormValues, {setSubmitting}:{ setSubmitting: (isSubmitting: boolean) => void } ){
    try {
      const response = await axios.post('http://localhost:3001/users/user/register', {
        usrName: values.usrName.trim(),
        email: values.email.trim().toLowerCase(),
        birthDate: values.birthDate.trim(),
        nationalId: values.nationalId.trim(),
        password: values.password.trim()
      });

      toast.info(`Welcome to our barracks. Login to continue`,  {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
        })
      return navigate('/user/login');
    } catch (error) {
      console.error('Registration error:', error);
      alert(`Registration error: ${values.usrName} already exists`);
    } finally {
      setSubmitting(false);
    } 
  }

  return (
    <div className='container'>
      <h1 className='black-ops-one-regular text-center'>Register</h1>
      <Formik
        initialValues={{ usrName: '', email: '', birthDate: '', nationalId:'', password: '', confirm:'' }}
        validate={validateRegisterForm}
        onSubmit={registerUser}
      >
        {({ isSubmitting }) => (
          <Form className='d-flex flex-column align-items-center border roboto-mono-p'>
             <label htmlFor="usrName">User Name</label>
            <Field type="text" name="usrName" placeholder='Pvt.Ryan' />
            <ErrorMessage className='text-danger' name="usrName" component="div" />

            <label htmlFor="email">Email</label>
            <Field type="email" name="email" placeholder='ryan@earnit.com'/>
            <ErrorMessage className='text-danger'  name="email" component="div" />

            <label htmlFor="birthDate">Birth Date</label>
            <Field type="text" name="birthDate" placeholder='06-06-1944'/>
            <ErrorMessage className='text-danger' name="birthDate" component="div" />
          
            <label htmlFor="nationalId">National ID</label>
            <Field type="text" name="nationalId" placeholder='2233322'/>
            <ErrorMessage className='text-danger' name="nationalId" component="div" />

            <label htmlFor="password">Password</label>          
              <Field type={showPassword ? "text" : "password"} name="password" />
              {
              showPassword ? 
              <PiEyeSlash onClick={togglePasswordVisibility} /> :
              <PiEye onClick={togglePasswordVisibility} />
            }
              <ErrorMessage className='text-danger' name="password" component="div" />
          

            <label htmlFor="confirm">Confirm Password</label>
            <Field 
            type={showConfirm ? "text" : "password"} 
            name="confirm" 
            onCopy={(e: React.ClipboardEvent) => e.preventDefault()}
            onPaste={(e: React.ClipboardEvent) => e.preventDefault()}
            onContextMenu={(e: React.MouseEvent) => e.preventDefault()}
            />
            {
              showConfirm ? 
              <PiEyeSlash onClick={toggleConfirmVisibility} /> :
              <PiEye onClick={toggleConfirmVisibility} />
            }
           <ErrorMessage className='text-danger' name="confirm" component="div" />
      

            <button className='btn btn-lg btn-outline-warning  my-3' type="submit" disabled={isSubmitting}>
              Submit
            </button>

            <div className="login h5">
              <p>Already a member?
                <Link to='/user/login' className='text-decoration-none text-warning'> Login here</Link>
                </p>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  )
}

export default Register