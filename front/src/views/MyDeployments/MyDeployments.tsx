import SingleDeployment from "../../components/SingleDeployment/SingleDeployment";
import Table from 'react-bootstrap/Table';
import { useSelector } from "react-redux";
import { RootState } from "../../redux/state/store";
import { userDeployment } from "../../typings/types/userDeployment";
import { Link } from "react-router-dom";
import styles from './MyDeployments.module.scss';


function MyDeployments(){
  const userData = useSelector((state:RootState)=>state.user);
  const userDeployments = userData.user.appointments;
  console.log('Hi Mate',userData);
  console.log('userDeployments', userDeployments); 


  return (
    <>
        {
            userDeployments.length > 0 &&  
            <h1 className="text-center">Upcoming Deployments</h1>
        }
       

        {
            !userDeployments.length ? 
            <>
             <h2 className="text-center">Everything quiet in the frontlines <br />
                No deployments ahead. 
            </h2>
           <Link className="text-center text-decoration-none " to='/user/new_deployment'>
            <h3 className="btn btn-lg btn-outline-warning  px-5 py-1 ">Request Deployment</h3>
            </Link>
            
            </>
            : 
                <Table striped bordered hover variant="dark" responsive>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Deployment Time</th>
                            <th>Location</th>
                            <th>Game Mode</th>
                            <th>Status</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {userDeployments.map((deployment:userDeployment) => (
                            <SingleDeployment
                                key={deployment.id}
                                id={deployment.id}
                                date={deployment.date}
                                time={deployment.time}
                                location={deployment.location}
                                gameMode={deployment.gameMode}
                                status={deployment.status}
                               
                            />
                        ))}
                    </tbody>
                </Table>         

        }
    
    </>
  )

}


// function MyDeployments() {
//     //w type useState to avoid 'never' type ts handling which raises errors
//     const [deployments, setDeployments] = useState<mockAppointments[]>([]);
//     const [loading, setLoading] = useState(true);

//     //w test
//       const userData = useSelector((state:RootState)=>state.user);
//     const userDeployments = userData.user.user.appointments;
//    console.log('LOOK',userDeployments)
    
//     // useEffect(()=>{
//     //   async function fetchData(){

//     //     try {
//     //       const uri = 'http://localhost:8000/deployments';
//     //       const res = await fetch(uri);
//     //       const data = await res.json();
//     //       setDeployments(data);
//     //       setLoading(false);
//     //     } catch (error) {
//     //       if(error instanceof Error) {
//     //         console.log(error.message)
//     //       }else {
//     //         console.error("An error occurred:", error);
//     //       }
//     //     }
//     //   }
//     //   //w calls it!!!
//     //   fetchData();    

//     // },[])

//     useEffect(()=>{
//       async function fetchData(){

//         try {
//           const uri = `http://localhost:3001/appointments/`
//           const res = await axios.get(uri);
//           setDeployments(res.data);
//           setLoading(false);
//         } catch (error) {
//           if(error instanceof Error){
//             console.log(error.message)
//           }
//         }
//       }
//       fetchData();
//     },[])

//   return (
//     <>
//         <h1>My Deployments</h1>

//         {loading ? (
//                 <p>Loading...</p>
//             ) : (
//                 <Table striped bordered hover variant="dark">
//                     <thead>
//                         <tr>
//                             <th>#</th>
//                             <th>Deployment Time</th>
//                             <th>Location</th>
//                             <th>Game Mode</th>
//                             <th>Status</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {deployments.map((deployment:mockAppointments) => (
//                             <SingleDeployment
//                                 key={deployment.id}
//                                 date={deployment.date}
//                                 time={deployment.time}
//                                 location={deployment.location}
//                                 gameMode={deployment.gameMode}
//                                 status={deployment.status}
//                             />
//                         ))}
//                     </tbody>
//                 </Table>
//             )} 
    
//     </>
//   )
// }

export default MyDeployments;