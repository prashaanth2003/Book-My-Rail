import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";


export default function AccDetails(props) {
    const username = props.username;
    const [account, setAccount] = useState({});
    useEffect(() => {
        fetch("http://localhost:5000/dashboard/acc_detail", {
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
                setAccount(myjson[0]);
            });
    }, []);
    const changeAccount = () => {
        console.log(account);
        // setAccount(prevAccount => {...prevAccount, []})
    };
    return (
        <div className="container profile-container">
            <h1>Profile</h1>
            <div>{account.username}</div>
            <div>{account.name}</div>
            <div>{account.mobile}</div>
            <div>{account.email}</div>
            <div>{account.aadhaar}</div>
            <div>{account.gender}</div>
            <div>{account.address}</div>
            <div>
                <FontAwesomeIcon
                    icon={faEdit}
                    size="lg"
                    onClick={changeAccount}
                />
            </div>
        </div>
    );
}
