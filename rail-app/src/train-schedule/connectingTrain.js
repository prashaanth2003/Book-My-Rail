import { ReactSession } from "react-client-session";
import { useNavigate } from "react-router-dom";
import {useState} from "react";
ReactSession.setStoreType("sessionStorage");

const ConnectingTrain = (props) => {
    const trainDetail = props.trainDetail;
    const [userFetch, setFetch] = useState(props.userFetch);
    const navigate = useNavigate();
    const username = ReactSession.get("username");

    const changeClass = (e) => {
        setFetch({...userFetch, ["select"]:e.target.name});
        console.log(e.target.name);
        console.log(userFetch);
    };
    const changeClass2 = (e) => {
        setFetch({...userFetch, ["select2"]:e.target.name});
        console.log(e.target.name);
        console.log(userFetch);
    };
    // console.log("The Train Details to be displayed: ",props.train_det); 

    return (
        <>
            {trainDetail.map((train) => (
               <div className="container">
                <div className="value-container">
                    {train.train_no_1} - {train.train_name_1}
                </div>
               <div className="to-from">
                   <div>
                       {train.from_station_1} - {train.arrival_1}
                   </div>
                   <div>
                       {train.to_station_1} - {train.departure_1}
                   </div>
               </div>
               <div className="class-container">
                   <input
                       type="button"
                       onClick={changeClass}
                       name="FC"
                       value={"First Class: " + String(train.FC_total_1 - train.FC_booked_1)}
                   />
                   <input
                       type="button"
                       onClick={changeClass}
                       name="AC"
                       value={"AC: " + String(train.AC_total_1 - train.AC_booked_1)}
                   />
                   <input
                       type="button"
                       onClick={changeClass}
                       name="ST"
                       value={"Sitting: " + String(train.ST_total_1 - train.ST_booked_1)}
                   />
                   <input
                       type="button"
                       onClick={changeClass}
                       name="SL"
                       value={"Sleeper: " + String(train.SL_total_1 - train.SL_booked_1)}
                   />
               </div>
               <div className="value-container">
                    {train.train_no_2} - {train.train_name_2}
                </div>
               <div className="to-from">
                   <div>
                       {train.from_station_2} - {train.arrival_2}
                   </div>
                   <div>
                       {train.to_station_2} - {train.departure_2}
                   </div>
               </div>
               <div className="class-container">
                   <input
                       type="button"
                       onClick={changeClass2}
                       name="FC"
                       value={"First Class: " + String(train.FC_total_2 - train.FC_booked_2)}
                   />
                   <input
                       type="button"
                       onClick={changeClass2}
                       name="AC"
                       value={"AC: " + String(train.AC_total_2 - train.AC_booked_2)}
                   />
                   <input
                       type="button"
                       onClick={changeClass2}
                       name="ST"
                       value={"Sitting: " + String(train.ST_total_2 - train.ST_booked_2)}
                   />
                   <input
                       type="button"
                       onClick={changeClass2}
                       name="SL"
                       value={"Sleeper: " + String(train.SL_total_2 - train.SL_booked_2)}
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

export default ConnectingTrain;
