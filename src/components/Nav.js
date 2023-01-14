import { useEffect, useState } from "react";
import axios from "axios";

axios.defaults.withCredentials = true;

function Nav({ userData }){

    const [isAuth, setIsAuth] = useState("");
    const [userName, setUserName] = useState("");
    const [confirmJoin, setConfirmJoin] = useState({
        id : false,
        idcheck : false,
        idcheckmsg : "",
        password: false,
        nickname: false,
        nicknamecheck: false,
        nicknamecheckmsg: ""
    })

    useEffect(() => {
        setIsAuth(userData.isAuth)
        setUserName(userData.nickname)
        console.log()
    }, [userData])



    const [join, setJoin] = useState({
        id : "",
        nickname : "",
        password: "",
        passwordConfirm: ""
    })

    const [login, setLogin] = useState({
        id : "",
        password: ""
    })

    const onChange = (e) => {
        const value = e.target.value;
        setJoin({
            ...join,
            [e.target.name] : value
        })
    }

    const onChangeLogin = (e) => {
        const value = e.target.value;
        setLogin({
            ...login,
            [e.target.name] : value
        })
    }

    // 비밀번호 검증 - 정규식 : 영문 + 숫자 + 특수문자를 조합하여 8~25자
    useEffect(() => {
        const pwdCheck = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/;
        if(pwdCheck.test(join.password)){
            setConfirmJoin({
                ...confirmJoin,
                password : true
            })
        } else {
            setConfirmJoin({
                ...confirmJoin,
                password : false
            })
            setJoin({
                ...join,
                passwordConfirm: ""
            })
        }
    }, [join.password])

    // 이메일 검증 - 정규식 : RFC 5322 기준 email Regex
    useEffect(() => {
        const idCheck = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/
        if(idCheck.test(join.id)){
            setConfirmJoin({
                ...confirmJoin,
                id : true
            })
        } else {
            setConfirmJoin({
                ...confirmJoin,
                id : false
            })
        }
    }, [join.id])

    // 닉네임 검증 - 3글자 이상
    useEffect(() => {
        const nicknameCheck = /^.{1,20}$/
        if(nicknameCheck.test(join.nickname)){
            setConfirmJoin({
                ...confirmJoin,
                nickname : true
            })
        } else {
            setConfirmJoin({
                ...confirmJoin,
                nickname : false
            })
        }
    }, [join.nickname])

    const createUser = async() => {
        await axios.post('http://localhost:3001/user', {
            id : join.id,
            nickname : join.nickname,
            password : join.password
        })
        // response 번호에 따라 창을 끄고 값을 
        setJoin({id: "", nickname: "", password: "", passwordConfirm:""})
        setConfirmJoin({id : false,
            idcheck : false,
            idcheckmsg : "",
            password: false,
            nickname: false,
            nicknamecheck: false,
            nicknamecheckmsg: ""})
    }

    // 아이디, 닉네임 중복 확인 함수
    const checkSameId = async() => {
        const response = await axios.get("http://localhost:3001/sameid", {
            params: {
                id : join.id
            }
        })
        if(response.data.length){
            setConfirmJoin({
                ...confirmJoin,
                idcheck : false
            })
            setConfirmJoin({
                ...confirmJoin,
                idcheckmsg : "중복된 아이디가 있습니다!"
            })
            
        } else {
            setConfirmJoin({
                ...confirmJoin,
                idcheck : true,
                idcheckmsg : "사용 가능합니다!"
            })
        }
    }

    const checkSameNickname = async() => {
        const response = await axios.get("http://localhost:3001/samenickname", {
            params: {
                nickname : join.nickname
            }
        })
        if(response.data.length){
            setConfirmJoin({
                ...confirmJoin,
                nicknamecheck : false,
                nicknamecheckmsg : "중복된 닉네임이 있습니다!"
            })
            
        } else {
            setConfirmJoin({
                ...confirmJoin,
                nicknamecheck : true,
                nicknamecheckmsg : "사용 가능합니다!"
            })

        }
    }


    const getLogin = async() => {
        await axios.post('http://localhost:3001/login', {
            id : login.id,
            password : login.password
        })
        setLogin({
            id : "",
            password : "" 
        })
    }

    const logOut = () => {
        axios.get("http://localhost:3001/logout")
    }





    return(
        // Nav Start 
        <div className=" w-full h-18 bg-white">
            <div className="navbar bg-white">
                <div className="flex-1">
                    <a href="/" className="btn btn-ghost normal-case text-4xl">
                        <img src="img/movinglogo.gif" className="w-full h-full"/>
                    </a>
                    <div className="flex items-center justify-center w-full">
                    <label className="btn btn-ghost m-1 text-lg"> <a href="/board/notice"> 공지사항</a> </label>
                    <div className="dropdown">
                        <label tabIndex={0} className="btn btn-ghost m-1 text-lg">평가</label>
                        <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52">
                            <li><a href="/rating/albums">음악 앨범</a></li>
                            <li><a href="/rating/songs">음악 음원</a></li>
                        </ul>
                    </div>
                    <div className="dropdown">
                        <label tabIndex={0} className="btn btn-ghost m-1 text-lg">게시판</label>
                        <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52">
                            <li><a href="/board">전체</a></li>
                            <li><a href="/board/songreview">음악리뷰</a></li>
                            <li><a href="/board/albumreview">앨범리뷰</a></li>
                            <li><a href="/board/talk">잡담/기타</a></li>
                            <li><a href="/board/question">질문</a></li>
                        </ul>
                    </div>
                    </div>
                </div>
                <div id="search_bar" className="form-control mr-11">
                    <input type="text" placeholder="검색해보세요!" className="input input-ghost w-full max-w-xs hidden" />
                </div>
                <div className="flex-none">
                { isAuth ? (
                    <>
                <div> 환영합니다 ! {userName} 님 ! </div>
                <label className="btn btn-outline" onClick={logOut}> 로그아웃 </label>
                    </>
                )
                : (
                    <>                    
                    <label htmlFor="login-modal" className="btn btn-outline mx-1">로그인</label>
                    <label htmlFor="join-modal" className="btn mx-1">회원가입</label>
                    </>
                ) }
                </div>
            </div>
            {/* 로그인 모달 */}
        <form>
        <input type="checkbox" id="login-modal" className="modal-toggle" />
        <div className="modal modal-bottom sm:modal-middle">
            <div className="modal-box relative">
                <label htmlFor="login-modal" className="btn btn-sm btn-circle btn-outline absolute right-2 top-2" onClick={() => { setLogin({id:"", password:""})}}>✕</label>
                <h3 className="font-bold text-3xl text-center m-5"> 로그인</h3>
                <div className="form-control w-full">
                    <label className="label">
                        <span className="label-text m-auto p-1 font-bold">ID를 입력해주세요.</span>
                    </label>
                    <input type="email" placeholder="ID" className="input input-bordered w-full max-w-xs m-auto" onChange={onChangeLogin} value={login.id} name="id"/>
                    <label className="label">
                        <span className="label-text m-auto p-1 font-bold">비밀번호를 입력해주세요.</span>
                    </label>
                    <input type="password" placeholder="비밀번호" className="input input-bordered w-full max-w-xs m-auto" onChange={onChangeLogin} value={login.password} name="password"/>
                </div>
                <div className="modal-action">
                    <label htmlFor="login-modal" className="btn btn-outline btn-success" onClick={getLogin}>로그인</label>
                </div>
            </div>
        </div>
        </form>
        

        {/* 회원가입 모달 */}
    
        <form>
        <input type="checkbox" id="join-modal" className="modal-toggle" />
        <div className="modal modal-bottom sm:modal-middle">
            <div className="modal-box relative">
                <label htmlFor="join-modal" className="btn btn-sm btn-circle btn-outline absolute right-2 top-2" onClick=
                {() => {
                    setJoin({id: "", nickname: "", password: "", passwordConfirm:""})
                    setConfirmJoin({id : false,
                        idcheck : false,
                        idcheckmsg : "",
                        password: false,
                        nickname: false,
                        nicknamecheck: false,
                        nicknamecheckmsg: ""})
                    }}>✕</label>
                <h3 className="font-bold text-3xl text-center m-8"> 🎉 회원가입 🥳</h3>
                <div className="form-control w-full">
                    <div>
                    <label className="label">
                        <span className="label-text m-auto p-3">ID로 사용할 이메일을 입력해주세요.</span>
                    </label>
                    <input type="email" placeholder="ID" className="input input-bordered w-full max-w-xs m-auto" onChange={onChange} value={join.id} name="id" />
                    {confirmJoin.id? 
                        (<label className="btn w-25 h-10" onClick={checkSameId}>중복확인</label>): 
                        (<label className="btn btn-outline btn-disabled w-25 h-10">중복확인</label>)}
                    {confirmJoin.idcheckmsg !== "" ? 
                        (<p>{confirmJoin.idcheckmsg}</p>):
                        (<p>{confirmJoin.idcheckmsg}</p>)}
                    </div>
                    <div>
                    <label className="label">
                        <span className="label-text m-auto p-3">사용하실 닉네임을 입력해주세요.</span>
                    </label>
                    <input type="text" placeholder="닉네임" className="input input-bordered w-full max-w-xs m-auto" onChange={onChange} value={join.nickname} name="nickname"/>
                    {confirmJoin.nickname? 
                        (<label className="btn w-25 h-10" onClick={checkSameNickname}>중복확인</label>): 
                        (<label className="btn btn-outline btn-disabled w-25 h-10">중복확인</label>)}
                    {confirmJoin.nicknamecheckmsg !== "" ? 
                        (<p>{confirmJoin.nicknamecheckmsg}</p>):
                        (<p>{confirmJoin.nicknamecheckmsg}</p>)}
                    </div>
                    <div>
                        <label className="label">
                            <span className="label-text m-auto p-3">비밀번호를 입력해주세요.</span>
                        </label>
                        <input type="password" placeholder="비밀번호" className="input input-bordered w-full max-w-xs m-auto" onChange={onChange} value={join.password} name="password" />
                        {confirmJoin.password? <p>사용 가능한 비밀번호입니다!</p> : 
                        <p>비밀번호는 영문 + 숫자 + 특수문자를 조합하여 8~25자리여야 합니다.</p>}
                    </div>
                    <div className="flex-auto justify-center">
                    <label className="label">
                        <span className="label-text m-auto p-3">비밀번호를 다시 한 번 입력해주세요.</span>
                    </label>
                    {confirmJoin.password ? (
                    <>
                    {join.password !== join.passwordConfirm ? (
                        <>
                            <input type="password" placeholder="비밀번호 확인" className="input input-bordered input-warning w-full max-w-xs m-auto" onChange={onChange} value={join.passwordConfirm} name="passwordConfirm"/>
                            <label className="text-red-600 block"> 비밀번호가 일치하지 않습니다 ! </label>
                        </>
                        ) : (
                        <>
                            {join.password !== "" ? (
                                <>
                                <input type="password" placeholder="비밀번호 확인" className="input input-bordered input-success w-full max-w-xs m-auto" onChange={onChange} value={join.passwordConfirm} name="passwordConfirm"/> 
                                <label className=" text-green-600 block"> 비밀번호가 일치합니다 ! </label>
                                {confirmJoin.id && confirmJoin.idcheck && confirmJoin.password && confirmJoin.nickname && confirmJoin.nicknamecheck ? (
                                    <label htmlFor="join-modal" className="btn btn-outline btn-success" onClick={createUser} >가입</label>):
                                    <label htmlFor="join-modal" className="btn btn-outline btn-success" onClick={createUser} disabled>가입</label>}
                                </>

                            ) : (
                                <>
                                <input type="password" placeholder="비밀번호 확인" className="input input-bordered w-full max-w-xs m-auto" onChange={onChange} value={join.passwordConfirm} name="passwordConfirm"/> 
                                </>
                            )}
                        </>
                        )
                    }
                    </>
                    ) : <input type="password" placeholder="비밀번호 확인" className="input input-bordered input-disabled w-full max-w-xs m-auto"/>
                    }   
                    </div>
                    
                </div>
                    
            </div>
        </div>
        </form>
    </div>

    // Nav End
    )
}

export default Nav;