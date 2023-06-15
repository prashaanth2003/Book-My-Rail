import AccDetails from "./acc_detail";
import TravelHistory from "./travel-history";
import { ReactSession } from "react-client-session";
import {useNavigate} from "react-router-dom";
import { useEffect } from "react";
ReactSession.setStoreType("sessionStorage");

export default function DashBoard() {
    const navigate = useNavigate();
    const username = ReactSession.get("username");
    useEffect(()=>{
        if(!username){
            alert("Login is required");
            navigate("/login");
        }
    }, [])
        return (
            <div className="dashboard">
                <AccDetails username={username}/>
                <TravelHistory username={username}/>
            </div>
        );
    
}
