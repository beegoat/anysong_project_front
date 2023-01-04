import { Routes, Route } from "react-router-dom";

import BoardGet from "../components/Board/BoardGet";
import BoardDetails from "../components/Board/BoardDetails";
import BoardWrite from "../components/Board/BoardWrite";
import BoardModify from "../components/Board/BoardModify";

function Board({ userData }){
    return(
        <Routes>
            <Route exact path="" element={<BoardGet boardName={"total"} userData={userData}/>} />
            <Route path="/songreview" element={<BoardGet boardName={"songreview"} userData={userData}/>} />
            <Route path="/albumreview" element={<BoardGet boardName={"albumreview"} userData={userData}/>} />
            <Route path="/talk" element={<BoardGet boardName={"talk"} userData={userData}/>} />
            <Route path="/question" element={<BoardGet boardName={"question"} userData={userData}/>} />
            <Route path="/:id/:location" element={<BoardDetails userData={userData} />} />
            <Route path="/:id" element={<BoardDetails userData={userData} />} />
            <Route path="/write" element={<BoardWrite userData={userData} />} />
            <Route path="/modify/:id" element={<BoardModify userData={userData} />} />
        </Routes>
    )
}

export default Board;