import InputWithIcon from "./input";
import ResponsiveDatePickers from "./date_picker";
import SelectTextFields from "./select";
import ContainedButtons from "./button";
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { ReactSession } from "react-client-session";
import Booking from "../booking/booking";
import StationSelect from "./station-select";
ReactSession.setStoreType("sessionStorage");

const Plan_your_journey = () => {
    const username = ReactSession.get("username");
    const location = useLocation();
    const navigate = useNavigate();
    const [obj, setObj] = useState(() => {
        return {
            from: "",
            to: "",
            date_picker: new Date().toLocaleDateString('en-UK'),
            select: "",
            select2: "",
            flag: 0
        };  
    });
    const onChangeObj = (e) => {
        setObj({ ...obj, [e.target.name]: e.target.value });
    };

    const onChangeDate = (o) => {
        setObj({ ...obj, [o.name]: o.value.toLocaleDateString('en-UK') });
    };
    const handleConnect = (e) => {
        fetch("http://localhost:5000/planYourJourney/connectingtrain", {
                        headers: {
                            Accept: "application/json",
                            "Content-Type": "application/json",
                        },
                        method: "POST",
                        body: JSON.stringify(obj),
                    }).then(function (response){
                        return response.json();
                    }).then(function (myjson){
                        if (myjson["length"] === 0){
                            alert("No trains available!");
                            navigate('/');
                        }else {
                            navigate("/trainschedule", {
                                state: { location: obj, query: myjson},
                            });
                        }
                    });
    }
    useEffect(() => {
        if(obj.flag) {
            handleConnect()
        }
    }, [obj])
    const handleSubmit = (e) => {
        setObj({...obj, "select2": obj.select});
        fetch("http://localhost:5000/planYourJourney/trainSchedule", {
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            method: "POST",
            body: JSON.stringify(obj),
        }).then(function (response) {
                return response.json();
            }).then(function (myjson) {
                if (myjson["length"] === 0) {
                    setObj({...obj, "flag": 1});
                } else {
                    console.log(myjson);
                    navigate("/trainschedule", {
                        state: { location: obj, query: myjson},
                    });
                }
            });
    };
    return (
        <div className="home-container">
            <h1 className="header-style">Plan Your Journey</h1>
            <div className="container plan-container">
                <h1> Book Tickets </h1>
                <div>
                    <StationSelect name="from" onchange={onChangeObj}/>
                </div>
                <div>
                    <StationSelect name="to" onchange={onChangeObj}/>
                </div>
                <div>
                    <ResponsiveDatePickers onchange={onChangeDate} />
                </div>
                <div>
                    <SelectTextFields onchange={onChangeObj} />
                </div>
                <div>
                    <ContainedButtons value="Search" onclick={handleSubmit} />
                </div>
            </div>
            {/* <div>
                <div></div>

            </div> */}
        </div>
    );
};

export default Plan_your_journey;
