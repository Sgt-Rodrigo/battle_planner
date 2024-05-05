import { useDispatch, useSelector } from "react-redux";
import { SingleDeploymentProps } from "../../typings/types/SingleDeployment";
import { AppDispatch, RootState } from "../../redux/state/store";
import { cancelDeployment } from "../../redux/slices/userSlice";



function SingleDeployment({id,date, time, location, gameMode, status}:SingleDeploymentProps) {
  const userData = useSelector((state:RootState)=> state.user);
  const deployment = userData.user.appointments.filter(appointment => appointment.id === id);
  console.log(deployment);
  const dispatch = useDispatch<AppDispatch>();

  return (
        <tr>
          <td>{date}</td>
          <td>{time}</td>
          <td>{location}</td>
          <td>{gameMode}</td>
          <td>{status}</td>
          {
            deployment[0].status === 'cancelled' ? 
            <td>
              <button className="btn btn-muted" type="button" onClick={()=>dispatch(cancelDeployment(id))} disabled>
                Cancel
            </button></td> :
            <td>
              <button className='btn btn-danger' type="button" onClick={()=>dispatch(cancelDeployment(id))}>Cancel
              </button>
            </td>
          }
        </tr>
  )
}

export default SingleDeployment