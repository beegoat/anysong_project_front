import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

import BoardComment from './BoardComment';
import PaginationComment from '../PaginationComment';


function BoardDetails({ userData, setUserData, API_URI}) {
    const params = useParams();
    const navigate = useNavigate();
    const [article, setArticle] = useState([]);
    const [comments, setComments] = useState([]);
    const [commentArticle, setCommentArticle] = useState("");

    // 댓글 Pagination
    const [limit, setLimit] = useState(5);
    const [page, setPage] = useState(1);
    const offset = (page - 1) * limit
    

    // 글 정보와 글에 달린 댓글 정보 불러오는 함수. useEffect로 맨 처음 한 번 불러온다
    const getArticle = async() => {
        const id = params.id
        const response = await axios.get(`http://${API_URI}:3001/board/${id}`, {})
        console.log(response)
        setArticle(response.data[0])
        setComments(response.data)
    }

    useEffect(() => {
        getArticle();
    }, [])

    useEffect(() => {
        getArticle();
    }, [comments])

    // 글 삭제 함수, 삭제 후 navigate로 경로 이동
    const deleteArticle = async() => {
        const id = params.id
        const response = await axios.delete(`http://${API_URI}:3001/board/${id}`, {
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
            case 'notice' :
                navigate('/board/notice')
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
        const response = await axios.post(`http://${API_URI}:3001/board/comment/${params.id}`, {
            content : commentArticle,
            user_id : userData.user
        })
        setComments(response.data[0])
        setCommentArticle("")

        await axios.post(`http://${API_URI}:3001/jwtauthcheck`, {withCredentials: true})
        .then((res) => {
            setUserData(res.data);
        })
        
        // 댓글이 하
        // navigate(0);
    }

    const deleteComment = async(comment_id, id) => {
        const response = await axios.delete(`http://${API_URI}:3001/board/comment/${comment_id}`, {
            data : {
                board_id : id,
                isAdmin : userData.isAdmin
            }
        })
        setComments(response.data[0])
        console.log(response.data)
    }

    const modifyComment = async(modifyArticle, comment_id, board_id) => {
        const response = await axios.put(`http://${API_URI}:3001/board/comment/${comment_id}`, {
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
        <div className="w-full h-1460">
            <div className="w-1464 m-auto">
                <div className="flex justify-end mt-120 mb-4" />
                    
                <div className="flex flex-col">
                    <div className='flex flex-col'>
                        <div className='w-1/7 mr-auto btn btn-outline border-0 text-lg' onClick={goToList}> ← 목록</div>      
                        <div className='flex justify-center text-3xl'>{article.subject}</div>
                        <div className='flex justify-end'>
                            <div className='border-r-2 border-black pr-2 mr-2'>작성자</div>
                            <div>{article.nickname}</div>
                        </div>
                        
                        <div className="flex justify-end pb-2 text-sm">글 작성일자 : {article.created_date}</div>
                        <div className='w-full h-2 bg-gradient-to-r from-blue-200 to-lime-200'></div>
                    </div>
                    {/* <div>글 id : {article.id}</div> */}
                    <div className="w-3/4 h-312 mx-auto mt-2 p-4 text-center">{article.content}</div>
                </div>

                <div className='h-12'/>
                <div/>
                <div className='flex flex-col items-end'>
                    
                    {article.user_id === userData.user || userData.isAdmin ? (
                            <div className='flex flex-col'>
                                <div>
                                    <div className='btn btn-outline mr-3' onClick={toModifyForm}>수정</div>
                                    <label htmlFor="delete-modal" className="btn">삭제</label>
                                </div>
                                
                            </div>
                        ) : null}
                        <div className='w-full h-1 bg-gradient-to-r from-blue-200 to-black mt-3 mb-5'></div>
                </div>
                    
                    <div className='flex items-center'> 
                        <div className='text-2xl my-1 p-2'>댓글</div>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" />
                        </svg>
                        {comments ? <div className='ml-2'>{comments.length}</div> : <div className='ml-2'>{comments.length-1}</div> }
                    </div>
                    {/* <div className='w-1464 h-373'> */}
                    <div>
                        {comments.slice(offset, offset + limit).map(
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
                    <div>
                    <PaginationComment
                        total={comments.length}
                        limit={limit}
                        page={page}
                        setPage={setPage}
                        />
                    </div>
                    
                    
                    {userData.user? (
                    <div className='bg-gray-200'>
                        <div className="px-3 pb-3 border-4 border-dotted">
                            <div className='text-2xl my-1 p-2'> 댓글 작성</div>
                                <div className='w-3/4 mx-auto p-2 flex justify-end border-2 bg-white'>
                                    <textarea className=" w-full textarea  h-full bg-transparent my-3" placeholder="댓글을 입력해주세요 :)" onChange={onChange} value={commentArticle}></textarea>
                                </div>

                                <div className='flex justify-end'>
                                    <button className="btn btn-outline w-32" onClick={createComment}>작성</button>
                                </div>
                        </div>
                    </div>
                    ) : 
                    null }
                    
                    <input type="checkbox" id="delete-modal" className="modal-toggle" />
                        <div className="modal">
                            <div className="modal-box">
                                <h3 className="font-bold text-lg">정말로 삭제하시겠습니까?</h3>
                                <p className="py-4">삭제한 글은 되돌릴 수 없습니다.</p>
                                <div className="modal-action">
                                <label htmlFor="delete-modal" className="btn">취소</label>
                                <label htmlFor="delete-modal" className="btn bg-gradient-to-r from-blue-200 to-lime-200 text-black border-0" onClick={deleteArticle}>삭제</label>
                                </div>
                            </div>
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