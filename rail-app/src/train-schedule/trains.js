import { ReactSession } from "react-client-session";
import { useNavigate } from "react-router-dom";
import {useState} from "react";
ReactSession.setStoreType("sessionStorage");

const TrainDetail = (props) => {
    const trainDetail = props.trainDetail;
    const [userFetch, setFetch] = useState(props.userFetch);
    const navigate = useNavigate();
    const username = ReactSession.get("username");

    const changeClass = (e) => {
        setFetch({...userFetch, ["select"]:e.target.name});
        console.log(e.target.name);
        console.log(userFetch);
    };
    // console.log("The Train Details to be displayed: ",props.train_det); 

    return (
        <>
            {trainDetail.map((train) => (
               <div className="container">
               <div className="value-container">
                   {train.train_no} - {train.train_name}
               </div>
               <div className="to-from">
                   <div>
                       {userFetch.from} - {train.arrival}
                   </div>
                   <div>
                       {userFetch.to} - {train.departure}
                   </div>
               </div>
               <div className="class-container">
                   <input
                       type="button"
                       onClick={changeClass}
                       name="FC"
                       value={"First Class: " + String(train.FC_total - train.FC_booked)}
                   />
                   <input
                       type="button"
                       onClick={changeClass}
                       name="AC"
                       value={"AC: " + String(train.AC_total - train.AC_booked)}
                   />
                   <input
                       type="button"
                       onClick={changeClass}
                       name="ST"
                       value={"Sitting: " + String(train.ST_total - train.ST_booked)}
                   />
                   <input
                       type="button"
                       onClick={changeClass}
                       name="SL"
                       value={"Sleeper: " + String(train.SL_total - train.SL_booked)}
                   />
               </div>
               <input type="submit" value="Book now" onClick={() => {
                if (username) {
                    navigate("/booking", {state: {trainDetail: train, userFetch: userFetch}});
                } else {
                    alert("Login first");
                    navigate("/login");
                }}} />
           </div>
            ))}
        </>
    );
};

export default TrainDetail;
