import {useState, useEffect} from "react";

const StationSelect = (props) => {

	const [result, setResult] = useState([{}]);
	useEffect(() => {
		const fetch_func = async () => {
			fetch("http://localhost:5000/planYourJourney/stationName", {
					headers: {
						Accept: "application/json",
						"Content-type": "application/json",
					},
					method: "POST",
				}).then(function(response) {
					return response.json();
				}).then(function(myjson){
					setResult(myjson);
				})
		}
		fetch_func();
	}, []);
	return (
		<div className="input-field">
		<label>{props.name}</label>
		<input name={props.name} list={props.name} onChange={props.onchange}/>
		<datalist id={props.name} >
			{
				 result.map((item) => {
					return <option key={item.station_name} value={item.station_name}	/> 
				 })
			}
		</datalist>
		</div>
	)
}

export default StationSelect
