import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

import BoardComment from './BoardComment';

function BoardDetails({ userData }) {
    const params = useParams();
    const navigate = useNavigate();
    const [article, setArticle] = useState([]);
    const [comments, setComments] = useState([]);
    const [commentArticle, setCommentArticle] = useState("");


    // 글 정보와 글에 달린 댓글 정보 불러오는 함수. useEffect로 맨 처음 한 번 불러온다
    const getArticle = async() => {
        const id = params.id
        const response = await axios.get(`http://localhost:3001/board/${id}`, {})
        setArticle(response.data[0])
        setComments(response.data)
    }

    useEffect(() => {
        getArticle();
    }, [])

    useEffect(() => {
        console.log(comments)
    }, [comments])

    // 글 삭제 함수, 삭제 후 navigate로 경로 이동
    const deleteArticle = async() => {
        const id = params.id
        const response = await axios.delete(`http://localhost:3001/board/${id}`, {
            data: {user_id : article.user_id}
        })
        if(response.status === 200 ){
            alert("글이 삭제되었습니다.");
            switch(article.category) {
                case '1' :
                    navigate('/board');
                    break
                case '2' : 
                    navigate('/board/songreview')
                    break
                case '3' : 
                    navigate('/board/albumreview')
                    break
                case '4' : 
                    navigate('/board/talk')
                    break
                case '5' : 
                    navigate('/board/question')
                    break
                default :
                    navigate('/board')
            }
        } else {
            alert("알 수 없는 이유로 삭제에 실패했습니다.")
            navigate('/board');
        }
    }

    // 글 수정 함수, 누르면 수정 창으로 이동한다.
    const toModifyForm = () => {
        if(userData.user === article.user_id ||  userData.isAdmin ) {
        navigate(`/board/modify/${article.id}`)
        } else {
            alert("권한이 없습니다.")
        }
    }

    // 글 목록 버튼을 누르면, 원래 있던 게시판의 목록으로 돌아가는 함수 url params에 정보 싣어서 해당 params 응용 - 경로를 기억
    const goToList = () => {
        switch(params.location) {
            case 'total' :
                navigate('/board');
                break
            case 'songreview' : 
                navigate('/board/songreview')
                break
            case 'albumreview' : 
                navigate('/board/albumreview')
                break
            case 'talk' : 
                navigate('/board/talk')
                break
            case 'question' : 
                navigate('/board/question')
                break
            default :
                navigate('/board')
            }
    }

    // 댓글 작성을 위한 onChange 함수
    const onChange = (e) => {
        setCommentArticle(e.target.value);
    }

    // 댓글 C, U, D 함수
    const createComment = async() => {
        const response = await axios.post(`http://localhost:3001/board/comment/${params.id}`, {
            content : commentArticle,
            user_id : userData.user
        })
        setComments(response.data[0])
        setCommentArticle("")
        // 댓글이 하
        // navigate(0);
    }

    const deleteComment = async(comment_id, id) => {
        const response = await axios.delete(`http://localhost:3001/board/comment/${comment_id}`, {
            data : {
                board_id : id,
                isAdmin : userData.isAdmin
            }
        })
        setComments(response.data[0])
        console.log(response.data)
    }

    const modifyComment = async(modifyArticle, comment_id, board_id) => {
        const response = await axios.put(`http://localhost:3001/board/comment/${comment_id}`, {
            content : modifyArticle,
            user_id : userData.user,
            board_id : board_id,
            isAdmin : userData.isAdmin
        })
        setComments(response.data[0])
        console.log(response.data)
    }

    return(
        <>
        <h2>글 id : {article.id}</h2>
        <p>글 제목 : {article.subject}</p>
        <p>글 내용 : {article.content}</p>
        <p>글 작성일자 : {article.created_date}</p>
        <div className='h-12'/>
        <div/>
            {article.user_id === userData.user || userData.isAdmin ? (
                <>
                    <button className='btn btn-outline mr-5' onClick={toModifyForm}>수정</button>
                    <label htmlFor="delete-modal" className="btn">삭제</label>
                </>
            ) : null }
            <button className='btn' onClick={goToList}> 글 목록 </button>       
            <div>
                {comments.map(
                    (comment) => (
                    <BoardComment
                        key = {comment.index}
                        boardComment = {comment}
                        deleteComment={deleteComment}
                        modifyComment={modifyComment}
                        userData={userData}
                        />
                    )
                    )
                }
            </div>
            {userData.user? (
                <div>
                <textarea className="textarea" placeholder="댓글 작성" onChange={onChange} value={commentArticle}></textarea>
                <button className="btn" onClick={createComment}>작성</button>
                </div>
            ) : 
            <h1>댓글은 로그인한 회원만 달 수 있습니다.</h1> }
            <input type="checkbox" id="delete-modal" className="modal-toggle" />
                <div className="modal">
                    <div className="modal-box">
                        <h3 className="font-bold text-lg">정말로 삭제하시겠습니까?</h3>
                        <p className="py-4">삭제한 글은 되돌릴 수 없습니다.</p>
                        <div className="modal-action">
                        <label htmlFor="delete-modal" className="btn">취소</label>
                        <label htmlFor="delete-modal" className="btn btn-error" onClick={deleteArticle}>삭제</label>
                        </div>
                    </div>
                </div>

                
        </>
    )
}

export default BoardDetails;



// const Study = () => {
//   const params = useParams();

//   useEffect(() => {
//     const id = params.studyId;
    // axios
    //   .get(`http://localhost:3001/study/studies/${id}`)
    //   .then((res) => {
    //     console.log(res.data);
    //   })
    //   .catch((error) => console.log('Network Error : ', error));
//   });
//   return <div></div>;