import './card.css';
import TrainFromTO from './trainFromTo.js'
import img from '../img/image.jpg'


const Train_card = (props)=>{
    console.log(props)
    return(
        <>
        <div className="train_card">
            <div>
            <img src={img} style={{height:'120px',width:'150px'}} alt="train_logo"/>
            <h4>{props.no} - {props.name}</h4>
            </div>  
            <TrainFromTO time = {props.arrival} date = {props.dateofjourney} from_to={props.from}/>    
            <TrainFromTO time = {props.departure} date = {props.dateofjourney} from_to={props.to}/>
        </div>
        </>
    )
}

export default Train_card;
