import { useEffect, useState } from "react";

function Comment({commentId, id, content, nickname, create_date, deleteArticle, putArticle, modifyArticle, setModifyArticle, isAuthor, isAdmin}){

    useEffect(() => {
        console.log(isAdmin)
    }, [isAdmin]) 


    const [modalId, setModalId] = useState(0);

    useEffect( () => {
        setModalId(commentId);
    }, [])

    const bridgeModifyModal = `#modify${modalId}`;
    const bridgeModifyModal2 = `modify${modalId}`;
    const bridgeDeleteModal = `#delete${modalId}`;
    const bridgeDeleteModal2 = `delete${modalId}`;

    const onChange = (e) => {
        setModifyArticle(e.target.value)
    }

    const getPrevComment = (e) => {
        setModifyArticle(content);
    }

    const cleanArticle = () => {
        setModifyArticle("");
    }

    const bridgePut = () => {
        putArticle(commentId, id, modifyArticle);
    }


    const bridgeDelete = () => {
        deleteArticle(commentId, id);
    }


    return(
    <div>
        <table className="table table-fixed border-b border-b-gray-200">
    {/* <!-- head --> */}
        <tbody>
      {/* <!-- row 1 --> */}
            <tr>
                <td className="w-484 break-all whitespace-normal">{content}</td>
                <td className="w-36 ml-2 text-right">
                    <div>{nickname}</div>
                    <div className="text-sm">{create_date}</div>
                </td>
                <td>
                    <div>
                        {isAuthor || isAdmin ? (
                            <>
                                {/* <div>
                                    <a href={bridgeModifyModal} className="btn" onClick={getPrevComment}>수정</a>
                                </div>
                                <div>
                                    <a href={bridgeDeleteModal}className="btn">삭제</a>
                                </div> */}

                                <div className="flex flex-col justify-end -ml-6">
                                    <a href={bridgeModifyModal} className="mr-1" onClick={getPrevComment}>
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
                        ) : null}
                    </div>

                </td>
            </tr>
        </tbody>
        </table>
        {/* 모달 내부 내용 */}
        <div className="modal" id={bridgeModifyModal2}>
            <div className="modal-box">
                <h3 className="font-bold text-lg">수정할 내용을 입력해주세요</h3>
                <input type="text" placeholder="내용 입력" className="input w-full max-w-xs" onChange={onChange} value={modifyArticle}/>
                <div className="modal-action">
                    <a href="#" className="btn btn-ghost" onClick={cleanArticle}>취소</a>
                    <a href="#" className="btn" onClick={bridgePut}>수정</a>
                </div>
            </div>
        </div>
        <div className="modal" id={bridgeDeleteModal2}>
            <div className="modal-box">
                <h3 className="font-bold text-lg">정말로 삭제하시겠습니까?</h3>
                <p className="py-4">삭제한 코멘트는 되돌릴 수 없습니다.</p>
                <div className="modal-action">
                    <a href="#" className="btn btn-ghost">취소</a>
                    <a href="#" className="btn" onClick={bridgeDelete}>삭제</a>
                </div>
            </div>
        </div>
    </div>
    
    )
}

export default Comment;