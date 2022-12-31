import { useState, useEffect } from "react";
import axios from "axios";
import { Navigate, useNavigate, useParams } from "react-router-dom";

function BoardModify(){
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
        const response = await axios.get(`http://localhost:3001/board/${params.id}`)
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
        const response = await axios.put(`http://localhost:3001/board/${params.id}`, {
            subject : article.subject,
            content : article.content,
            user_id : 'joodopa@gmail.com',
            category : categoryNum
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
                <select 
                value={categoryNum}
                onChange={({target: {value}}) => setCategoryNum(Number(value))}
                required
                >
                    <option value="">카테고리 선택</option>
                    <option value="1">음악리뷰</option>
                    <option value="2">앨범리뷰</option>
                    <option value="3">잡담/기타</option>
                    <option value="4">질문</option>
                </select>
                <div className="flex justify-around">
                    <input type="text" placeholder="제목 입력" className="input input-bordered w-full max-w-xs" onChange={onChange} value={article.subject} name="subject"/>
                </div>
                <div className="flex justify-around">
                    <textarea className="textarea w-1/2" placeholder="내용입력" onChange={onChange} value={article.content} name="content"></textarea>
                </div>
                {toggleOn === false ? (
                    <button className="btn" onClick={confirmCategory}>수정</button>
                ) : (<div className="tooltip tooltip-open tooltip-error tooltip-right" data-tip="카테고리를 선택해주세요">
                    <button className="btn" onClick={confirmCategory}>수정</button>
                    </div>)
                }
        </>
    );
}

export default BoardModify;