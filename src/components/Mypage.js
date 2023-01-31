import { useEffect, useState } from "react";
import axios from "axios";
import { Link, redirect, useNavigate, useRouteLoaderData } from "react-router-dom";


function Mypage( {userData, setUserData, API_URI} ){

    const navigate = useNavigate

    const [categorySelect, setCategorySelect] = useState(0)
    const [mySong, setMySong] = useState([])
    const [myAlbum, setMyAlbum] = useState([])
    const [myArticle, setMyArticle] = useState([])
    const [withDrawToggle, setWithDrawToggle] = useState(false)

    const [modifyInfo, setModifyInfo] = useState({
        nickname: "",
        nicknameCheck: false,
        nicknameCheckMsg: "",
        introduction: "",
        password: "",
        passwordCheck: false,
        passwordCheckMsg: "",

        newPassword: "",
        newPasswordCheck: false,
        newPasswordConfirm: ""
    })

    

    const onChange = (e) => {
        const value = e.target.value
        setModifyInfo({
            ...modifyInfo,
            [e.target.name] : value
        })
    }

    const checkNickname = async() =>{
        const response = await axios.get(`http://${API_URI}:3001/samenickname`, {
            params : {
                nickname : modifyInfo.nickname
            }
        })
        if(response.data.code === 200 && modifyInfo.nickname !== ""){
            setModifyInfo({
                ...modifyInfo,
                nicknameCheck : true,
                nicknameCheckMsg: response.data.message
            })
        } else {
            setModifyInfo({
                ...modifyInfo,
                nicknameCheckMsg: "중복된 아이디 또는 빈칸입니다."
            })
        }
    }

    const modifyNickname = async() => {
        const response = await axios.put(`http://${API_URI}:3001/mynickname`, {
            nickname : modifyInfo.nickname
        })
        console.log(response)
        await axios.post(`http://${API_URI}:3001/jwtauthcheck`)
            .then((res) => {
                setUserData(res.data);
            })
    }

    const modifyIntroduction = async() => {
        const response = await axios.put(`http://${API_URI}:3001/myintroduction`, {
            introduction : modifyInfo.introduction
        })
        await axios.post(`http://${API_URI}:3001/jwtauthcheck`)
            .then((res) => {
                setUserData(res.data);
            })
    }

    const checkPw = async() => {
        console.log("클릭")

        const response = await axios.post(`http://${API_URI}:3001/comparepw`, {
            password : modifyInfo.password
        })

        console.log(response)

        if(response.data.status === 200 & modifyInfo.password !== ""){
            setModifyInfo({
                ...modifyInfo,
                passwordCheck: true,
                passwordCheckMsg: response.data.message
            })
        } else {
            setModifyInfo({
                ...modifyInfo,
                passwordCheckMsg: "비밀번호가 일치하지 않거나 빈칸입니다."
            })
        }
    }

    // 변경할 비밀번호 검증 - 정규식 영문 + 숫자 + 특수문자를 조합하여 8~25자
    useEffect(() => {
        const pwdCheck = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/;
        if(pwdCheck.test(modifyInfo.newPassword)){
            setModifyInfo({
                ...modifyInfo,
                newPasswordCheck: true
            })            
        } else {
            setModifyInfo({
                ...modifyInfo,
                newPasswordCheck: false
            })
        }
    }, [modifyInfo.newPassword])

    const modifyPw = async () => {
        const response = await axios.put(`http://${API_URI}:3001/mypassword`, {
            password : modifyInfo.newPassword
        })

        await axios.post(`http://${API_URI}:3001/jwtauthcheck`)
            .then((res) => {
                setUserData(res.data);
            })
    }

    const withDraw = async() => {
        const response = await axios.put(`http://${API_URI}:3001/withdraw`, {})
        console.log(response)
    }

    // 내 정보 불러오기
    const getMySong = async() => {
        const response = await axios.get(`http://${API_URI}:3001/mysonginfo`, {})
        if(response.data[0].length === 0){return} 
        setMySong(response.data[0])
    }

    const getMyAlbum = async() => {
        const response = await axios.get(`http://${API_URI}:3001/myalbuminfo`, {})
        if(response.data[0].length === 0){return} 
        setMyAlbum(response.data[0])
    }

    const getMyArticle = async() => {
        const response = await axios.get(`http://${API_URI}:3001/myarticleinfo`, {})
        if(response.data[0].length === 0){return} 
        setMyArticle(response.data[0])
    }

    useEffect(() => {
        getMySong()
        getMyAlbum()
        getMyArticle()
        setCategorySelect(1)
    }, [])

    

    return(
        <div className="w-1464 h-820 mx-auto">
            <div className="mt-120">
            {userData.isAuth? 
            <div className="flex">
            <div className="w-1/5 mr-4 bg-gradient-to-tl rounded-xl from-white to-gray-100">
                <div className="border-b- border-b-gray-400 pb-5">
                <div className="text-4xl flex justify-center mb-4 font-serif mt-10">｛ My page ｝</div>
                <div className="text-3xl flex justify-center">{userData.nickname}</div>
                </div>

                <div className="flex justify-center text-center text-xl  mt-16">
                    <ul className="">
                        <li className="border-b-2 border-b-gray-400 my-3 p-3 "><a href="#" onClick={()=>{setCategorySelect(1)}}>내 평가 관리</a></li>
                        <li className="border-b-2 border-b-gray-400 my-3 p-3 "><a href="#" onClick={()=>{setCategorySelect(2)}}>내 글 관리</a></li>
                        <li className="border-b-2 border-b-gray-400 my-3 p-3 "><a href="#" onClick={()=>{setCategorySelect(3)}}>회원정보수정</a></li>
                        <li className="border-b-2 border-b-gray-400 my-3 p-3 "><a href="#" onClick={()=>{setCategorySelect(4)}}>회원탈퇴</a></li>
                    </ul>
                </div>
            </div>
            
            <div className="border-x-2 ">
            
            {/* 내 평가 관리 */}
            {categorySelect === 1 ? (
                <div className="w-full">
                    <div className="my-12">
                        <div className=" my-4 text-center">
                            <div className="mx-auto inline-block text-3xl text-center border-y-4">평가한 앨범</div>
                        </div>
                        <div className="flex mt-12 mb-120">
                        {myAlbum.map((album) => {
                            return(
                            <div className="mx-5 text-center">
                                <div className="">⭐{(Number(album.rate))}</div>  
                                <div className="w-fit h-fit"><img src={album.img}/></div>
                                <div className=" h-16">
                                    {album.title.length>15? 
                                    <div className=" text-sm">{album.title}</div> : 
                                    <div>{album.title}</div>}

                                    {album.artist.length>15? 
                                    <div className="text-xs">{album.artist}</div> : 
                                    <div>{album.artist}</div>}
                                </div>    
                                      
                            </div>
                            )
                        })}
                        </div>
                        {/* <div className="text-3xl text-center my-4">내 코멘트</div> */}
                    </div>
                    <div className="mt-16 border-t-gray-400">
                        <div className=" my-4 text-center">
                            <div className="mx-auto inline-block text-3xl text-center border-y-4">평가한 음원</div>
                        </div>
                        <div className="flex my-10">
                        {mySong.map((song) => {
                            return(
                                <div className="mx-5 text-center">
                                <div className="">⭐{(Number(song.rate))}</div>  
                                <div className="w-fit h-fit"><img src={song.img}/></div>
                                <div className=" h-16">
                                    {song.title.length>15? 
                                    <div className=" text-sm">{song.title}</div> : 
                                    <div>{song.title}</div>}

                                    {song.artist.length>15? 
                                    <div className="text-xs">{song.artist}</div> : 
                                    <div>{song.artist}</div>}
                                </div>    
                                      
                            </div>
                            )
                        })}
                        </div>
                        {/* <div className="text-xl">내 음원 코멘트</div> */}
                    </div>
                </div>
            ) : null}
            
            {/* 내 글 관리 */}
            {categorySelect === 2 ? (
                <div className="w-1177 h-820">
                    <div className="my-12">
                        <div className=" my-4 text-center">
                            <div className="mx-auto inline-block text-3xl text-center border-y-4 mb-16">게시글</div>
                        </div>
                        <div className="flex flex-col">
                        {myArticle === [] ? (<div>게시글이 없습니다.</div>) :
                            <div>
                                <table className="table border-blue-200 w-3/4 m-auto">
                                    <thead>
                                        <tr className=" justify-center">
                                            <th className="w-1/12 text-base text-center bg-gradient-to-r from-white to-blue-100">제목</th>
                                            <th className="w-1/12 text-base text-center bg-gradient-to-r from-blue-100 to-blue-200">날짜</th>
                                            <th className="w-8/12 text-base text-center bg-gradient-to-r from-blue-200 to-violet-100">조회수</th>
                                        </tr>    
                                    </thead>
                                    <tbody className="w-full">
                                        {myArticle.map((article) => {
                                            return(
                                            <tr className="text-center">
                                                <td className="w-5/12"><Link to={`/board/${article.id}/total`}>{article.subject}</Link></td>
                                                <td className="w-5/12">{article.date}</td>
                                                <td className="w-2/12">{article.hits}</td>
                                            </tr>
                                            )
                                        })}
                                    </tbody>
                                </table>
                            </div>
                        }
                        </div>
                        {/* <div className="text-xl">내 게시글 코멘트</div> */}
                        <div className=" my-4 text-center">
                            <div className="mx-auto inline-block text-3xl text-center border-y-4 mb-16">댓글</div>
                        </div>
                        <div className="flex flex-col">
                        {myArticle === [] ? (<div>게시글이 없습니다.</div>) :
                            <div>
                                <table className="table border-blue-200 w-3/4 mx-auto mb-40">
                                    <thead>
                                        <tr className=" justify-center">
                                            <th className="w-1/12 text-base text-center bg-gradient-to-r from-white to-blue-100">제목</th>
                                            <th className="w-1/12 text-base text-center bg-gradient-to-r from-blue-100 to-blue-200">날짜</th>
                                            <th className="w-8/12 text-base text-center bg-gradient-to-r from-blue-200 to-violet-100">조회수</th>
                                        </tr>    
                                    </thead>
                                    <tbody className="w-full">
                                        {myArticle.map((article) => {
                                            return(
                                            <tr className="text-center">
                                                <td className="w-5/12"><Link to={`/board/${article.id}/total`}>{article.subject}</Link></td>
                                                <td className="w-5/12">{article.date}</td>
                                                <td className="w-2/12">{article.hits}</td>
                                            </tr>
                                            )
                                        })}
                                    </tbody>
                                </table>
                            </div>
                        }
                        </div>
                    </div>
                </div>
            ) : null}

            {/* 회원정보수정 */}
            {categorySelect === 3 ? (
                <div className="w-1177">
                    <div className="my-12">
                        <div className=" my-4 text-center">
                            <div className="mx-auto inline-block text-3xl text-center border-y-4 mb-16">회원정보 수정</div>
                        </div>
                        <table className="table mx-auto w-3/4">
                            <thead>
                                <tr>
                                    <th className="text-xl bg-gradient-to-r from-white to-blue-100"></th>
                                    <th className="text-lg bg-gradient-to-r from-blue-100 to-blue-200"></th>
                                    <th className=" bg-gradient-to-r from-blue-200 to-lime-100"></th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="text-center h-32 text-lg">
                                    <td className="w-1/6">아이디</td>
                                    <td className="w-4/6">{userData.user}</td>
                                    <td className="w-1/6"></td>
                                </tr>
                                <tr className="text-center h-32 text-lg">
                                    <td>닉네임</td>
                                    <td>{userData.nickname}</td>
                                    <td>
                                        <label htmlFor="modifyNickname" className="bg-lime-300 p-2 cursor-pointer" 
                                        onClick={() => {setModifyInfo({...modifyInfo, nickname: userData.nickname, nicknameCheck: false, nicknameCheckMsg: ""})}}>수정</label>
                                    </td>
                                </tr>
                                <tr className="text-center h-32 text-lg">
                                    <td>비밀번호</td>
                                    <td>********</td>
                                    <td>
                                        <label htmlFor="modifyPassword" className="bg-lime-300 p-2 cursor-pointer"
                                        onClick={() => {setModifyInfo({...modifyInfo, password:"", passwordCheck:false, passwordCheckMsg: "", newPassword: "", newPasswordConfirm: ""})}}>수정</label>
                                    </td>
                                </tr>
                                <tr className="text-center h-64 text-lg">
                                    <td>자기소개</td>
                                    <td>{userData.introduction}</td>
                                    <td>
                                        <label htmlFor="modifyIntroduction" className="bg-lime-300 p-2 cursor-pointer"
                                        onClick={() => {setModifyInfo({...modifyInfo, introduction: userData.introduction})}}>수정</label>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            ) : null}

            {/* 회원탈퇴 */}
            {categorySelect === 4 ? (
                    <div className="w-1177 h-820">
                    <div className="my-12 h-full">
                        <div className=" my-4 text-center">
                            <div className="mx-auto inline-block text-3xl text-center border-y-4">회원탈퇴</div>
                        </div>
                    <div className="flex flex-col text-center h-96 text-3xl justify-around">
                        <div className="mt-24">
                            <div>탈퇴하시겠습니까?</div>
                            <p>회원 탈퇴 후에는 되돌릴 수 없습니다.</p>
                        </div>
                        <div className="mt-24">
                            <input type="checkbox" 
                            onClick={()=>{setWithDrawToggle((prev) => (!prev))}}
                            className="checkbox" />
                            <label> 확인했습니다. </label>
                        </div>                        
                    {withDrawToggle ? 
                        <label className="w-1/3 mx-auto btn text-3xl mt-12" onClick={withDraw} >회원탈퇴</label> :
                        <label className="w-1/3 mx-auto btn btn-disabled text-3xl mt-12">회원탈퇴</label>
                    }
                    </div>
                </div>
                </div>

                

            ) : null }

            </div>
            {/* 모달 */}
            <>
                <input type="checkbox" id="modifyNickname" className="modal-toggle" />
                <label htmlFor="modifyNickname" className="modal cursor-pointer">
                    <label className="modal-box relative" htmlFor="">
                        <h3 className="text-2xl text-center font-bold ">닉네임 변경</h3>
                        <p className="text-center py-4">변경할 닉네임을 입력하세요</p>
                        <div className="flex justify-center">
                            <input type="text" className="input w-full max-w-xs" name="nickname" value={modifyInfo.nickname} onChange={onChange} />
                            <label className="btn" onClick={checkNickname}> 중복확인</label>
                        </div>
                        
                        <div className="text-center mt-4">{modifyInfo.nicknameCheckMsg}</div>
                        {modifyInfo.nicknameCheck ? 
                            <div className="flex justify-end mt-5 mr-9">
                                <label htmlFor="modifyNickname" className="btn btn-success" onClick={modifyNickname}>수정</label>
                            </div>
                            : 
                            <div className="flex justify-end mt-5 mr-9">
                                <label className="btn btn-disabled">수정</label>
                            </div>
                        }
                        
                    </label>
                </label>
                <input type="checkbox" id="modifyIntroduction" className="modal-toggle" />
                <label htmlFor="modifyIntroduction" className="modal cursor-pointer">
                    <label className="modal-box relative" htmlFor="">
                        <h3 className="text-2xl text-center font-bold ">자기소개 변경</h3>
                        <p className="text-center py-4">변경할 내 소개를 입력하세요</p>
                        <div className="flex justify-center">
                            <textarea className="w-full h-full textarea textarea-ghost my-10" name="introduction" value={modifyInfo.introduction} onChange={onChange} ></textarea>
                        </div>
                        <div className="flex justify-end">
                            <label className="btn btn-success" htmlFor="modifyIntroduction" onClick={modifyIntroduction}>수정</label>
                        </div>
                    </label>
                </label>
                <input type="checkbox" id="modifyPassword" className="modal-toggle" />
                <label htmlFor="modifyPassword" className="modal cursor-pointer">
                    <label className="modal-box relative" htmlFor="">
                        <h3 className="text-2xl py-4 font-bold text-center">비밀번호 변경</h3>
                        <p className="text-lg py-4">현재 비밀번호를 입력하세요</p>
                        <input type="password" className="input w-full max-w-xs" name="password" value={modifyInfo.password} onChange={onChange}/>
                        <label className="btn ml-2" onClick={checkPw}> 비밀번호 확인</label>
                        <div className="flex justify-end my-2">
                            <label>{modifyInfo.passwordCheckMsg}</label>
                        </div>
                        <p className="text-lg py-4">수정할 비밀번호를 입력하세요</p>
                        <input type="password" className="input w-full max-w-xs" name="newPassword" value={modifyInfo.newPassword} onChange={onChange}/>
                        <p className="text-lg py-4">수정할 비밀번호를 다시 입력하세요</p>
                        <input type="password" className="input w-full max-w-xs" name="newPasswordConfirm" value={modifyInfo.newPasswordConfirm} onChange={onChange}/>
                        { modifyInfo.passwordCheck ? (
                            <>
                                {modifyInfo.password === modifyInfo.newPassword ? (
                                <>
                                    <div className="flex justify-end my-2 mr-8">
                                        <p className="text-orange-500"> 현재 비밀번호와 같습니다. </p>
                                    </div>
                                    <div className="flex justify-end my-2 mr-8">
                                        <label className="btn btn-disabled">수정</label>
                                    </div>
                                    
                                </>) : (
                                    <>
                                    {modifyInfo.newPasswordCheck ? (
                                        <>
                                        { modifyInfo.newPassword !== "" && modifyInfo.newPassword === modifyInfo.newPasswordConfirm ?
                                            <>
                                                <div className="flex justify-end my-2 mr-8">
                                                    <p className="text-green-500"> 비밀번호가 일치합니다!</p>
                                                </div>
                                                <div className="flex justify-end my-2 mr-8">
                                                    <label htmlFor="modifyPassword" className="btn btn-success" onClick={modifyPw}>수정</label>
                                                </div>
                                            </> : 
                                            <>
                                                <div className="flex justify-end my-2 mr-8">
                                                    <p className="text-orange-500"> 비밀번호가 일치하지 않습니다. 확인해 주세요</p>
                                                </div>
                                                <div className="flex justify-end my-2 mr-8">
                                                    <label className="btn btn-disabled">수정</label>
                                                </div>
                                            </>
                                        }
                                        </>
                                    ) : (
                                        <>
                                            <div className="flex justify-end my-2 mr-8">
                                                <p className="text-orange-500">영문 + 숫자 + 특수문자를 조합하여 8~25자여야 합니다.</p>
                                            </div>
                                            <div className="flex justify-end my-2 mr-8">
                                                <label className="btn btn-disabled">수정</label>
                                            </div>
                                        </>
                                    )}
                                    </>
                                )}
                            </>
                        ) : null }            
                    </label>
                </label>
                </>
            </div> : 
            <div className="mt-420 flex flex-col justify-center text-center">
                <div className="text-4xl mb-4">잘못된 접근입니다</div>
                <div className="text-2xl text-orange-600 mb-16">로그인 정보가 없습니다 😅</div>
                <div className="w-1/4 btn btn-success m-auto text-black" onClick={()=>{window.location.href= "/"}}> 홈으로 돌아가기 </div>
            </div>
            }
            
            </div>
        </div>
    )
}

export default Mypage;