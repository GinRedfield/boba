import { Link } from "react-router-dom";
import logo from '../logo.png';
import axios from "axios";
import Cookies from "universal-cookie";
const cookies = new Cookies();

// Navigation Bar
const Nav = () => {
    const token = cookies.get("TOKEN");
    const logout = () =>{
        const url = `http://localhost:5000/api/auth/logout`;
        cookies.remove("TOKEN", { path: "/" });
        // disconnect db
        axios.get(url)
        window.location.href = "/";
    }
    
    return(
        <nav className="navbar navbar-expand-lg bg-light sticky-top">
            <div className="container-fluid">
                {/* Home button */}
                <Link className="navbar-brand" to="/">
                    <img src={logo} alt="logo" style={{height: 36 + 'px'}} />
                </Link>
                <button className="navbar-toggler navbar-toggler-right" type="button" data-bs-toggle="collapse" data-bs-target="#navbarsDefault" aria-controls="navbarsDefault" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                {/* Dropdown Menu */}
                <div className="collapse navbar-collapse hide" id="navbarsDefault" >
                    <ul className="navbar-nav ">
                        <li className="nav-item">
                            <Link className="nav-link" aria-current="page" to="/home">Home</Link>
                        </li>
                        {/* <li className="nav-item">
                            <Link className="nav-link" aria-current="page" to="/home/spending">Spending</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" aria-current="page" to="/home/track">Track</Link>
                        </li> */}
                        
                    </ul>
                    {token ? (
                        <ul className="nav navbar-nav ml-auto">
                            <li className="nav-item">
                                <Link className="nav-link text-info" aria-current="page" to="/home/account">Account</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link text-danger" aria-current="page" onClick={() => logout()}>Logout</Link>
                            </li>
                        </ul>
                    ) : (
                        <ul className="nav navbar-nav ml-auto">
                            <li className="nav-item ">
                                <Link className="nav-link text-info" aria-current="page" to="login">Login</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link text-primary" aria-current="page" to="register">Register</Link>
                            </li>
                        </ul>
                    )}
                    
                </div>
            </div>
        </nav>
    );
}

export default Nav;