import { useState, useEffect } from "react";

export default function TravelHistory(props) {
    const username = props.username;
    const [history, setHistory] = useState([]);
    useEffect(() => {
        fetch("http://localhost:5000/dashboard/travel-history", {
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            method: "POST",
            body: JSON.stringify({ username: username }),
        })
            .then(function (response) {
                return response.json();
            })
            .then(function (myjson) {
                setHistory(myjson);
            });
    }, []);
    console.log(history);

    return (
        <div className="container history-container">
            <h1>Travel History</h1>
            {history.map((travel) => {
                let date = travel.date.split('T')[0]

                return (
                    <div key={travel.ticket_no} className="container his-con">
                        <div className="t_no">{travel.ticket_no} &emsp; - &emsp;  {travel.name}</div>
                        <div className="bold">from</div>
                        <div className="bold">to</div>
                        <div className="bold">train_no</div>
                        <div className="bold">date</div>
                        <div className="bold">price</div>
                        <div>{travel.from_station}</div>
                        <div>{travel.to_station}</div>
                        <div>{travel.train_no} - {travel.train_name}</div>
                        <div>{date}</div>
                        <div>{travel.fare}</div>
                    </div>
                );
            })}
        </div>
    );
}
