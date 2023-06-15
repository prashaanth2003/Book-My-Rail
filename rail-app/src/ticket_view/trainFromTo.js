import './card.css';

const trainFromTO = ({time,date,from_to})=>{

    return(
        <div style = {{display:'inline',margin:'20px'}}>
        <p style = {{fontWeight:'bold',fontSize:'22px'}}>{date} : {time}</p>
        <p style = {{fontWeight:'bold',fontSize:'22px'}}>{from_to}</p>
        </div>
    )
}

export default trainFromTO;