import { useEffect, useState } from "react";
import axios from "axios";

axios.defaults.withCredentials = true;

function Nav({ userData }){

    const [isAuth, setIsAuth] = useState("");
    const [userName, setUserName] = useState("");

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

    const createUser = async() => {
        await axios.post('http://localhost:3001/user', {
            id : join.id,
            nickname : join.nickname,
            password : join.password
        })
        // response 번호에 따라 창을 끄고 값을 
        setJoin({id: "", nickname: "", password: "", passwordConfirm:""})
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
        <div className=" w-full h-20">
            <div className="navbar bg-base-100">
                <div className="flex-1">
                    <a href="/" className="btn btn-ghost normal-case text-3xl">어~떤가~요 🎤</a>
                    <div className="flex items-center justify-left w-full">
                    <label className="btn btn-ghost m-1 text-lg"> 공지사항 </label>
                    <div className="dropdown">
                        <label tabIndex={0} className="btn btn-ghost m-1 text-lg">음악 평가</label>
                        <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52">
                            <li><a href="/rating">음악 앨범</a></li>
                            <li><a href="/rating">음악 음원</a></li>
                        </ul>
                    </div>
                    <div className="dropdown">
                        <label tabIndex={0} className="btn btn-ghost m-1 text-lg">자유게시판</label>
                        <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52">
                            <li><a href="/board">전체보기</a></li>
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
                <label className="btn" onClick={logOut}> 로그아웃 </label>
                    </>
                )
                : (
                    <>                    
                    <label htmlFor="login-modal" className="btn btn-outline btn-success mx-1">로그인</label>
                    <label htmlFor="join-modal" className="btn btn-success mx-1">회원가입</label>
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
                <label htmlFor="join-modal" className="btn btn-sm btn-circle btn-outline absolute right-2 top-2" onClick={() => {setJoin({id: "", nickname: "", password: "", passwordConfirm:""})}}>✕</label>
                <h3 className="font-bold text-3xl text-center m-8"> 🎉 회원가입 🥳</h3>
                <div className="form-control w-full">
                    <div>
                    <label className="label">
                        <span className="label-text m-auto p-3">ID로 사용할 이메일을 입력해주세요.</span>
                    </label>
                    <input type="email" placeholder="ID" className="input input-bordered w-full max-w-xs m-auto" onChange={onChange} value={join.id} name="id" />
                    <button className="btn w-25 h-10">중복확인</button>
                    </div>
                    <div>
                    <label className="label">
                        <span className="label-text m-auto p-3">사용하실 닉네임을 입력해주세요.</span>
                    </label>
                    <input type="text" placeholder="닉네임" className="input input-bordered w-full max-w-xs m-auto" onChange={onChange} value={join.nickname} name="nickname"/>
                    <button className="btn w-25 h-10">중복확인</button>
                    </div>
                    <div>
                    <label className="label">
                        <span className="label-text m-auto p-3">비밀번호를 입력해주세요.</span>
                    </label>
                    <input type="password" placeholder="비밀번호" className="input input-bordered w-full max-w-xs m-auto" onChange={onChange} value={join.password} name="password" />
                    </div>
                    <div className="flex-auto justify-center">
                    <label className="label">
                        <span className="label-text m-auto p-3">비밀번호를 다시 한 번 입력해주세요.</span>
                    </label>
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
                                </>
                            ) : (
                                <>
                                <input type="password" placeholder="비밀번호 확인" className="input input-bordered w-full max-w-xs m-auto" onChange={onChange} value={join.passwordConfirm} name="passwordConfirm"/> 
                                </>
                            )}
                        </>
                        )
                    }
                    
                    </div>
                    
                </div>
                {/* <div className="modal-action"> */}
                    {join.password === join.passwordConfirm? (
                        <label htmlFor="join-modal" className="btn btn-outline btn-success" onClick={createUser} >가입</label>
                    ) : <label htmlFor="join-modal" className="btn btn-outline btn-success" onClick={createUser} disabled>가입</label>}
                {/* </div> */}
            </div>
        </div>
        </form>
    </div>

    // Nav End
    )
}

export default Nav;