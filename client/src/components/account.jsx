import React, { useEffect, useState, } from "react";
import axios from "axios";
import Cookies from "universal-cookie";
const cookies = new Cookies();
const token = cookies.get("TOKEN");

const Account = () => {
    const [username, setUsername] = useState("");
    useEffect(() => {
        const configuration = {
            method: "get",
            url: "http://localhost:5000/api/auth/token",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          };
        axios(configuration)
        .then((result) => {
            // assign the message in our result to the message we initialized above
            setUsername(result.data.message);
        })
        .catch((error) => {
            error = new Error();
        });
    }, [])


    const [password, setPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [warning, setWarning] = useState(true);

    // update user password
    const handleSubmit = (e) => {
        e.preventDefault();
        const configuration = {
            method: "put",
            url: "http://localhost:5000/api/auth/update",
            data: {
                username,
                password,
                newPassword,
            },
        };
        axios(configuration)
        .then((result) =>{
            // console.log(result);
            window.location.href = "/home";
        })
        .catch(() => {setWarning(false);})
    }

    const userDel = (e) =>{
        e.preventDefault();
        const configuration = {
            method: "delete",
            url: "http://localhost:5000/api/auth/delete",
            data: {
                username,
            },
        };
        cookies.remove("TOKEN", { path: "/" });
        axios(configuration)
        .then((result) => {
            window.location.href = "/";
        })
        
    }

    return (
        <div>
            <div className="card mt-4 w-50 mx-auto">
                <strong className="card-header">
                    Change Password
                </strong>
                <div className="card-body">
                <form onSubmit={(e)=>handleSubmit(e)}>
                    <div className="form-group m-1">
                        <label htmlFor="password">Current Password</label>
                        <input type="password" className="form-control" id="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
                    </div>
                    {warning ? (
                    <span></span>
                    ) : (
                    <p className="text-danger m-1">Wrong password</p>
                    )}
                    <div className="form-group m-1">
                        <label htmlFor="newPassword">New Password</label>
                        <input type="password" className="form-control" id="newPassword" placeholder="Password" onChange={(e) => setNewPassword(e.target.value)} />
                    </div>
                    <button type="submit" className="btn btn-outline-warning m-2" onClick={(e) => handleSubmit(e)}>
                        Update
                    </button>
                </form>
                </div>
            </div>
            
            <div className="card mt-4 w-50 mx-auto">
                <strong className="card-header">
                    Delete Account
                </strong>
                <div className="card-body">
                <p className="card-text">
                    Account will be permenantly deleted and will not be able to recover!<br/> Proceed with causion!
                </p>
                <form onSubmit={(e)=>userDel(e)}>
                    <button type="submit" className="btn btn-outline-danger m-2" onClick={(e) => userDel(e)}>
                        Delete
                    </button>
                </form>
                </div>
            </div>

        </div>
    );

}

export default Account;