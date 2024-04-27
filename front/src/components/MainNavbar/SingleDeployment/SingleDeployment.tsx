import { displayedData } from "../../../helpers/mock-appointments"


function SingleDeployment({date, time, status}:displayedData) {
  return (
        <tr>
          <td>{date}</td>
          <td>{time}</td>
          <td>{status}</td>
        </tr>
  )
}

export default SingleDeployment