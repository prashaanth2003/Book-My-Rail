import {BrowserRouter, Routes, Route, Navigate} from "react-router-dom"
import { NavLink,useNavigate} from "react-router-dom"
import Navbar from "../navbar/nav-bar";
import { useState } from "react";
import BasicDetails from "./basic-details";
import PersonalDetails from "./personal-details";

function App() {
    const navigate = useNavigate();
    const [account, setAccount] = useState({
        name: "",
        email: "",
        password: "",
        username: "",
        age: 0,
        address: "",
        gender: "",
        mobile: 0,
        aadhaar: "",
    });
    const [count_pass, setCount] = useState(0);
    const onChangeAccount = (e) => {
        setAccount({ ...account, [e.target.name]: e.target.value });
    };

    const userCheck = (e) => {
        e.preventDefault();
        const getData = () => {
            fetch('http://localhost:5000/signup/usercheck', { 
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                method: 'POST', body: JSON.stringify(account)
            }).then(function(response){
                // console.log(response.json());
                return response.json();
            }).then(function(myjson){
                console.log(myjson[0]["c"]);
                setCount(myjson[0]["c"]);
            })
        }
        getData();
        console.log(count_pass);
        if(count_pass === 0 && account["username"].length > 0 && account["email"].length > 0 && account["password"].length > 0) {
            navigate('/signup/personal');
        } else if (count_pass != 0){
            alert("Username already in use");
        }   else {
            alert("Fields cant be empty");
        }
    }

    const handleSubmit = (e) => {
        console.log(account);
        e.preventDefault()
        if(account["age"] < 18){
            alert("User has to be an adult");
        } else if(account["name"].length === 0 || account["email"].length === 0 || account["password"].length === 0
        || account["address"].length === 0 || account["mobile"].length === 0 || account["aadhaar"].length === 0 || account["username"].length === 0) { 
            alert("Fields cant be empty");
        } else{
            console.log(account);
            fetch('http://localhost:5000/signup/submit', { 
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                method: 'POST', body: JSON.stringify(account)
            }).then(function(){
                navigate('/');
            });
        }
    };

    return (
        <>
            <div className="container acc-details">
                <p>Create Your Account</p>
                <div className="head_card">
                    <NavLink to="basic" className="title link">Basic Details</NavLink>
                    <NavLink to="personal" className="title link">Personal Details</NavLink>
                </div>
                <Routes>
                <Route path="basic" element={<BasicDetails
                    account={account}
                    onChangeAccount={onChangeAccount}
                    handleSubmit={userCheck}
                />}
                />
                <Route path="personal" element={<PersonalDetails
                    account={account}
                    onChangeAccount={onChangeAccount}
                    handleSubmit={handleSubmit}
                />}
                />
                </Routes>
            </div>
            </>           
        
    );
}

export default App;
