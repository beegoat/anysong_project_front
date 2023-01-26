import { useEffect, useState } from "react";
import axios from "axios";
import { Link, redirect, useNavigate, useRouteLoaderData } from "react-router-dom";


function Mypage( {userData} ){

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
        const response = await axios.get('http://localhost:3001/samenickname', {
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
        const response = await axios.put('http://localhost:3001/mynickname', {
            nickname : modifyInfo.nickname
        })
    }

    const modifyIntroduction = async() => {
        const response = await axios.put('http://localhost:3001/myintroduction', {
            introduction : modifyInfo.introduction
        })
    }

    const checkPw = async() => {
        console.log("클릭")

        const response = await axios.post('http://localhost:3001/comparepw', {
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

    const modifyPw = async() => {
        const response = await axios.put("http://localhost:3001/mypassword", {
            password : modifyInfo.newPassword
        })
    }

    const withDraw = async() => {
        const response = await axios.put('http://localhost:3001/withdraw', {})
        console.log(response)
    }

    // 내 정보 불러오기
    const getMySong = async() => {
        const response = await axios.get('http://localhost:3001/mysonginfo', {})
        if(response.data[0].length === 0){return} 
        setMySong(response.data[0])
    }

    const getMyAlbum = async() => {
        const response = await axios.get('http://localhost:3001/myalbuminfo', {})
        if(response.data[0].length === 0){return} 
        setMyAlbum(response.data[0])
    }

    const getMyArticle = async() => {
        const response = await axios.get('http://localhost:3001/myarticleinfo', {})
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
        <div className="flex">
        <div>
            <div className="text-3xl flex justify-center mb-20"> {userData.nickname} 님의 마이페이지 입니다.</div>
            <div className="inline-block">
                <ul>
                    <li><a href="#" onClick={()=>{setCategorySelect(1)}}>내 평가 관리</a></li>
                    <li><a href="#" onClick={()=>{setCategorySelect(2)}}>내 글 관리</a></li>
                    <li><a href="#" onClick={()=>{setCategorySelect(3)}}>회원정보수정</a></li>
                    <li><a href="#" onClick={()=>{setCategorySelect(4)}}>회원탈퇴</a></li>
                </ul>
            </div>
        </div>
        
        <div className="inline-block">
        
        {/* 내 평가 관리 */}
        {categorySelect === 1 ? (
            <div>
                <div className="my-20">
                    <div className="text-2xl">평가한 앨범</div>
                    <div className="flex">
                    {myAlbum.map((album) => {
                        return(
                        <div>
                            <div><img src={album.img}/></div>
                            <div>{album.title}</div>
                            <div>{album.artist}</div>
                            <div>{album.rate}</div>
                        </div>
                        )
                    })}
                    </div>
                    <div className="text-xl">내 앨범 코멘트</div>
                </div>
                <div className="my-20">
                    <div className="text-2xl m-auto">평가한 음원</div>
                    <div className="flex">
                    {mySong.map((song) => {
                        return(
                        <div>
                            <div><img src={song.img}/></div>
                            <div>{song.title}</div>
                            <div>{song.artist}</div>
                            <div>{song.rate}</div>
                        </div>
                        )
                    })}
                    </div>
                    <div className="text-xl">내 음원 코멘트</div>
                </div>
            </div>
        ) : null}
        
        {/* 내 글 관리 */}
        {categorySelect === 2 ? (
            <div>
                <div className="my-20">
                    <div className="text-2xl m-auto">내 게시글</div>
                    <div className="flex flex-col">
                    {myArticle === [] ? (<div>게시글이 없습니다.</div>) :
                        <>
                        {myArticle.map((article) => {
                            return(
                            <div>
                                <div><Link to={`/board/${article.id}/total`}>{article.subject}</Link></div>
                                <div>{article.date}</div>
                                <div>{article.hits}</div>
                            </div>
                            )
                        })}
                        </>
                    }
                    </div>
                    
                    <div className="text-xl">내 게시글 코멘트</div>
                </div>
            </div>
        ) : null}

        {/* 회원정보수정 */}
        {categorySelect === 3 ? (
            <div>
                <div>
                    <div className="inline-block">
                        <div>아이디</div>
                        <div>닉네임</div>
                        <div>자기소개</div>
                        <div>비밀번호</div>
                    </div>
                    <div className="inline-block">
                        <div>{userData.user}</div>
                        <div>
                            <div className="inline-block">{userData.nickname}</div>
                            <label htmlFor="modifyNickname" className="btn inline-block" 
                            onClick={() => {setModifyInfo({...modifyInfo, nickname: userData.nickname, nicknameCheck: false, nicknameCheckMsg: ""})}}>수정</label>
                        </div>
                        
                        <div>
                            <div className="inline-block">{userData.introduction}</div>
                            <label htmlFor="modifyIntroduction" className="btn inline-block"
                            onClick={() => {setModifyInfo({...modifyInfo, introduction: userData.introduction})}}>수정</label>
                        </div>
                        <div>
                            <div>비밀번호</div>
                            <label htmlFor="modifyPassword" className="btn inline-block"
                            onClick={() => {setModifyInfo({...modifyInfo, password:"", passwordCheck:false, passwordCheckMsg: "", newPassword: "", newPasswordConfirm: ""})}}>수정</label>
                        </div>
                    </div>
                </div>
            </div>
        ) : null}

        {/* 회원탈퇴 */}
        {categorySelect === 4 ? (
            <div>
                <div>회원탈퇴</div>
                <div>탈퇴하시겠습니까?</div>
                <p>회원 탈퇴 후에는 되돌릴 수 없습니다.</p>
                <input type="checkbox" 
                onClick={()=>{setWithDrawToggle((prev) => (!prev))}}
                className="checkbox" />
                <label> 확인했습니다. </label>
                {withDrawToggle ? 
                    <label className="btn" onClick={withDraw} >회원탈퇴</label> :
                    <label className="btn btn-disabled">회원탈퇴</label>
                }
            </div>
            

        ) : null }

        </div>
        {/* 모달 */}
        <>
            <input type="checkbox" id="modifyNickname" className="modal-toggle" />
            <label htmlFor="modifyNickname" className="modal cursor-pointer">
                <label className="modal-box relative" htmlFor="">
                    <h3 className="text-lg font-bold">닉네임 변경</h3>
                    <p className="py-4">변경할 닉네임을 입력하세요</p>
                    <input type="text" className="input w-full max-w-xs" name="nickname" value={modifyInfo.nickname} onChange={onChange} />
                    <label className="btn" onClick={checkNickname}> 중복확인</label>
                    <div>{modifyInfo.nicknameCheckMsg}</div>
                    {modifyInfo.nicknameCheck ? <label htmlFor="modifyNickname" className="btn" onClick={modifyNickname}>수정</label> : <label className="btn btn-disabled">수정</label>}
                    
                </label>
            </label>
            <input type="checkbox" id="modifyIntroduction" className="modal-toggle" />
            <label htmlFor="modifyIntroduction" className="modal cursor-pointer">
                <label className="modal-box relative" htmlFor="">
                    <h3 className="text-lg font-bold">자기소개 변경</h3>
                    <p className="py-4">변경할 내 소개를 입력하세요</p>
                    <textarea className="textarea textarea-ghost" name="introduction" value={modifyInfo.introduction} onChange={onChange} ></textarea>
                    <label className="btn" htmlFor="modifyIntroduction" onClick={modifyIntroduction}>수정</label>
                </label>
            </label>
            <input type="checkbox" id="modifyPassword" className="modal-toggle" />
            <label htmlFor="modifyPassword" className="modal cursor-pointer">
                <label className="modal-box relative" htmlFor="">
                    <h3 className="text-lg font-bold">비밀번호 변경</h3>
                    <p className="py-4">현재 비밀번호를 입력하세요</p>
                    <input type="current-password" className="input w-full max-w-xs" name="password" value={modifyInfo.password} onChange={onChange}/>
                    <label className="btn" onClick={checkPw}> 비밀번호 확인</label>
                    <label>{modifyInfo.passwordCheckMsg}</label>
                    <p className="py-4">수정할 비밀번호를 입력하세요</p>
                    <input type="new-password" className="input w-full max-w-xs" name="newPassword" value={modifyInfo.newPassword} onChange={onChange}/>
                    <p className="py-4">수정할 비밀번호를 다시 입력하세요</p>
                    <input type="new-password" className="input w-full max-w-xs" name="newPasswordConfirm" value={modifyInfo.newPasswordConfirm} onChange={onChange}/>
                    { modifyInfo.passwordCheck ? (
                        <>
                            {modifyInfo.password === modifyInfo.newPassword ? (
                            <>
                                <p> 현재 비밀번호와 같습니다. </p>
                                <label className="btn btn-disabled">수정</label>
                            </>) : (
                                <>
                                {modifyInfo.newPasswordCheck ? (
                                    <>
                                    { modifyInfo.newPassword !== "" && modifyInfo.newPassword === modifyInfo.newPasswordConfirm ?
                                         <>
                                            <p> 비밀번호가 일치합니다!</p>
                                             <label htmlFor="modifyPassword" className="btn" onClick={modifyPw}>수정</label>
                                         </> : 
                                         <>
                                             <p> 비밀번호가 일치하지 않습니다. 확인해 주세요</p>
                                             <label className="btn btn-disabled">수정</label>
                                         </>
                                     }
                                    </>
                                ) : (
                                    <>
                                        <p> 영문 + 숫자 + 특수문자를 조합하여 8~25자여야 합니다.</p>
                                        <label className="btn btn-disabled">수정</label>
                                    </>
                                )}
                                </>
                            )}
                        </>
                    ) : null }            
                </label>
            </label>
            </>
        </div>
    )
}

export default Mypage;