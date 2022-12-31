import { useState, useEffect } from "react";
import axios from "axios";
import StarRating from "./StarRating";
import Comment from "./Comment";


function RateDetail({detailInfo}){
    const [article, setArticle] = useState("");
    const [modifyArticle, setModifyArticle] = useState("");
    const [comment, setComment] = useState([]);
    const [star, setStar] = useState();

    // 앨범 id로 해당 앨범에 달린 댓글 조회 & detailInfo 변경 감지해서 해당 코멘트 조회하도록 useEffect
    const getComment = async (id) => {
        const response = await axios.get(`http://localhost:3001/comment/${id}`,{});
        setComment(response.data);
    }

    useEffect(() => {
        getComment(detailInfo.id);
        getScore();
        return () => {}
    }, [detailInfo] )


    // 댓글 작성, response 값으로 album_id로 조회한 쿼리 값 불러와서 setComment에 재배치해주면서 리렌더링해주고 있음.
    const postArticle = async (album_id, content) => {
        const response = await axios.post("http://localhost:3001/comment", {
            content: content,
            user_id: "joodopa@gmail.com",
            album_id: album_id
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
                album_id: album_id
            }
        });
        setComment(response.data);
    }

    // 댓글 수정, response 값 받아와서 갱신
    const putArticle = async(commentid, album_id, article) => {
        const response = await axios.put(`http://localhost:3001/comment/${commentid}`, {
            data: {
                album_id: album_id,
                content: article
            }
        });
        setComment(response.data)
    }

    // 별점 평가 조회(album) 
    const getScore = async( ) => {
        const response = await axios.get(`http://localhost:3001/rating`, {
            params : {
                user_id: "joodopa@gmail.com",
                album_id: detailInfo.id,
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
                        album_id : detailInfo.id,
                        user_id : "joodopa@gmail.com"
                    }})
                setStar(response.data[0].rate);}
            } else {
                await axios.delete(`http://localhost:3001/rating`, {
                    data: {
                        album_id: detailInfo.id,
                        user_id: "joodopa@gmail.com"
                    }})
                setStar();
            }
        }
            // setStar(starRate);
        


    useEffect(() => {
        console.log("이것은 star가 set되고 난 뒤 나옵니다."+star)
        // console.log("album id" + detailInfo.id)
    }, [star])

    return(
        <>
            <button onClick={getScore}>확인</button>
            <li><img src={detailInfo.img} className="mx-auto w-fit"></img></li>
                <li className="font-bold text-3xl mx-auto mt-5 mb-1">{detailInfo.title}</li>
                <li className="text-2xl mx-auto mb-10">{detailInfo.artist}</li>
                <div className="mx-auto">
                    <StarRating 

                    star={star}
                    getStarFromComp={getStarFromComp}
                    />
                </div>
                <div className="mx-auto mt-16">
                    {comment.map(
                        (com) => (
                        <Comment 
                            id={com.comment_id}
                            album_id={com.album_id}
                            content={com.content}
                            nickname={com.nickname}
                            create_date={com.create_date}
                            deleteArticle={deleteArticle}
                            putArticle={putArticle}
                            modifyArticle={modifyArticle}
                            setModifyArticle={setModifyArticle}
                        />)
                    )}
                </div>
                <div className="my-24"></div>
                <div className="mx-12">
                    <input type="text" placeholder="한 줄 소감을 남겨보세요!" className="input w-full max-w-xs" onChange={onChange} value={article}/>
                    <button className="btn glass w-24" onClick={setArticleValue}>입력</button>
                </div>
        </>
    )
}

export default RateDetail;