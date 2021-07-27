import React from 'react';
import logo from "../images/dei_logo.jpg"
import '../App.css';


class Header extends React.Component {
    render() {
        return (
            <div className="text-center p-3 mb-2 bg-primary text-white">
                <img src={logo} alt="DEI" height="70" width="100" className="rounded float-left" />
                <h1>AGS (SoE DEI)</h1>
            </div>
            )
    }
}

export default Header