import { Formik, Form, Field, ErrorMessage} from 'formik';
import { validateRegisterForm } from '../../helpers/validateRegisterForm';
import axios from 'axios';
import FormValues from '../../typings/interfaces/FormValues';
import { Link } from 'react-router-dom';

function Register() {

  async function registerUser(values:FormValues, {setSubmitting}:{ setSubmitting: (isSubmitting: boolean) => void } ){
    try {
      const response = await axios.post('http://localhost:3001/users/user/register', {
        usrName: values.usrName,
        email: values.email,
        birthDate: values.birthDate,
        nationalId: values.nationalId,
        password: values.password
      });
      console.log(response.data);
      alert('Registration successful');
    } catch (error) {
      console.error('Registration error:', error);
      alert('Registration failed');
    } finally {
      setSubmitting(false);
    } 

  }

  return (
    <div className='container'>
      <h1>Register</h1>
      <Formik
        initialValues={{ usrName: '', email: '', birthDate: '', nationalId:'', password: '' }}
        validate={validateRegisterForm}
        onSubmit={registerUser}
      >
        {({ isSubmitting }) => (
          <Form className='d-flex flex-column align-items-center'>
             <label htmlFor="usrName">User Name</label>
            <Field type="text" name="usrName" />
            <ErrorMessage name="usrName" component="div" />

            <label htmlFor="email">Email</label>
            <Field type="email" name="email" />
            <ErrorMessage name="email" component="div" />

            <label htmlFor="birthDate">Birth Date</label>
            <Field type="text" name="birthDate" />
            <ErrorMessage name="birthDate" component="div" />
          
            <label htmlFor="nationalId">National ID</label>
            <Field type="text" name="nationalId" />
            <ErrorMessage name="nationalId" component="div" />

            <label htmlFor="password">Password</label>
            <Field type="password" name="password" />
            <ErrorMessage name="password" component="div" />

            <h3>Confirm password field goes here mate!!!!</h3>

            <button type="submit" disabled={isSubmitting}>
              Submit
            </button>
          </Form>
        )}
      </Formik>
    </div>
  )
}

export default Register