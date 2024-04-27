import { displayedData } from "../../helpers/mock-appointments"


function SingleDeployment({date, time, location, gameMode, status}:displayedData) {
  return (
        <tr>
          <td>{date}</td>
          <td>{time}</td>
          <td>{location}</td>
          <td>{gameMode}</td>
          <td>{status}</td>
        </tr>
  )
}

export default SingleDeployment