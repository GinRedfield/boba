import React, { useEffect, useState, } from "react";
import axios from "axios";
import Cookies from "universal-cookie";
const cookies = new Cookies();
const token = cookies.get("TOKEN");


const Home = () => {
    const [username, setUsername] = useState("");
    // const [srcHome, setSrcHome] = useState("");
    
    useEffect(() => {
        // setSrcHome(JSON.parse(localStorage.getItem('srcHome')));
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
            localStorage.setItem('username', JSON.stringify(username));
            console.log('token fetched');
        })
        .catch((error) => {
            error = new Error();
        });
        
    }, [username])

    
    return (
        <div>
            <div className="card mx-auto m-2 p-3">
                {/* <img src={srcHome} alt="welcomeImg"></img> */}
                This is the login home page
            </div>
        </div>
    );
}

export default Home;