import { useState, useEffect } from "react";
import axios from "axios";


function BoardComment({ boardComment, setComments }){
    const [modifyArticle, setModifyArticle] = useState("")

    const comment = boardComment;

    const bridgeModifyModal = `#modify${comment.comment_id}`;
    const bridgeModifyModal2 = `modify${comment.comment_id}`;
    const bridgeDeleteModal = `#delete${comment.comment_id}`;
    const bridgeDeleteModal2 = `delete${comment.comment_id}`;

    const deleteComment = async() => {
        const response = await axios.delete(`http://localhost:3001/board/comment/${comment.comment_id}`, {
            data : {
                board_id : comment.id
            }
        })
        setComments(response.data[0])
    }

    const modifyComment = async() => {
        const response = await axios.put(`http://localhost:3001/board/comment/${comment.comment_id}`, {
            content : modifyArticle,
            user_id : 'joodopa@gmail.com',
            board_id : comment.id
        })
        // console.log(response.data[0])
        setComments(response.data[0])
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
        <div>
            { boardComment.comment_content? (
                <>
                <p>댓글 내용 : {comment.comment_content}</p>
                <p>댓글 작성자 : {comment.comment_name}</p>
                <p>댓글 작성일자 : {comment.c_created_date}</p>
                <div>
                        <a href={bridgeModifyModal} className="btn">수정</a>
                    </div>
                    <div>
                        <a href={bridgeDeleteModal}className="btn">삭제</a>
                    </div>
                </>
            ) : null }
        
                <div className="modal" id={bridgeModifyModal2}>
                <div className="modal-box">
                    <h3 className="font-bold text-lg">수정할 내용을 입력해주세요</h3>
                    <input type="text" placeholder="내용 입력" className="input w-full max-w-xs" onChange={onChange} value={modifyArticle}/>
                    <div className="modal-action">
                        <a href="#" className="btn btn-ghost" onClick={getPrevComment}>취소</a>
                        <a href="#" className="btn" onClick={modifyComment}>수정</a>
                    </div>
                </div>
            </div>
            <div className="modal" id={bridgeDeleteModal2}>
                <div className="modal-box">
                    <h3 className="font-bold text-lg">정말로 삭제하시겠습니까?</h3>
                    <p className="py-4">삭제한 코멘트는 되돌릴 수 없습니다.</p>
                    <div className="modal-action">
                        <a href="#" className="btn btn-ghost">취소</a>
                        <a href="#" className="btn" onClick={deleteComment}>삭제</a>
                    </div>
                </div>
            </div>
            </div>
    )
}

export default BoardComment;