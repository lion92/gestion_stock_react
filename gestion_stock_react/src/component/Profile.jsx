// src/ProfileDashboard.js
import React from 'react';
import '../css/profil.css';
import ChangePassword from "./ChangePassword";

const Profile = () => {
    const user = {
        name: localStorage.getItem("nom"),
        email: localStorage.getItem("email"),
    };

    return (
        <div className="profile-dashboard">
            <div className="profile-header">
                <h2>Profile Dashboard</h2>
            </div>
            <div className="profile-info">
                <h3>User Information</h3>
                <p><strong>Name:</strong> {user.name}</p>
                <p><strong>Email:</strong> {user.email}</p>
            </div>
            <div className="profile-settings">
                <ChangePassword></ChangePassword>
            </div>
        </div>
    );
};

export default Profile;
