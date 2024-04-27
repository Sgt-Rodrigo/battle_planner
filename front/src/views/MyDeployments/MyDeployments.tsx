import { useEffect, useState } from "react";
import { mockAppointments } from "../../helpers/mock-appointments";
import SingleDeployment from "../../components/SingleDeployment/SingleDeployment";
import Table from 'react-bootstrap/Table';

function MyDeployments() {
    //w type useState to avoid 'never' type ts handling which raises errors
    const [deployments, setDeployments] = useState<mockAppointments[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(()=>{
      async function fetchData(){

        try {
          const uri = 'http://localhost:8000/deployments';
          const res = await fetch(uri);
          const data = await res.json();
          setDeployments(data);
          setLoading(false);
        } catch (error) {
          if(error instanceof Error) {
            console.log(error.message)
          }else {
            console.error("An error occurred:", error);
          }
        }
      }

      fetchData();
     

    },[])

  return (
    <>
        <h1>My Deployments</h1>

        {loading ? (
                <p>Loading...</p>
            ) : (
                <Table striped bordered hover variant="dark">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Deployment Time</th>
                            <th>Location</th>
                            <th>Game Mode</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {deployments.map((deployment:mockAppointments) => (
                            <SingleDeployment
                                key={deployment.id}
                                date={deployment.date}
                                time={deployment.time}
                                location={deployment.location}
                                gameMode={deployment.gameMode}
                                status={deployment.status}
                            />
                        ))}
                    </tbody>
                </Table>
            )} 
    
    </>
  )
}

export default MyDeployments;