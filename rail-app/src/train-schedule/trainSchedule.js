import TrainDetail from "./trains";
import ConnectingTrain from "./connectingTrain";
import {NavLink,useNavigate,useLocation} from "react-router-dom"
import { ReactSession }  from 'react-client-session';
ReactSession.setStoreType("sessionStorage");


const TrainSchedule = () => {
    const username = ReactSession.get("username");
    const location = useLocation();
    const navigate = useNavigate();
    console.log("Received at TrainSchedule(query): ",location.state.query);
    console.log("Received at Train Schedule(location): ",location.state.location);
    const trainDetail = location.state.query;
    const userFetch = location.state.location;
    console.log(trainDetail);
    if(userFetch.flag === 0){
    return (
        <div>
            <div className="container train-container">
                <TrainDetail trainDetail={trainDetail} userFetch={userFetch} />
            </div>
        </div>
    );
     } else {
        return (
            <div>
                <div className="container train-container">
                    <ConnectingTrain trainDetail={trainDetail} userFetch={userFetch} />
                </div>
            </div>
        );
     }
};

export default TrainSchedule;
