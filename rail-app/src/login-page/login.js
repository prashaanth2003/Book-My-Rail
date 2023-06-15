import FormField from "./formfield";
import { ReactSession } from 'react-client-session';
import {BrowserRouter, Routes, Route, Navigate} from "react-router-dom"
import { NavLink,useNavigate} from "react-router-dom"
import { useState } from "react";
ReactSession.setStoreType("sessionStorage");
// ReactSession.setStoreType("localStorage");

const LoginDetails = () => {
    const navigate = useNavigate();
    const profile = {
        username: "",
        password: "",
    };
    const [account, setAccount] = useState(profile);
    const onChangeAccount = (e) => {
        setAccount({ ...account, [e.target.name]: e.target.value });
    };
    const authenticate = (e) => {
        e.preventDefault();
        const getData = () => {
            fetch('http://localhost:5000/login', { 
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                method: 'POST', body: JSON.stringify(account)
            }).then(function(response){
                return response.json();
            }).then(function(myjson){
                if(myjson["length"] === 0){
                    alert("Username is not registered.");
                } else {
                    const pass = myjson[0]["password"];
                    if(account["password"] === pass) {
                        ReactSession.set("username", account["username"]);
                        ReactSession.set("logged", true);
                        navigate('/')
                    } else {
                        alert("Incorrect Password");
                    }
                }
            })
        }
        getData();
    }
    return (
        <div className="container acc-details">
            <p>Log in</p>
            <form className="form-entry">
                <FormField
                    name="username"
                    label="username"
                    type="text"
                    onChange={onChangeAccount}
                />
                <br />
                <FormField
                    name="password"
                    label="password"
                    type="password"
                    onChange={onChangeAccount}
                />
                <div>
                    <input type="submit" value="Log in" onClick={authenticate} />
                </div>
            </form>
        </div>
    );
};

export default LoginDetails;
