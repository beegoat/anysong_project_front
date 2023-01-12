import { useState, useEffect } from "react";
import axios from "axios";
import StarRating from "./StarRating";
import Comment from "./Comment";


function RateDetail({ detailInfo, userData }){
    const [article, setArticle] = useState("");
    const [modifyArticle, setModifyArticle] = useState("");
    const [comment, setComment] = useState([]);
    const [star, setStar] = useState();

    // 로그인 정보
    const [userInfo, setUserInfo] = useState([])

    // 앨범 id로 해당 앨범에 달린 댓글 조회 & detailInfo 변경 감지해서 해당 코멘트 조회하도록 useEffect
    const getComment = async (id) => {
        const response = await axios.get(`http://localhost:3001/comment/${id}`,{
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
        const response = await axios.post("http://localhost:3001/comment", {
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
        const response = await axios.delete(`http://localhost:3001/comment/${commentid}`, {
            data: {
                id : detailInfo.id,
                isSong : detailInfo.isSong,
                isAlbum : detailInfo.isAlbum
            }
        });
        setComment(response.data);
    }

    // 댓글 수정, response 값 받아와서 갱신
    const putArticle = async(commentid, id, article) => {
        const response = await axios.put(`http://localhost:3001/comment/${commentid}`, {
            data: {
                id: id,
                content: article,
                isSong : detailInfo.isSong,
                isAlbum : detailInfo.isAlbum
            }
        });
        setComment(response.data)
    }

    // 별점 평가 조회(album) 
    const getScore = async( ) => {
        const response = await axios.get(`http://localhost:3001/rating`, {
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
                const response = await axios.post(`http://localhost:3001/rating`, {
                    data : {
                        rate : starRate,
                        id : detailInfo.id,
                        user_id : userInfo.user,
                        isSong : detailInfo.isSong,
                        isAlbum : detailInfo.isAlbum
                    }})
                setStar(response.data[0].rate);}
            } else {
                await axios.delete(`http://localhost:3001/rating`, {
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
            <li><img src={detailInfo.img} className="mx-auto w-fit"></img></li>
                <li className="font-bold text-3xl mx-auto mt-5 mb-1">{detailInfo.title}</li>
                <li className="text-2xl mx-auto mb-10">{detailInfo.artist}</li>
                <div className="mx-auto">
                    <StarRating 
                    star={star}
                    setStar={setStar}
                    getStarFromComp={getStarFromComp}
                    isLogin={userData}
                    />
                </div>
                <div className="mx-auto mt-16">
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
                        />)
                    )}
                </div>
                <div className="my-24"></div>
                <div className="mx-12">
                    {userData.user? (
                        <>
                        <input type="text" placeholder="한 줄 소감을 남겨보세요!" className="input w-full max-w-xs" onChange={onChange} value={article}/>
                        <button className="btn glass w-24" onClick={setArticleValue}>입력</button>
                        </>
                    ) : (
                            <>
                            <input type="text" placeholder="로그인을 해 주세요!" className="input w-full max-w-xs" disabled />
                            </>
                        )
                    }
                </div>
        </>
    )
}

export default RateDetail;