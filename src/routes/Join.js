import { useState } from "react";
import axios from "axios";

function Join(){
    const [join, setJoin] = useState({
        id : "",
        nickname : "",
        password: "",
        passwordConfirm: ""
    })

    const onChange = (e) => {
        const value = e.target.value;
        setJoin({
            ...join,
            [e.target.name] : value
        })
    }

    const createUser = async() => {
        const response = await axios.post('http://localhost:3001/user', {
            id : join.id,
            nickname : join.nickname,
            password : join.password
        })
        console.log(response)
        // response 번호에 따라 창을 끄고 값을 초기화 할지 유지할지 
        setJoin({id: "", nickname: "", password: "", passwordConfirm:""})
    }

    return(
        <>
        <div className="text-4xl text-bold mb-10">가입 페이지 입니다.</div>
        <div>
            <input name="id" type="email" placeholder="id" className="input w-full max-w-xs" value={join.id} onChange={onChange}></input>
        </div>
        <div>
            <input name="nickname" type="text" placeholder="nickname" className="input w-full max-w-xs" value={join.nickname} onChange={onChange}></input>
        </div>
        <div>
            <input name="password" type="password" placeholder="password" className="input w-full max-w-xs" value={join.password} onChange={onChange}></input>
        </div>
        <div>
            <input name="passwordConfirm" type="password" placeholder="password" className="input w-full max-w-xs" value={join.passwordConfirm} onChange={onChange}></input>
        </div>
        <div>
            <label className="btn" onClick={createUser}>가입</label>
        </div>
        </>


    )

}

export default Join;