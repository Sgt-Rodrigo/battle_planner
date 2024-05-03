import { useDispatch } from "react-redux";
import { SingleDeploymentProps } from "../../typings/types/SingleDeployment";
import { AppDispatch } from "../../redux/state/store";
import { cancelDeployment } from "../../redux/slices/userSlice";



function SingleDeployment({id,date, time, location, gameMode, status}:SingleDeploymentProps) {
  const dispatch = useDispatch<AppDispatch>();

  return (
        <tr>
          <td>{date}</td>
          <td>{time}</td>
          <td>{location}</td>
          <td>{gameMode}</td>
          <td>{status}</td>
          <td><button type="button" onClick={()=>dispatch(cancelDeployment(id))}>Cancel</button></td>
        </tr>
  )
}

export default SingleDeployment