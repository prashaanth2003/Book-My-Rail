import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { faMultiply } from "@fortawesome/free-solid-svg-icons";
import {useLocation,useNavigate} from "react-router-dom";
import {useEffect} from "react";
import { ReactSession } from "react-client-session";
ReactSession.setStoreType("sessionStorage");

const TicketFare = (props) => {
    const count = props.count + 1;
    const fare = props.fare.fare;
    return (
        <div className="container ticket">
            <h4>Fare table: </h4>
            <p>Total Passenger: {count}</p>
            <p>Fare: {fare * count} </p>
        </div>
    );
};

const Booking = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const username = ReactSession.get("username");
    const trainDetail = location.state.trainDetail;
    const userFetch = location.state.userFetch;
    const [fare, setFare] = useState({});
    useEffect(() => {
        if(userFetch.flag){
            fetch("http://localhost:5000/booking/connectfareCalculation", {
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
                method: "POST",
                body: JSON.stringify({"select": userFetch.select, "select2": userFetch.select2, "train_no_1": trainDetail.train_no_1, "train_no_2": trainDetail.train_no_2, "from_1": trainDetail.from_station_1, "to_1": trainDetail.to_station_1, "from_2": trainDetail.from_station_2, "to_2": trainDetail.to_station_2}),
            }).then(function (response) {
                    return response.json();
                })
                .then(function (myjson) {
                    console.log(myjson);
                    setFare(myjson[0]);
                });
        } else {
            fetch("http://localhost:5000/booking/fareCalculation", {
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
                method: "POST",
                body: JSON.stringify({"select": userFetch.select, "train_no": trainDetail.train_no, "from": trainDetail.from_station, "to": trainDetail.to_station}),
            }).then(function (response) {
                    return response.json();
                })
                .then(function (myjson) {
                    setFare(myjson[0]);
                });
        }
    }, [])
    const profile = 
        {
            name: "",
            age: 0,
            gender: "",
            preference: "",
        };
    const [count, setCount] = useState(0);
    const [passenger, setPassengerDetails] = useState([profile]);

    const handleChange = (inp) => {
        setPassengerDetails((s) => {
            const newArr = s.slice();
            if (inp.target.name === "name") {
                newArr[inp.target.className].name = inp.target.value;
            }
            if (inp.target.name === "age") {
                newArr[inp.target.className].age = inp.target.value;
            }
            if (inp.target.name === "gender") {
                newArr[inp.target.className].gender = inp.target.value;
            }
            if (inp.target.name === "preference") {
                newArr[inp.target.className].preference = inp.target.value;
            }
            return newArr;
        });
        console.log(passenger);
    };

    const addPassenger = () => {
        setCount(count + 1);
        setPassengerDetails((s) => [...s, profile]);
    };

    const removePassenger = () => {
        if (count > 0) {
            setCount(count - 1);
            setPassengerDetails((s) => {
                const newArr = s.slice(0, count);
                return newArr;
            });
        }
    };

    const submitChange = (e) => {
        e.preventDefault();
        console.log("Passengers Count: " + count);
        passenger.forEach((item) => {
            console.log(item.name + item.gender + item.age + item.preference);
        });
        const obj = {...userFetch, ...trainDetail, ["username"]: username, ["fare"]: fare, ["passenger"]: passenger};
        console.log(obj);
        if(userFetch.flag){
            fetch("http://localhost:5000/booking/connectsubmission", {
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
                method: "POST",
                body: JSON.stringify(obj),
            }).then (function (response) {
                return response.json();
            }).then (function (myjson) {
                if(myjson["flag"] === 0){
                    alert("All seats are booked!");
                    navigate("/");
                } else {
                    navigate("/ticket", {state: { userFetch: userFetch, trainDetail: trainDetail}})
                }
            })
        } else {
            fetch("http://localhost:5000/booking/submission", {
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
                method: "POST",
                body: JSON.stringify(obj),
            }).then (function (response) {
                return response.json();
            }).then (function (myjson) {
                if(myjson["flag"] === 0){
                    alert("All seats are booked!");
                    navigate("/");
                } else {
                    navigate("/ticket", {state: { userFetch: userFetch, trainDetail: trainDetail}})
                }
            })
        }
        
    };

    return (
        <div className="booking-section">
                {/* <div className="container train-container">
                    <TrainDetail />
                </div> */}
                <div className="container passenger-container">
                    <p>Passenger details</p>
                    <form onSubmit={submitChange} id="passForm">
                        {
                            // console.log(typeof(passenger));
                            passenger.map((item, i) => {
                                return (
                                    <div key={i}>
                                        <p>Passenger {i + 1}</p>
                                        <input
                                            className={i}
                                            name="name"
                                            type="text"
                                            placeholder="name"
                                            onChange={handleChange}
                                        />
                                        <input
                                            className={i}
                                            name="age"
                                            placeholder="age"
                                            type="number"
                                            onChange={handleChange}
                                        />
                                        <select
                                            className={i}
                                            name="gender"
                                            placeholder="Gender"
                                            onChange={handleChange}
                                        >
                                            <option
                                                value="null"
                                                disabled
                                                selected
                                                hidden
                                            >
                                                Gender
                                            </option>
                                            <option value="Male">Male</option>
                                            <option value="Female">
                                                Female
                                            </option>
                                            <option value="Others">
                                                Others
                                            </option>
                                        </select>
                                        <select
                                            className={i}
                                            name="preference"
                                            onChange={handleChange}
                                        >
                                            <option
                                                value="Null"
                                                selected
                                                disabled
                                                hidden
                                            >
                                                select Preference
                                            </option>
                                            <option value="No Preference">
                                                No Preference
                                            </option>
                                            <option value="Window">
                                                Window
                                            </option>
                                        </select>
                                    </div>
                                );
                            })
                        }
                        <span className="linker" onClick={addPassenger}>
                            <FontAwesomeIcon icon={faPlus} size="1x" /> Add a
                            passenger
                        </span>
                        <span className="linker" onClick={removePassenger}>
                            <FontAwesomeIcon icon={faMultiply} size="1x" />{" "}
                            Remove a Passenger
                        </span>
                        <input
                            type="submit"
                            value="Continue"
                            onChange={submitChange}
                        />
                    </form>
                </div>
                <TicketFare count={count} fare={fare}/>
            </div>  
    );
};
export default Booking;
