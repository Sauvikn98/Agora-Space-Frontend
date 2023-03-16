import React, { useState } from "react";
import Navbar from "../components/Navbar/Navbar";
import ProfileSettings from "../components/Settings.jsx/ProfileSettings";
import SettingsSidebar from "../components/Sidebar/SettingsSidebar";

function Settings() {
    const [email, setEmail] = useState("sauviknath10@gmail.com");
    const [gender, setGender] = useState("male");
    const [displayLanguage, setDisplayLanguage] = useState("English (US)");
    const [contentLanguages, setContentLanguages] = useState([]);
    const [country, setCountry] = useState("India");
    const [twitterConnected, setTwitterConnected] = useState(false);
    const [appleConnected, setAppleConnected] = useState(false);
    const [googleConnected, setGoogleConnected] = useState(false);
    const [optIntoBetaTests, setOptIntoBetaTests] = useState(false);
    const [optOutOfRedesign, setOptOutOfRedesign] = useState(false);

    const handleAddContentLanguage = (event) => {
        const language = event.target.value;
        setContentLanguages((languages) => [...languages, language]);
        event.target.value = "";
    };

    const handleRemoveContentLanguage = (language) => {
        setContentLanguages((languages) =>
            languages.filter((l) => l !== language)
        );
    };

    return (
        <>
            <Navbar />
            <div className="min-h-screen h-full grid lg:grid-cols-custom3 bg-gray-200">
                <SettingsSidebar />
                <ProfileSettings />
            </div>
        </>
    );
}

export default Settings     
