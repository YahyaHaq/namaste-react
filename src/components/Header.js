import { useState } from "react";
import { LOGO_URL } from "../utils/constants";
import { Link } from "react-router-dom";

const Header = () => {
    let btnName = "Login";

    const [BtnNameReact,setBtnNameReact] = useState("Login");

    return (
        <div className="flex justify-between shadow-lg bg-pink-100 ">
            <div className="logo-container">
                <img
                className="w-40" 
                src={LOGO_URL} />
            </div>
            <div className="flex items-center ">
                <ul className="flex m-4 p-4">
                    <li className="px-4">
                        <Link to="/">Home</Link>
                    </li>
                    <li className="px-4">
                        <Link to="/about">About us</Link> 
                    </li>
                    <li className="px-4">
                        <Link to="/contact">Contact us</Link></li>
                    <li className="px-4">Cart</li>
                    <button className="login-btn" onClick={()=>{
                        BtnNameReact === "Login"
                        ? setBtnNameReact("Logout")
                        : setBtnNameReact("Login")
                    }}>{BtnNameReact}</button>
                </ul>
            </div>
        </div>
    ) 
}

export default Header;