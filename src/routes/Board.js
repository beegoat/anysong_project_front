import { Routes, Route } from "react-router-dom";

import BoardGet from "../components/Board/BoardGet";
import BoardDetails from "../components/Board/BoardDetails";
import BoardWrite from "../components/Board/BoardWrite";
import BoardModify from "../components/Board/BoardModify";

function Board({ userData, setUserData,  API_URI }){
    return(
        <Routes>
            <Route exact path="" element={<BoardGet boardName={"total"} boardNameKR={"전체게시판"} userData={userData} API_URI={API_URI} />} />
            <Route path="/songreview" element={<BoardGet boardName={"songreview"} boardNameKR={"음악 리뷰"} userData={userData} API_URI={API_URI} />} />
            <Route path="/albumreview" element={<BoardGet boardName={"albumreview"} boardNameKR={"앨범 리뷰"} userData={userData} API_URI={API_URI} />} />
            <Route path="/talk" element={<BoardGet boardName={"talk"} boardNameKR={"잡담/기타"} userData={userData} API_URI={API_URI} />} />
            <Route path="/question" element={<BoardGet boardName={"question"} boardNameKR={"질문"} userData={userData} API_URI={API_URI} />} />
            <Route path="/notice" element={<BoardGet boardName={"notice"} boardNameKR={"공지사항"} userData={userData} API_URI={API_URI} />} />
            <Route path="/:id/:location" element={<BoardDetails userData={userData} setUserData={setUserData} API_URI={API_URI} />} />
            <Route path="/:id" element={<BoardDetails userData={userData} setUserData={setUserData} API_URI={API_URI} />} />
            <Route path="/write" element={<BoardWrite userData={userData} API_URI={API_URI} />} />
            <Route path="/modify/:id" element={<BoardModify userData={userData} API_URI={API_URI} />} />
        </Routes>
    )
}

export default Board;