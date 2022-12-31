import { Routes, Route } from "react-router-dom";

import BoardGet from "../components/Board/BoardGet";
import BoardDetails from "../components/Board/BoardDetails";
import BoardWrite from "../components/Board/BoardWrite";
import BoardModify from "../components/Board/BoardModify";

function Board(){
    return(
        <Routes>
            <Route exact path="" element={<BoardGet boardName={"total"}/>} />
            <Route path="/songreview" element={<BoardGet boardName={"songreview"}/>} />
            <Route path="/albumreview" element={<BoardGet boardName={"albumreview"}/>} />
            <Route path="/talk" element={<BoardGet boardName={"talk"}/>} />
            <Route path="/question" element={<BoardGet boardName={"question"}/>} />
            <Route path="/:id/:location" element={<BoardDetails />} />
            <Route path="/:id" element={<BoardDetails />} />
            <Route path="/write" element={<BoardWrite />} />
            <Route path="/modify/:id" element={<BoardModify />} />
        </Routes>
    )
}

export default Board;