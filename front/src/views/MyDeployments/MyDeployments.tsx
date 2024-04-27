import { useState } from "react";
import dataAppointments from "../../helpers/mock-appointments";
import SingleDeployment from "../../components/MainNavbar/SingleDeployment/SingleDeployment";
import Table from 'react-bootstrap/Table';

function MyDeployments() {
    const [appointments, setAppointments] = useState(dataAppointments);

  return (
    <>
        <h1>My Deployments</h1>

        <Table striped bordered hover variant="dark">
      <thead>
        <tr>
          <th>#</th>
          <th>Deployment Time</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        {
            appointments.map(appointment =>{
                return <SingleDeployment 
                            key={appointment.id}
                            date={appointment.date}
                            time={appointment.time}
                            status ={appointment.status}
                        />
            })
        }       
      </tbody>
    </Table>
        
    
    </>
  )
}

export default MyDeployments;