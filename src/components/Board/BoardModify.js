import { useState, useEffect } from "react";
import axios from "axios";
import { Navigate, useNavigate, useParams } from "react-router-dom";

function BoardModify({ userData, API_URI }){
    const navigate = useNavigate();
    const params = useParams();

    const [categoryNum, setCategoryNum] = useState();
    const [prevCategoryNum, setPrevCategoryNum] = useState();
    const [toggleOn, setToggleOn] = useState(false);
    const [article, setArticle] = useState({
        subject: "",
        content: ""
    })

    const getArticleFromId = async () => {
        const response = await axios.get(`http://${API_URI}:3001/board/${params.id}`)
        setArticle({
            subject : response.data[0].subject,
            content : response.data[0].content
        })
        setCategoryNum(response.data[0].category)

    }
    

    const onChange = (e) =>{
        const value = e.target.value;
        setArticle({
            ...article,
            [e.target.name]: value
        });
    }

    useEffect(()=> {
        getArticleFromId()
    }, [])

    const updateArticle = async () => {
        const response = await axios.put(`http://${API_URI}:3001/board/${params.id}`, {
            subject : article.subject,
            content : article.content,
            user_id : userData.user,
            category : categoryNum,
            isAdmin : userData.isAdmin
        })
        let location = ""
        switch(response.data[0][0].id){
            case 1 :
                navigate(`/board/${params.id}/total`);
                break
            case 2 :
                navigate(`/board/${params.id}/songreview`);
                break
            case 3 :
                navigate(`/board/${params.id}/albumreview`);
                break
            case 4 :
                navigate(`/board/${params.id}/talk`);
                break
            case 5 :
                navigate(`/board/${params.id}/question`);
                break
        }
    }

    const confirmCategory = () => {
        if(categoryNum){
            setToggleOn(false);
            updateArticle();
        } else (
            setToggleOn((prev) => !prev )
        )
    }


    return(
        <>
            <div className="w-full h-960">
                <div className="w-1464 h-820 mx-auto mt-120 mb-2 border-y-2 p-2">
                    <div className="text-center text-4xl mt-5 mb-5">글 수정</div>

                    <div className="border-t-2 border-dotted w-940 mx-auto">
                        <div className="flex justify-center items-center mt-10 w-full mb-6 ">
                            <div className="flex items-center h-46 mr-5 border-b-4">
                                <select 
                                value={categoryNum}
                                onChange={({target: {value}}) => setCategoryNum(Number(value))}
                                required
                                className="text-center"
                                >
                                    <option value="">카테고리 선택</option>
                                    <option value="1">음악리뷰</option>
                                    <option value="2">앨범리뷰</option>
                                    <option value="3">잡담/기타</option>
                                    <option value="4">질문</option>
                                </select>
                            </div>

                            <div className="w-3/6">
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
                        <button className="btn" onClick={confirmCategory}>글 수정</button>
                    ) : (<div className="tooltip tooltip-open tooltip-error tooltip-right" data-tip="카테고리를 선택해주세요">
                        <button className="btn" onClick={confirmCategory}>글 수정</button>
                        </div>)
                    }
                </div>

            </div>
        </>
    );
}

export default BoardModify;