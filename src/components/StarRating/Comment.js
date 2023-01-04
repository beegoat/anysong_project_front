import { useEffect, useState } from "react";

function Comment({id, album_id, content, nickname, create_date, deleteArticle, putArticle, modifyArticle, setModifyArticle, isAuthor}){

    
    const [modalId, setModalId] = useState(0);

    useEffect( () => {
        setModalId(id);
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
        putArticle(id, album_id, modifyArticle);
    }


    const bridgeDelete = () => {
        deleteArticle(id, album_id);
    }


    return(
    <div>
        <table className="table table-fixed">
    {/* <!-- head --> */}
        <tbody>
      {/* <!-- row 1 --> */}
            <tr>
                <td className="break-all whitespace-normal">{content}</td>
                <td><div>{nickname}</div><div className="text-sm">{create_date}</div></td>
                <td>
                    <div>
                        {isAuthor? (
                            <>
                                <div>
                                    <a href={bridgeModifyModal} className="btn" onClick={getPrevComment}>수정</a>
                                </div>
                                <div>
                                    <a href={bridgeDeleteModal}className="btn">삭제</a>
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