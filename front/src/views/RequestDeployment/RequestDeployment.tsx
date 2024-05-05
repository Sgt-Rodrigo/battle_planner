import { ErrorMessage, Field, Formik, Form } from "formik"
import { validateDeploymentForm } from "../../helpers/validateDeploymentForm"
import { scheduleDeployment } from "../../redux/slices/userSlice"
import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, RootState } from "../../redux/state/store"
import { useNavigate } from "react-router-dom"
import { NewDeploymentInput } from "../../typings/types/NewDeployment"


function RequestDeployment() {
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();

    const initialValues = {
        date:'',
        time:'',
        location:'',
        gameMode:'',
    }   

   //w onSubmit function
    async function scheduleNewDeployment(
        values:NewDeploymentInput, 
        {setSubmitting}:{setSubmitting:(isSubmitting:boolean)=> void}) {  
           dispatch(scheduleDeployment(values)).then(() => {
                setSubmitting(false);
                navigate('/user/deployments');   
    })
        }

  return (
    <>
     <div className='container'>
      <h1>Request Deployment</h1>
      <Formik
        initialValues={initialValues}
        validate={validateDeploymentForm}
        onSubmit={scheduleNewDeployment}
      >
        {({ isSubmitting }) => (
          <Form className='d-flex flex-column align-items-center'>
             <label htmlFor="date">Date</label>
            <Field type="text" name="date" placeholder='dd-mm-yyyy'/>
            <ErrorMessage name="date" component="div" />

            <label htmlFor="time">Time</label>
            <Field as="select" name="time">
            <option value="Time">Time</option>
                {Array.from({ length: 12 }, (_, i) => i + 9).map((hour) => (
                    <option key={hour} value={`${hour}:00`}>{`${hour}:00`}</option>
                ))}
            </Field>
            <ErrorMessage name="time" component="div" />

            <label htmlFor="location">Location</label>
            <Field as="select" name="location">
                <option value="Location">Location</option>
                <option value="Ambush Activities (Southampton, UK)">Ambush Activities (Southampton, UK)</option>
                <option value="Absolute Airsoft (Reading, UK)">Absolute Airsoft (Reading, UK)</option>
                <option value="Ground Zero Airsoft (Ringwood, UK)">Ground Zero Airsoft (Ringwood, UK)</option>
                <option value="Saigon Airsoft (BsAs, AR)">Saigon Airsoft (BsAs, AR)</option>
                <option value="1915 Airsoft Field (Sao Pablo, BR)">1915 Airsoft Field (Sao Pablo, BR)</option>
                <option value="Center Mass Airsoft (Kansas, US)">Center Mass Airsoft (Kansas, US)</option>
                <option value="Airsoft Depot (Georgia, US)">Airsoft Depot (Georgia, US)</option>
            </Field>
            <ErrorMessage name="location" component="div" />
          
            <label htmlFor="game-mode">Game Mode</label>
            <Field as="select" name="gameMode" >
                <option value="Select Mode">Game Mode</option>
                <option value="CTF">CTF</option>
                <option value="CQB indoor">CQB indoor</option>
                <option value="CQB outdoor">CQB outdoor</option>
                <option value="KOTH">KOTH</option>
                <option value="Milsim Event">Milsim Event</option>
                <option value="Hostage Rescue">Hostage Rescue</option>
                <option value="Team DeathMatch">Team DeathMatch</option>
                <option value="Hide & Seek">Hide & Seek</option>
                <option value="Juggernaut">Juggernaut</option>
            </Field>
            <ErrorMessage name="game-mode" component="div"/>        

            <button className="mt-3 btn btn-warning" type="submit" disabled={isSubmitting}>
              Submit
            </button>
          </Form>
        )}
      </Formik>
    </div>
    </>
  )
}

export default RequestDeployment