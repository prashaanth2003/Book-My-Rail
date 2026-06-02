import { useState, useEffect } from "react";

const LoadingSpinner = () => (
    <div className="loading-spinner">
        <div className="spinner"></div>
        <p>Loading travel history...</p>
    </div>
);

const formatDate = (dateStr) => {
    try {
        const date = new Date(dateStr);
        return date.toLocaleDateString("en-IN", {
            year: "numeric", month: "long", day: "numeric"
        });
    } catch { return dateStr; }
};

const formatPrice = (price) => {
    const num = Number(price);
    if (isNaN(num)) return price;
    return "₹" + num.toLocaleString("en-IN");
};

export default function TravelHistory(props) {
    const username = props.username;
    const [history, setHistory] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch("http://localhost:5000/dashboard/travel-history", {
            headers: { Accept: "application/json", "Content-Type": "application/json" },
            method: "POST",
            body: JSON.stringify({ username: username }),
        })
            .then((response) => {
                if (!response.ok) throw new Error("Failed to fetch travel history");
                return response.json();
            })
            .then((myjson) => { setHistory(myjson || []); setLoading(false); })
            .catch((err) => { setError(err.message); setLoading(false); });
    }, [username]);

    if (loading) return <LoadingSpinner />;
    if (error) return (
        <div className="container history-container">
            <h1>Travel History</h1>
            <div className="error-message"><p>⚠️ {error}</p></div>
        </div>
    );
    if (history.length === 0) return (
        <div className="container history-container">
            <h1>Travel History</h1>
            <div className="empty-state"><p>🚆 No travel history found.</p><p>Book your first journey to see it here!</p></div>
        </div>
    );

    return (
        <div className="container history-container">
            <h1>Travel History</h1>
            <div className="history-table">
                <div className="history-table-header">
                    <div>Ticket No</div><div>Passenger</div><div>From</div><div>To</div>
                    <div>Train</div><div>Date</div><div>Fare</div>
                </div>
                {history.map((travel) => (
                    <div key={travel.ticket_no} className="history-table-row">
                        <div className="ticket-no">{travel.ticket_no}</div>
                        <div className="passenger-name">{travel.name}</div>
                        <div>{travel.from_station}</div><div>{travel.to_station}</div>
                        <div className="train-info">{travel.train_no && travel.train_name
                            ? `${travel.train_no} - ${travel.train_name}` : travel.train_no || "N/A"}</div>
                        <div className="date-cell">{travel.date ? formatDate(travel.date) : "N/A"}</div>
                        <div className="fare-cell">{formatPrice(travel.fare)}</div>
                    </div>
                ))}
            </div>
        </div>
    );
}
