import { useState } from "react";
import axios from "axios";
import Cookies from "universal-cookie";
const cookies = new Cookies();

export default function Login() {
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
            url: "http://localhost:5000/api/auth/login",
            data: {
                username,
                password,
            },
        };
        axios(configuration)
        .then((result) =>{
            // localStorage.setItem('user', JSON.stringify(user))
            // console.log('user', users)
            cookies.set("TOKEN", result.data.token, {
                path: "/",
            });
            window.location.href = "/home";
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
            <button type="submit" className="btn btn-outline-info m-2" onClick={(e) => handleSubmit(e)}>
                Login
            </button>
            {warning ? (
            <span></span>
            ) : (
            <p className="text-danger m-1">Wrong username or password</p>
            )}
            </form>
            

        </div>
    )
}