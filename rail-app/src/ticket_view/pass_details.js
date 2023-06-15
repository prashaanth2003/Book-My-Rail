import "./card.css";

const pass_details = ({pass}) => {
    return (
        <>
                <p  className="cells">{pass.ticket_no}</p>
                <p  className="cells">{pass.profile_name}</p>
                <p  className="cells">{pass.age}</p>
                <p  className="cells">{pass.gender}</p>
                <p  className="cells">{pass.coach_no}</p>
                <p  className="cells">{pass.seat_no}</p>
                <p className="cells">{pass.fare}</p>
        
        </>
    );
};

export default pass_details;
