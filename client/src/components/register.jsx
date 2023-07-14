import { useState } from "react";
import axios from "axios";

export default function Register() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [warning, setWarning] = useState(true);

    const handleClick =(e) => {
        e.preventDefault();
        axios.post("http://localhost:5000/api/auth/reconnect");
        
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const configuration = {
            method: "post",
            url: "http://localhost:5000/api/auth/register",
            data: {
                username,
                password,
            },
        };
        axios(configuration)
        .then(() => {
            window.location.href = "/login";
        })
        .catch(() => {setWarning(false);})
      }

    return (
        <div className='card mt-4 w-50 p-3 mx-auto'>
            <form onSubmit={(e)=>handleSubmit(e)}>
            <div className="form-group m-1">
                <label htmlFor="username">Username</label>
                <input type="text" className="form-control" id="username" placeholder="Enter username" onChange={(e) => setUsername(e.target.value)} onClick={(e) => {handleClick(e)}} />
                </div>
            <div className="form-group m-1">
                <label htmlFor="password">Password</label>
                <input type="password" className="form-control" id="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
            </div>
            <button type="submit" className="btn btn-outline-primary m-2" onClick={(e) => handleSubmit(e)}>
                Register
            </button>
            {warning ? (
            <span></span>
            ) : (
            <p className="text-danger m-1">Enter a different user name</p>
            )}
            </form>
        </div>
    )
}