import { useState } from "react";
import axios from "axios";


function Login(){
    const [login, setLogin] = useState({
        id : "",
        password: ""
    })

    const onChangeLogin = (e) => {
        const value = e.target.value;
        setLogin({
            ...login,
            [e.target.name] : value
        })
    }

    const getLogin = async() => {
        const response = await axios.post('http://localhost:3001/login', {
            id : login.id,
            password : login.password
        })
        console.log(response)
        setLogin({
            id : "",
            password : "" 
        })
    }

    return (
        <>
        <div className="text-4xl text-bold mb-10">로그인 페이지 입니다.</div>
        <div>
            <input name="id" type="email" placeholder="id" className="input w-full max-w-xs" value={login.id} onChange={onChangeLogin}/>
        </div>
        <div>
            <input name="password" type="password" placeholder="password" className="input w-full max-w-xs" value={login.password} onChange={onChangeLogin}/>
        </div>
        <div>
            <label className="btn" onClick={getLogin}> 로그인 </label>
        </div>
        
        
        
        </>

    )
}

export default Login;