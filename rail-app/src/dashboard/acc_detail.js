import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faUser, faEnvelope, faPhone, faVenusMars, faAddressCard, faMapMarkerAlt, faIdCard } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";

const LoadingSpinner = () => (
    <div className="loading-spinner">
        <div className="spinner"></div>
        <p>Loading profile...</p>
    </div>
);

const ProfileField = ({ icon, label, value }) => (
    <div className="profile-field">
        <div className="profile-field-icon">
            <FontAwesomeIcon icon={icon} size="sm" />
        </div>
        <div className="profile-field-content">
            <span className="profile-field-label">{label}</span>
            <span className="profile-field-value">{value || 'Not provided'}</span>
        </div>
    </div>
);

export default function AccDetails(props) {
    const username = props.username;
    const [account, setAccount] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch("http://localhost:5000/dashboard/acc_detail", {
            headers: { Accept: "application/json", "Content-Type": "application/json" },
            method: "POST",
            body: JSON.stringify({ username: username }),
        })
            .then((response) => {
                if (!response.ok) throw new Error("Failed to fetch account details");
                return response.json();
            })
            .then((myjson) => { setAccount(myjson[0] || {}); setLoading(false); })
            .catch((err) => { setError(err.message); setLoading(false); });
    }, [username]);

    const changeAccount = () => { alert("Edit profile feature coming soon!"); };

    if (loading) return <LoadingSpinner />;
    if (error) return (
        <div className="container profile-container">
            <h1>Profile</h1>
            <div className="error-message"><p>⚠️ {error}</p><button onClick={() => window.location.reload()}>Retry</button></div>
        </div>
    );

    return (
        <div className="container profile-container">
            <div className="profile-header">
                <div className="profile-avatar">{(account.name || "U").charAt(0).toUpperCase()}</div>
                <h1>My Profile</h1>
                <button className="edit-profile-btn" onClick={changeAccount}>
                    <FontAwesomeIcon icon={faEdit} size="sm" /> Edit
                </button>
            </div>
            <div className="profile-body">
                <ProfileField icon={faUser} label="Username" value={account.username} />
                <ProfileField icon={faAddressCard} label="Full Name" value={account.name} />
                <ProfileField icon={faPhone} label="Mobile" value={account.mobile} />
                <ProfileField icon={faEnvelope} label="Email" value={account.email} />
                <ProfileField icon={faIdCard} label="Aadhaar" value={account.aadhaar ? account.aadhaar.replace(/(\d{4})/g, '$1 ').trim() : undefined} />
                <ProfileField icon={faVenusMars} label="Gender" value={account.gender} />
                <ProfileField icon={faMapMarkerAlt} label="Address" value={account.address} />
            </div>
        </div>
    );
}
