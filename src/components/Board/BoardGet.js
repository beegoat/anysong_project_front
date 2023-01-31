import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import Pagination from "../Pagination";


function BoardGet( { boardName, boardNameKR,  userData, API_URI }){
    const [articles, setArticles] = useState([]);
    const [limit, setLimit] = useState(10);
    const [page, setPage] = useState(1);
    const offset = (page - 1) * limit

    const getArticles = async() => {
        const response = await axios.get(`http://${API_URI}:3001/board/${boardName}`)
        setArticles(response.data)
    }

    useEffect(() => {
        getArticles();
    }, [])


    return (
    <div className="w-full h-960">
        <div className="w-1464 m-auto">
            <div className="flex justify-end h-20 mt-120">
                <div className="text-3xl my-auto bg-gradient-to-r from-white via-blue-100 to-white rounded-lg"> {boardNameKR} </div>
            </div>
            <div className="flex justify-end -mt-2 mb-2">
                            <div>
                            {/* 공지사항은 admin 권한을 가진 사람에게만 글쓰기 버튼이 보이게... */}
                            
                            {boardName === "notice" ? (
                                <>
                                    {userData.isAdmin ? 
                                    <button className="bg-blue-400 text-lg"><a href="http://localhost:3000/board/write">글쓰기</a></button>:
                                    null}
                                </>
                                ):(
                                <>
                                    {userData.isAuth? (
                                        <>
                                            <a href='http://localhost:3000/board/write'>
                                            <div className="flex items-center border-2 border-black ">
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                                    <path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" />
                                                </svg>
                                            
                                                <button className="text-xl font-bold px-2">글쓰기</button>
                                            </div>
                                            </a>
                                        </>
                                    ) : null}
                                </>
                            )}
                            </div>
                        </div>
            <div>
                {/* <div className="alert shadow-lg">
                    <div>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="stroke-info flex-shrink-0 w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                        <span>글이 성공적으로 삭제되었습니다.</span>
                    </div>
                </div> */}
                <div>
                    <div className="flex justify-end">
                        <label>
                            게시글 수:&nbsp;
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
                    </div>

                    

                    <div className="overflow-x-auto ">
                        <table className="table border-blue-200 w-full">
                            <thead>
                                <tr className=" justify-center">
                                    <th className="w-1/12 bg-gradient-to-r from-white to-blue-100"></th>
                                    <th className="w-1/12 text-sm text-center bg-gradient-to-r from-blue-100 to-blue-200">카테고리</th>
                                    <th className="w-8/12 text-base text-center bg-gradient-to-r from-blue-200 to-violet-100">제목</th>
                                    <th className="w-4/12 text-base text-center bg-gradient-to-r from-violet-100 to-violet-200">작성자</th>
                                    <th className="w-1/12 text-base text-center bg-gradient-to-r from-violet-200 to-pink-200">작성일</th>
                                    <th className="w-1/12 text-base text-center bg-gradient-to-r from-pink-200 to-white">조회수</th>
                                </tr>
                            </thead>
                            <tbody className="w-full">
                            {articles.slice(offset, offset + limit).map((article) => {
                                return(
                                    <tr>
                                        <td className="text-center text-xs">{article.id}</td>
                                        <td className="text-center text-sm ">{article.name}</td>
                                        <td className="text-center"><Link to={`/board/${article.id}/${boardName}`}>{article.subject}</Link></td>
                                        <td className="text-center">{article.nickname}</td>
                                        <td className="text-center text-sm">{article.created_date}</td>
                                        <td className="text-center text-sm">{article.hits}</td>
                                    </tr>
                                    
                                )
                                })}
                            </tbody>
                            </table>
                            </div>

                        <div className="flex justify-end my-7">
                            <Pagination 
                                total={articles.length}
                                limit={limit}
                                page={page}
                                setPage={setPage}
                            />
                        </div>
                </div>
            </div>
        </div>
    </div>
    )
}

export default BoardGet;