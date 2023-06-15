import "./train_enq.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const Page = () => {
    const [train, setTrain] = useState("");
    const navigate = useNavigate();

    function handleSubmit(e) {
        e.preventDefault();
        navigate("/trainenq/details", { state: train.split('_')[0] });
    }

    function changeval(e) {
        setTrain(e.target.value);
    }

    return (
        <div className="usr_pnr">
            <h2 >
                Track your Train
            </h2>
            <label>
                Enter your Train / Ticket Number:{" "}
            </label>
            <input type="text" onChange={changeval} />
            <br />
            <input type="submit" onClick={handleSubmit} value="Submit" />
        </div>
    );
};

export default Page;
