import { useState, useEffect } from "react";
import axios from "axios";

function Login() {
    const [userData, setuserData] = useState("");

    useEffect(() => {
        axios.post("http://localhost:3001/jwtauthcheck")
        .then((res) => {
            setuserData(res.data);
        })
    }, []);

    useEffect(() => {
        console.log(userData)
    }, [userData])
    
    return(
        <>
        {userData.isAuth ? (<h1>성공</h1>) : (<h2>실패</h2>)}
        </>
    )
}
    


  export default Login;