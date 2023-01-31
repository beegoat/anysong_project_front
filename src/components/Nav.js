import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

import SearchMusic from "./SearchMusic";


axios.defaults.withCredentials = true;

function Nav({ userData, setUserData,  API_URI }){

    const [isAuth, setIsAuth] = useState("");
    const [isLogin, setIsLogin] = useState(false);
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
        await axios.post(`http://${API_URI}:3001/user`, {
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
        const response = await axios.get(`http://${API_URI}:3001/sameid`, {
            params: {
                id : join.id
            }
        })
        if(response.data.code === 400){
            setConfirmJoin({
                ...confirmJoin,
                idcheck: false,
                idcheckmsg : "중복된 아이디가 있습니다!"
            })
        } else if(response.data.code === 200) {
            setConfirmJoin({
                ...confirmJoin,
                idcheck : true,
                idcheckmsg : "사용 가능합니다!"
            })
        }
    }

    const checkSameNickname = async() => {
        const response = await axios.get(`http://${API_URI}:3001/samenickname`, {
            params: {
                nickname : join.nickname
            }
        })
        if(response.data.code === 400 ){
            setConfirmJoin({
                ...confirmJoin,
                nicknamecheck : false,
                nicknamecheckmsg : "중복된 닉네임이 있습니다!"
            })
            
        } else if (response.data.code === 200) {
            setConfirmJoin({
                ...confirmJoin,
                nicknamecheck : true,
                nicknamecheckmsg : "사용 가능합니다!"
            })
        }
    }


    const getLogin = async() => {
        const response = await axios.post(`http://${API_URI}:3001/login`, {
            id : login.id,
            password : login.password
        }, {withCredentials: true})

        console.log(response.data)
        
        if(response.data === "success") {
            await axios.post(`http://${API_URI}:3001/jwtauthcheck`, {withCredentials: true})
            .then((res) => {
                setUserData(res.data);
                console.log("userData setted")
            })
            console.log("통과")
        }
        setLogin({
            id : "",
            password : "" 
        })
    }

    const logOut = async() => {
        const response = axios.get(`http://${API_URI}:3001/logout`, {withCredentials: true})
        setIsAuth(false);
        home();
    }
    
    const myPage = () => {
        window.location.href= "/mypage"
    }

    const home = () => {
        window.location.href="/"
    }





    return(
        // Nav Start 
        <div class="relative">
        <div class="fixed top-0 left-0 right-0 z-10">
            <div className="w-full bg-white">
            <div className=" w-1464 h-120 m-auto bg-white ">
            
            <div className="navbar justify-between">
                <div className="w-1/6">
                    <a href="/" className="btn btn-ghost normal-case text-4xl">
                        <img src={'/img/logowhite.png'} alt="로고" className="w-full h-full"/>
                    </a>
                </div>

                <div className="4/6">
                    <label className="btn btn-ghost m-1 text-lg"> <a href="/board/notice">공지사항</a></label>
                        <div className="dropdown dropdown-hover">
                                <label tabIndex={0} className="btn btn-ghost m-1 text-lg">평가</label>
                                <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52">
                                    <li><a href="/rating/albums">음악 앨범</a></li>
                                    <li><a href="/rating/songs">음악 음원</a></li>
                                </ul>
                        </div>
                        <div className="dropdown dropdown-hover">
                            <label tabIndex={0} className="btn btn-ghost m-1 text-lg">커뮤니티</label>
                            <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52 text-center">
                                <li><a href="/board">전체</a></li>
                                <li><a href="/board/songreview">음악리뷰</a></li>
                                <li><a href="/board/albumreview">앨범리뷰</a></li>
                                <li><a href="/board/talk">잡담/기타</a></li>
                                <li><a href="/board/question">질문</a></li>
                            </ul>
                        </div>
                </div>

                <div className="w-1/6 flex justify-end items-center">
                        { isAuth ? (
                            <div className="text-right">
                                <div className="font-bold text-center text-base mt-2">안녕하세요, {userName}님!</div>
                                    <label className="text-sm cursor-pointer mx-3 -my-4 underline " onClick={myPage} > 마이페이지 </label>
                                    <label className="text-sm cursor-pointer mx-3 -my-4 border border-red-400" onClick={logOut}> 로그아웃 </label>
                            </div>
                        )
                        : (
                            <>                    
                                <label htmlFor="login-modal" className="btn btn-outline mx-1">로그인</label>
                                <label htmlFor="join-modal" className="btn mx-1">회원가입</label>
                            </>
                        ) }
                </div>
            </div>
            {(`http://${API_URI}:3000/` === window.location.href) ? 
            <div className="flex">
                <div className="w-1/3 h-11"></div>
                

                <div className="w-1/3 h-11 mx-420 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                </svg>
                    <SearchMusic 
                    API_URI={API_URI}/>
                </div>
                <div className="w-1/3 h-11"></div>
            </div> : null } 
            </div>
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
                <h3 className="font-bold text-3xl text-center my-2">회원가입</h3>
                <div className="form-control w-full">
                    <div>
                        <label className="label text-lg">
                            <span className="m-auto p-3">ID로 사용할 이메일을 입력해주세요.</span>
                        </label>
                        <div className="flex">
                            <input type="email" placeholder="ID" className="input input-bordered w-full max-w-xs m-auto" onChange={onChange} value={join.id} name="id" />
                            {confirmJoin.id? 
                                (<label className="btn w-25 h-10" onClick={checkSameId}>중복확인</label>): 
                                (<label className="btn btn-outline btn-disabled w-25 h-10">중복확인</label>)}
                        </div>
                        <div className="flex justify-end mt-4">
                            {confirmJoin.idcheckmsg !== "" ? 
                                (<p>{confirmJoin.idcheckmsg}</p>):
                                (<p>{confirmJoin.idcheckmsg}</p>)}
                        </div>
                    </div>
                    <div>
                        <label className="label text-lg">
                            <span className="m-auto p-3">사용하실 닉네임을 입력해주세요.</span>
                        </label>
                    <div className="flex">
                        <input type="text" placeholder="닉네임" className="input input-bordered w-full max-w-xs m-auto" onChange={onChange} value={join.nickname} name="nickname"/>
                        {confirmJoin.nickname? 
                            (<label className="btn w-25 h-10" onClick={checkSameNickname}>중복확인</label>): 
                            (<label className="btn btn-outline btn-disabled w-25 h-10">중복확인</label>)}
                    </div>
                    <div className="flex justify-end mt-4">
                        {confirmJoin.nicknamecheckmsg !== "" && confirmJoin.nicknamecheck ? 
                            (<p>{confirmJoin.nicknamecheckmsg}</p>):
                            (<p>{confirmJoin.nicknamecheckmsg}</p>)}
                    </div>
                    </div>
                    <div>
                        <label className="label text-lg flex flex-col">
                            <span className="m-auto p-3">비밀번호를 입력해주세요.</span>
                            <div className="text-xs">* 비밀번호는 영문 + 숫자 + 특수문자를 조합하여 8~25자리여야 합니다.</div>
                        </label>
                        <div className="flex justify-center ml-4 mr-24">
                            <input type="password" placeholder="비밀번호" className="input input-bordered w-full max-w-xs m-auto" onChange={onChange} value={join.password} name="password" />
                        </div>
                        <div className="flex justify-end mt-4 text-sm">
                            {confirmJoin.password? <p>사용 가능한 비밀번호입니다!</p> : 
                            <p></p>}
                        </div>
                    </div>

                    <label className="label text-lg">
                        <span className="m-auto p-3">비밀번호를 다시 한 번 입력해주세요.</span>
                    </label>
                    <div className="">
                    {confirmJoin.password ? (
                    <>
                    {join.password !== join.passwordConfirm ? (
                        <>
                            <div className="flex justify-center ml-4 mr-24">
                                <input type="password" placeholder="비밀번호 확인" className="input input-bordered input-warning w-full max-w-xs m-auto" onChange={onChange} value={join.passwordConfirm} name="passwordConfirm"/>
                            </div>
                            <div className="flex justify-end mt-4">
                                <label className="text-red-600 block"> 비밀번호가 일치하지 않습니다 ! </label>
                            </div>
                        </>
                        ) : (
                        <>
                            {join.password !== "" ? (
                                <>
                                <div className="flex justify-center ml-4 mr-24">
                                    <input type="password" placeholder="비밀번호 확인" className="input input-bordered input-success w-full max-w-xs m-auto" onChange={onChange} value={join.passwordConfirm} name="passwordConfirm"/> 
                                </div>
                                <div className="flex justify-end mt-4">
                                    <label className=" text-green-600 block"> 비밀번호가 일치합니다 ! </label>
                                </div>

                                <div className="flex justify-end mt-4">
                                    {confirmJoin.id && confirmJoin.idcheck && confirmJoin.password && confirmJoin.nickname && confirmJoin.nicknamecheck ? (
                                        <label htmlFor="join-modal" className="btn btn-outline btn-success" onClick={createUser} >가입</label>):
                                        <label htmlFor="join-modal" className="btn btn-outline btn-success" onClick={createUser} disabled>가입</label>}
                                </div>

                                </>
                                
                            ) : (
                                <div className="flex justify-center ml-4 mr-24">
                                <input type="password" placeholder="비밀번호 확인" className="input input-bordered w-full max-w-xs m-auto" onChange={onChange} value={join.passwordConfirm} name="passwordConfirm"/> 
                                </div>
                            )}
                        </>
                        )
                    }
                    </>
                    ) : 
                    <div className="flex justify-center ml-4 mr-24">
                        <input type="password" placeholder="비밀번호 확인" className="input input-bordered input-disabled w-full max-w-xs m-auto"/>
                    </div>
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