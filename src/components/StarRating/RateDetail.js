import { useState, useEffect } from "react";
import axios from "axios";
import StarRating from "./StarRating";
import Comment from "./Comment";


function RateDetail({ detailInfo, userData, API_URI }){
    const [article, setArticle] = useState("");
    const [modifyArticle, setModifyArticle] = useState("");
    const [comment, setComment] = useState([]);
    const [star, setStar] = useState();

    // 로그인 정보
    const [userInfo, setUserInfo] = useState([])

    // id로 해당 앨범에 달린 댓글 조회 & detailInfo 변경 감지해서 해당 코멘트 조회하도록 useEffect
    const getComment = async (id) => {
        const response = await axios.get(`http://${API_URI}:3001/comment/${id}`,{
            params : {
            isSong : detailInfo.isSong,
            isAlbum : detailInfo.isAlbum
            }
        });
        setComment(response.data);
    }


    useEffect(() => {
        getComment(detailInfo.id);
        getScore();
        return () => {}
    }, [detailInfo] )

    useEffect(() => {
        setUserInfo(userData)
    }, [userData])



    // 댓글 작성, response 값으로 album_id로 조회한 쿼리 값 불러와서 setComment에 재배치해주면서 리렌더링해주고 있음.
    const postArticle = async (id, content) => {
        const response = await axios.post(`http://${API_URI}:3001/comment`, {
            content: content,
            user_id: userInfo.user,
            id: id,
            isSong : detailInfo.isSong,
            isAlbum : detailInfo.isAlbum
        })
        setComment(response.data);
    }

    const onChange = (e) => {
        setArticle(e.target.value);
    }

    const setArticleValue = () => {
        postArticle(detailInfo.id, article);
        setArticle("");
    }

    // 댓글 삭제, response 값 받아와서 갱신해줌
    const deleteArticle = async (commentid, album_id) => {
        const response = await axios.delete(`http://${API_URI}:3001/comment/${commentid}`, {
            data: {
                id : detailInfo.id,
                isSong : detailInfo.isSong,
                isAlbum : detailInfo.isAlbum,
                isAdmin : userInfo.isAdmin
            }
        });
        setComment(response.data);
    }

    // 댓글 수정, response 값 받아와서 갱신
    const putArticle = async(commentid, id, article) => {
        const response = await axios.put(`http://${API_URI}:3001/comment/${commentid}`, {
            data: {
                id: id,
                content: article,
                isSong : detailInfo.isSong,
                isAlbum : detailInfo.isAlbum,
                isAdmin : userInfo.isAdmin
            }
        });
        setComment(response.data)
    }

    // 별점 평가 조회(album) 
    const getScore = async( ) => {
        const response = await axios.get(`http://${API_URI}:3001/rating`, {
            params : {
                user_id: userInfo.user,
                id: detailInfo.id,
                isSong : detailInfo.isSong,
                isAlbum : detailInfo.isAlbum
            }
        })
        if(response.data[0]){
            setStar(response.data[0].rate);
        } else {
            setStar();
        }
    }

    // 별점 주고받기 함수
    const getStarFromComp = async (starRate) => {
        if(starRate !== "0"){
            if(star !== starRate ){
                const response = await axios.post(`http://${API_URI}:3001/rating`, {
                    data : {
                        rate : starRate,
                        id : detailInfo.id,
                        user_id : userInfo.user,
                        isSong : detailInfo.isSong,
                        isAlbum : detailInfo.isAlbum
                    }})
                setStar(response.data[0].rate);}
            } else {
                await axios.delete(`http://${API_URI}:3001/rating`, {
                    data: {
                        user_id: userInfo.user,
                        id : detailInfo.id,
                        isSong : detailInfo.isSong,
                        isAlbum : detailInfo.isAlbum
                    }})
                setStar();
            }
        }
            // setStar(starRate);
    

    return(
        <>
        <div className=" mt-16 flex flex-col">
            <li><img src={detailInfo.img} className="mx-auto w-fit"></img></li>
                <li className="font-bold text-5xl mx-auto mt-5 mb-1 text-center">{detailInfo.title}</li>
                <li className="text-2xl mx-auto mb-10 border-b-2">{detailInfo.artist}</li>
                <div className="mx-auto">
                    <StarRating 
                    star={star}
                    setStar={setStar}
                    getStarFromComp={getStarFromComp}
                    isLogin={userData}
                    />
                </div>
                <div className="w-full mt-14">
                    <div className="flex items-center pl-3 bg-gradient-to-l from-blue-200 to-violet-200 border-y border-y-gray-200"> 
                        <div className="text-2xl">댓글</div>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 ml-2 mr-1">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" />
                        </svg>
                        {comment.length}
                    </div>
                    
                    <div className="mx-auto ">
                        {comment.map(
                            (com) => (
                            <Comment 
                                commentId={com.comment_id}
                                id={com.id}
                                user_id={com.user_id}
                                content={com.content}
                                nickname={com.nickname}
                                create_date={com.create_date}
                                deleteArticle={deleteArticle}
                                putArticle={putArticle}
                                modifyArticle={modifyArticle}
                                setModifyArticle={setModifyArticle}
                                isAuthor={com.user_id===userInfo.user}
                                isAdmin={userInfo.isAdmin}
                            />)
                        )}
                    </div>
                </div>
                <div className="my-24"></div>
                <div className="w-full">
                    {userData.user? (
                    <div className="border-t-8 flex">
                        <div className="w-484 my-4">
                            <input type="text" placeholder="한 줄 소감을 남겨보세요!" className="input w-full" onChange={onChange} value={article}/>
                        </div>
                        <div className="my-4">
                            <button className="w-24 bg-gradient-to-l from-blue-200 to-violet-200 p-2 mt-1.5" onClick={setArticleValue}>입력</button>
                        </div>
                    </div>
                    ) : (
                            <>
                            <div className="border-t-8 flex justify-center">
                                <div className="my-4">
                                    <input type="text" placeholder="댓글은 회원만 작성할 수 있습니다." className="input m-auto" disabled />
                                </div>
                            </div>
                            </>
                    )}
                </div>
            </div>
        </>
    )
}

export default RateDetail;