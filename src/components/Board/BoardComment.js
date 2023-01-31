import { useState, useEffect } from "react";


function BoardComment({ boardComment, userData, deleteComment, modifyComment, API_URI }){
    
    const [modifyArticle, setModifyArticle] = useState("")

    const comment = boardComment;

    const bridgeModifyModal = `#modify${comment.comment_id}`;
    const bridgeModifyModal2 = `modify${comment.comment_id}`;
    const bridgeDeleteModal = `#delete${comment.comment_id}`;
    const bridgeDeleteModal2 = `delete${comment.comment_id}`;

    const deleteBridge = () => {
        deleteComment(comment.comment_id, comment.id)
    }

    const modifyBridge = () => {
        modifyComment(modifyArticle, comment.comment_id, comment.id)
    }

    const getPrevComment = () => {
        setModifyArticle(comment.comment_content)
    }

    const onChange = (e) => {
        setModifyArticle(e.target.value);
    }

    useEffect(() => {
        getPrevComment()
    }, [])
 

    return(
        <div className="my-3 border-b-1">
            { boardComment.comment_content? (
                <>
                <div className="flex flex-col">
                <div className="p-2 pl-8">{comment.comment_content}</div>
                
                {boardComment.comment_user === userData.user  || userData.isAdmin? (
                    <>
                    <div className="flex justify-end">
                        <a href={bridgeModifyModal} className=" mr-1">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                            </svg>
                        </a>

                        <a href={bridgeDeleteModal}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="red" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </a>                        
                    </div>
                </>

                ) : null }

                    <div className="flex justify-end">
                        <div className="mr-5 text">{comment.comment_name}</div>
                        <div className="text-base">{comment.c_created_date}</div>
                    </div>
                </div>
                </>
            ) : <p className="text-center">댓글이 없습니다. 첫 댓글을 남겨보세요 ! ❣°ʚ(❛ั ᴗ ❛ั)ɞ°❣ </p>  }


        
                <div className="modal" id={bridgeModifyModal2}>
                <div className="modal-box">
                    <h3 className="font-bold text-lg">수정할 내용을 입력해주세요</h3>
                    <input type="text" placeholder="내용 입력" className="input w-full max-w-xs" onChange={onChange} value={modifyArticle}/>
                    <div className="modal-action">
                        <a href="#" className="btn btn-ghost" onClick={getPrevComment}>취소</a>
                        <a href="#" className="btn" onClick={modifyBridge}>수정</a>
                    </div>
                </div>
            </div>
            <div className="modal" id={bridgeDeleteModal2}>
                <div className="modal-box">
                    <h3 className="font-bold text-lg">정말로 삭제하시겠습니까?</h3>
                    <p className="py-4">삭제한 코멘트는 되돌릴 수 없습니다.</p>
                    <div className="modal-action">
                        <a href="#" className="btn btn-ghost">취소</a>
                        <a href="#" className="btn" onClick={deleteBridge}>삭제</a>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BoardComment;