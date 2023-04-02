import React from "react";
import Navbar from "../../components/Navbar";
import Settings from "../../components/Settings.jsx";

function SettingsPage() {
    return (
        <>
            <Navbar />
            <div className="min-h-screen h-full grid lg:grid-cols-custom3 bg-gray-200">
                <Settings/>
            </div>
        </>
    );
}

export default SettingsPage     
