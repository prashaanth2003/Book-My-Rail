import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";

//import App from './login-page/signup';
import reportWebVitals from "./reportWebVitals";
import Train_enq from './ticket_enquiry/page.js'
import Train_enq_res from './ticket_enquiry/trainstatus_res.js'
import Book from "./booking/booking";
import Plan_your_journey from "./plan-your-journey/plan_your_journey";
import Signup from "./login-page/signup.js";
import LoginDetails from "./login-page/login";
import Navbar from "./navbar/nav-bar.js";
import Four_not_four from "./four_not_four.js";
import Trainschedule from "./train-schedule/trainSchedule";
import Contact from "./contact.js";
import Footer from "./footer/footer";
import BasicDetails from "./login-page/basic-details";
import PersonalDetails from "./login-page/personal-details";
import Ticketview from "./ticket_view/card";
import DashBoard from "./dashboard/dashboard";
export default function Main() {
    return (
        <>
            <Navbar />
            <Routes>
                <Route path="/" element={<Plan_your_journey />} />
                 <Route path="booking" element={<Book />} />
                 <Route path = "trainenq" element = {<Train_enq/>}/>
                 <Route path = "trainenq/details" element = {<Train_enq_res/>}/>

                <Route path="trainschedule/" element={<Trainschedule />} />
                <Route path="trainschedule/ticketbooking" element={<Book />} />
                <Route path="trainschedule/ticket" element={<Ticketview />} />
                <Route path="login" element={<LoginDetails />} />
                <Route path="signup/*" element={<Signup />}>
                    <Route path="basic" element={<BasicDetails />} />
                    <Route path="personal" element={<PersonalDetails />} />
                </Route>
                <Route path="/dashboard" element={<DashBoard />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/ticket" element={<Ticketview />} />
                <Route path="*" element={<Four_not_four />} />F
            </Routes>
            <Footer />
        </>
        // <>
        // <LoginDetails />
        // <TrainDetail />
        // </>
        // <App />
        // <BrowserRouter>
        //   <Routes>
        //     <Route path="/" element={<App />}>
        //     </Route>
        //     <Route path="/book" element={<Book />}/>
        //     <Route path="/plan" element={<Plan_your_journey />} />
        //   </Routes>
        // </BrowserRouter>
    );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <React.StrictMode>
        <BrowserRouter>
            <Main />
        </BrowserRouter>
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
