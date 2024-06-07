import React from 'react';
import DashBoard from "./DashBoard";
import Article from "./Article";
import Profile from "./Profile";

function ProfileDashboard(props) {
    let titre = "Profil"
    let contenue = <Profile></Profile>
    return (
        <>
            <DashBoard titre={titre} contenue={contenue} ></DashBoard>
        </>
    );
}

export default ProfileDashboard;