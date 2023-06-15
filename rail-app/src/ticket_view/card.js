import "./card.css";
import Traincard from "./train_card.js";
import PassDetails from "./pass_details.js";
import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { useReactToPrint } from "react-to-print";
import { ReactSession } from "react-client-session";
ReactSession.setStoreType("sessionStorage");

const Card = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const username = ReactSession.get("username");
    const trainDetail = location.state.trainDetail;
    const userFetch = location.state.userFetch;
    const [passenger, setpassenger] = useState([]);
    const [passenger2, setpassenger2] = useState([]);
    console.log(userFetch, trainDetail);
    useEffect(() => {
        if (userFetch.flag) {
            const obj = {
                username: username,
                date: userFetch.date_picker,
                train_no_1: trainDetail.train_no_1,
                train_no_2: trainDetail.train_no_2,
                flag: userFetch.flag,
            };
            fetch("http://localhost:5000/ticket/connectfetch1", {
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                },
                method: "POST",
                body: JSON.stringify(obj),
            })
                .then((response) => {
                    return response.json();
                })
                .then((myjson) => {
                    console.log(myjson);
                    setpassenger(myjson);
                });
            fetch("http://localhost:5000/ticket/connectfetch2", {
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                },
                method: "POST",
                body: JSON.stringify(obj),
            })
                .then((response) => {
                    return response.json();
                })
                .then((myjson) => {
                    console.log(myjson);
                    setpassenger2(myjson);
                });
        } else {
            const obj = {
                username: username,
                date: userFetch.date_picker,
                train_no: trainDetail.train_no,
                flag: userFetch.flag,
            };
            fetch("http://localhost:5000/ticket/fetch", {
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                },
                method: "POST",
                body: JSON.stringify(obj),
            })
                .then((response) => {
                    return response.json();
                })
                .then((myjson) => {
                    console.log(myjson);
                    setpassenger(myjson);
                });
        }
    }, []);
    const componentRef = useRef();
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    });
    // console.log(userFetch, trainDetail, passenger);

    // const ticket = {
    //     train_no: "12345",
    //     train_name: "Rockfort Express",
    //     from: "Chennai",
    //     to: "Trichy",
    //     startTime: "10:00",
    //     endTime: "16:00",
    //     passenger: [
    //         {
    //             ticket_no: "4343",
    //             name: "Nitish",
    //             age: 18,
    //             Coach: "D5",
    //             seat: 35,
    //             contact: 7200838025,
    //         },
    //         {
    //             ticket_no: "4345",
    //             name: "Nitish",
    //             age: 18,
    //             Coach: "D5",
    //             seat: 35,
    //             contact: 7200838025,
    //         },
    //         {
    //             ticket_no: "4347",
    //             name: "Nitish",
    //             age: 18,
    //             Coach: "D5",
    //             seat: 35,
    //             contact: 7200838025,
    //         },
    //     ],
    // };
    if (userFetch.flag) {
        return (
            <>
                <div className="card">
                    <p
                        style={{
                            color: "green",
                            textAlign: "center",
                            fontSize: "22px",
                        }}
                    >
                        YOUR BOOKING IS COMPLETE !
                    </p>
                    <p style={{ textAlign: "center" }}>Happy Journey ! </p>
                    <div ref={componentRef} className="ticket-card">
                        <Traincard
                            arrival={trainDetail.arrival_1}
                            departure={trainDetail.departure_1}
                            dateofjourney={userFetch.date_picker}
                            from={trainDetail.from_station_1}
                            to={trainDetail.to_station_1}
                        />
                        <p className="cells bold">Ticket no</p>
                        <p className="cells bold">Name</p>
                        <p className="cells bold">Age</p>
                        <p className="cells bold">Gender</p>
                        <p className="cells bold">Coach</p>
                        <p className="cells bold">Seat no</p>
                        <p className="cells bold">Fare</p>
                        {passenger.map((item) => {
                            return <PassDetails pass={item} />;
                        })}
                    </div>
                    <div className="ticket-card">
                        <Traincard
                            arrival={trainDetail.arrival_2}
                            departure={trainDetail.departure_2}
                            dateofjourney={userFetch.date_picker}
                            from={trainDetail.from_station_2}
                            to={trainDetail.to_station_2}
                        />
                        <p className="cells bold">Ticket no</p>
                        <p className="cells bold">Name</p>
                        <p className="cells bold">Age</p>
                        <p className="cells bold">Gender</p>
                        <p className="cells bold">Coach</p>
                        <p className="cells bold">Seat no</p>
                        <p className="cells bold">Fare</p>
                        {passenger2.map((item) => {
                            return <PassDetails pass={item} />;
                        })}
                    </div>
                    <button onClick={handlePrint}>Print</button>
                </div>
            </>
        );
    } else {
        console.log(userFetch);
        return (
            <>
                <div className="card">
                    <p
                        style={{
                            color: "green",
                            textAlign: "center",
                            fontSize: "22px",
                        }}
                    >
                        YOUR BOOKING IS COMPLETE !
                    </p>
                    <p style={{ textAlign: "center", fontSize: "18px", margin: "1em" }}>Happy Journey ! </p>
                    <div ref={componentRef} className="ticket-card">
                        <Traincard
                            arrival={trainDetail.arrival}
                            departure={trainDetail.departure}
                            dateofjourney={userFetch.date_picker}
                            from={trainDetail.from_station}
                            to={trainDetail.to_station}
                        />
                        <p className="cells bold">Ticket no</p>
                        <p className="cells bold">Name</p>
                        <p className="cells bold">Age</p>
                        <p className="cells bold">Gender</p>
                        <p className="cells bold">Coach</p>
                        <p className="cells bold">Seat no</p>
                        <p className="cells bold">Fare</p>
                        {passenger.map((item) => {
                            return <PassDetails pass={item} />;
                        })}
                    </div>
                    <div >
                    <input style={{margin: "1em auto", display: "block"}}type="button" value="print" onClick={handlePrint}/>
                    </div>
                </div>
            </>
        );
    }
};

export default Card;
