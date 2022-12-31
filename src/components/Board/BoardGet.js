import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import Pagination from "../Pagination";


function BoardGet( { boardName }){
    const [articles, setArticles] = useState([]);
    const [limit, setLimit] = useState(10);
    const [page, setPage] = useState(1);
    const offset = (page - 1) * limit

    const getArticles = async() => {
        const response = await axios.get(`http://localhost:3001/board/${boardName}`)
        setArticles(response.data)
    }

    useEffect(() => {
        getArticles();
    }, [])

    return (
        <div>
            <div className="alert shadow-lg">
                <div>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="stroke-info flex-shrink-0 w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                    <span>글이 성공적으로 삭제되었습니다.</span>
                </div>
            </div>
            <div>
                <div>
                    <button className="btn" onClick={() => {console.log("클릭")}}><a href="http://localhost:3000/board/write">글쓰기</a></button>
                </div>
                <label>
                    페이지 당 표시할 게시물 수:&nbsp;
                    <select
                    type="number"
                    value={limit}
                    onChange={({ target: { value } }) => setLimit(Number(value))}
                    >
                    <option value="10">10</option>
                    <option value="12">12</option>
                    <option value="20">20</option>
                    <option value="50">50</option>
                    <option value="100">100</option>
                    </select>
                </label>
                <div className="overflow-x-auto">
                    <table className="table w-full">
                        <thead>
                            <tr>
                                <th></th>
                                <th>카테고리</th>
                                <th>제목</th>
                                <th>작성자</th>
                                <th>작성일</th>
                                <th>조회수</th>
                            </tr>
                        </thead>
                        <tbody>
                        {articles.slice(offset, offset + limit).map((article) => {
                            return(
                                <tr>
                                    <td>{article.id}</td>
                                    <td>{article.name}</td>
                                    <td><Link to={`/board/${article.id}/${boardName}`}>{article.subject}</Link></td>
                                    <td>{article.nickname}</td>
                                    <td>{article.created_date}</td>
                                    <td>{article.hits}</td>
                                </tr>
                                
                            )
                            })}
                        </tbody>
                        </table>
                        </div>
                        <Pagination 
                            total={articles.length}
                            limit={limit}
                            page={page}
                            setPage={setPage}
                        />
            </div>
        </div>
    )
}

export default BoardGet;