import { useState, useEffect } from "react";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";

function BoardWrite({ userData, API_URI }){
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
        const response = await axios.post(`http://${API_URI}:3001/board`, {
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
            <div className="w-full h-960">
                <div className="w-1464 h-820 mx-auto mt-120 mb-2 border-y-2 p-2">
                    <div className="text-center text-4xl mt-5 mb-5">글 작성</div>

                    <div className="border-t-2 border-dotted w-940 mx-auto">

                        <div className="flex justify-center items-center mt-10 w-full mb-6 ">
                            <div className="flex items-center h-46 mr-5 border-b-4">
                                <select 
                                value={categoryNum}
                                onChange={({target: {value}}) => setCategoryNum(Number(value))}
                                required
                                className="text-center"
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
                            </div>

                            <div className="w-3/6 ">
                                <input type="text" placeholder="제목을 입력해주세요" className="w-full input input-bordered" onChange={onChange} value={article.subject} name="subject"/>
                            </div>

                        </div>

                        <div className="flex justify-around w-940 h-448 pl-2 pr-3 border-4">
                            <textarea className="textarea w-full" placeholder="여기에 글 내용을 작성해주세요" onChange={onChange} value={article.content} name="content"></textarea>
                        </div>

                    </div>
                </div>

                <div className="w-1464 mx-auto flex justify-end">
                    {toggleOn === false ? (
                        <button className="btn" onClick={confirmCategory}>글 작성</button>
                    ) : (<div className="tooltip tooltip-open tooltip-error tooltip-right" data-tip="카테고리를 선택해주세요">
                        <button className="btn" onClick={confirmCategory}>글 작성</button>
                        </div>)
                    }
                </div>

            </div>
        </>
    );
}

export default BoardWrite;