import { useState, useEffect } from "react";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";

function BoardWrite({ userData }){
    const navigate = useNavigate();

    const [article, setArticle] = useState({
        subject: "",
        content: ""
    })
    const [categoryNum, setCategoryNum] = useState();
    const [toggleOn, setToggleOn] = useState(false);

    const onChange = (e) =>{
        const value = e.target.value;
        setArticle({
            ...article,
            [e.target.name]: value
        });
    }

    useEffect(() => {
        console.log(userData)
    }, [userData])


    const createArticle = async () => {
        const response = await axios.post("http://43.201.140.172:3001/board", {
            subject : article.subject,
            content : article.content,
            user_id : userData.user,
            category : categoryNum
        })
        // navigate(`/board/${response.data[0][0].id}/total`);
        switch(categoryNum) {
            case 1 : 
                navigate(`/board/${response.data[0][0].id}/songreview`)
                break
            case 2 : 
                navigate(`/board/${response.data[0][0].id}/albumreview`)
                break
            case 3 : 
                navigate(`/board/${response.data[0][0].id}/talk`)
                break
            case 4 : 
                navigate(`/board/${response.data[0][0].id}/question`)
                break
            case 5 :
                navigate(`/board/${response.data[0][0].id}/notice`)
                break
            default :
                navigate('/board')
            }
    }

    const confirmCategory = () => {
        if(categoryNum){
            setToggleOn(false);
            createArticle();
        } else (
            setToggleOn((prev) => !prev )
        )
    }


    return(
        <>
                <select 
                value={categoryNum}
                onChange={({target: {value}}) => setCategoryNum(Number(value))}
                required
                >
                    {userData.isAdmin ?(
                        <>
                        <option value="">카테고리 선택</option>
                        <option value="5">공지사항</option>
                        </>
                        ):(
                        <>
                            <option value="">카테고리 선택</option>
                            <option value="1">음악리뷰</option>
                            <option value="2">앨범리뷰</option>
                            <option value="3">잡담/기타</option>
                            <option value="4">질문</option>
                        </>
                    )}
                </select>
                <div className="flex justify-around">
                    <input type="text" placeholder="제목 입력" className="input input-bordered w-full max-w-xs" onChange={onChange} value={article.subject} name="subject"/>
                </div>
                <div className="flex justify-around">
                    <textarea className="textarea w-1/2" placeholder="내용입력" onChange={onChange} value={article.content} name="content"></textarea>
                </div>
                {toggleOn === false ? (
                    <button className="btn" onClick={confirmCategory}>글 작성</button>
                ) : (<div className="tooltip tooltip-open tooltip-error tooltip-right" data-tip="카테고리를 선택해주세요">
                    <button className="btn" onClick={confirmCategory}>글 작성</button>
                    </div>)
                }
        </>
    );
}

export default BoardWrite;