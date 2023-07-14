import React, { useEffect, useState, } from "react";
// import axios from "axios";

const Welcome = () => {
    // const apikey = "Unsplash API key, originally for home page image";
    // const [src, setSrc] = useState("");
    // useEffect(()=> {
    //     const configuration = {
    //         method: "get",
    //         url: `https://api.unsplash.com/search/photos?page=1&query=moutains&client_id=${apikey}`,
    //     }
    //     axios(configuration)
    //     .then((result) => {
    //         setSrc(result.data.results['0'].urls.full)
    //         localStorage.setItem(
    //             'srcHome', 
    //             JSON.stringify(result.data.results['1'].urls.full));
    //         console.log("imgs set");
    //     })
    //     .catch((error) => {
    //         error = new Error();
    //     });
    // }, [])
    return (
        <div>
            <div className="card mx-auto m-2 p-3">
                {/* <img src={src} alt="welcomeImg"></img> */}
                This is a Welcome page
            </div>
        </div>
    );
}
// external api random background img
export default Welcome;