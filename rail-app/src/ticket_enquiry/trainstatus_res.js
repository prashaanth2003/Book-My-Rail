import "./train_enq.css";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

const Result = () => {
    const location = useLocation();
    const temp = location.state;
    const [station, setStation] = useState([]);
    useEffect(() => {
        fetch("http://localhost:5000/trainenq/details", {
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            method: "POST",
            body: JSON.stringify({ temp: temp }),
        })
            .then(function (response) {
                return response.json();
            })
            .then(function (myjson) {
                setStation(myjson);
            });
    }, []);

    let currentdate = new Date();
    const currTime = currentdate.toLocaleTimeString("en-UK")

    return (
        <>
            <div className="map-container container">
                <p>Current Status of Train Number : {temp}</p>
                <div className="value-container header">
                    <p>Arrived Station</p>
                    <p></p>
                    <p>Station Name</p>
                    <p>Departure</p>
                </div>

                {station.map((item) => {
                    const [station, code] = String(item.station_name).split(
                        "-"
                    );
                    if (item.arrival < currTime) {
                        return (
                            <div key={code} className="stations">
                                <div>{code}</div>
                                <div className="route">
                                    <div className="line green"></div>
                                    <div className="circle green"></div>
                                </div>
                                <div>{String(station).trim()}</div>
                                <div>{item.arrival}</div>
                            </div>
                        );
                    } else {
                        return (
                            <div key={code} className="stations">
                                <div>{code}</div>
                                <div className="route">
                                    <div className="line"></div>
                                    <div className="circle"></div>
                                </div>
                                <div>{String(station).trim()}</div>
                                <div>{item.arrival}</div>
                            </div>
                        );
                    }
                })}
            </div>
        </>
    );
};

export default Result;
