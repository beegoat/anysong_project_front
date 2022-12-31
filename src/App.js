import { useState, useEffect } from "react";
import {BrowserRouter as Router, Routes, Route, Redirect} from "react-router-dom";
import { withCookies, useCookies } from 'react-cookie';
import axios from "axios"


import Home from "./routes/Home";
import Rating from "./routes/Rating";
import Board from "./routes/Board";
import Login from "./routes/Login";
import Join from "./routes/Join";

import Nav from "./components/Nav";
import Footer from "./components/Footer";
import RateDetail from "./components/StarRating/RateDetail";





function App() {

    const [songs, setSongs] = useState([]);
    const [detailInfo, setDetailInfo] = useState([]);

    // DB에서 앨범 정보 불러오고 있음
    const getSongs = async () => {
        const response = await axios.get(
            `http://localhost:3001`, {});
            setSongs(response.data)
        }

    // 페이지 로딩되고 한 번만 DB 불러오도록 useEffect
    useEffect(() => {
        getSongs();
    }, []);

    // Rating에서 특정 앨범의 값 가져와서 detailInfo 값에 넣고, 이를 RateDetail에 전달중
    const setDrawerInfo = (id, title, artist, img) => {
        setDetailInfo({id, title, artist, img})
    }

    return (
        <div>
            <div>
                {/* <button onClick={getInfo}>ㅇㅅㅇ</button> */}
                <div className="drawer drawer-end -z-10">
                    <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
                    <div className="drawer-content">
            {/* <!-- Page content here --> */}
                    <Nav />
                        <Router>
                            <Routes>
                                <Route path="/" element={<Home />}/>
                            </Routes>
                            <Routes>
                                <Route path="/rating" element={
                                    <div>
                                            {songs.map(
                                                (songs) => (
                                                    <Rating
                                                        key={songs.index}
                                                        id={songs.id}
                                                        img_url={songs.image_url} 
                                                        title={songs.title} 
                                                        artist={songs.artist}
                                                        setDrawerInfo={setDrawerInfo}
                                                />)
                                            )}
                                    </div>
                                }/>
                            </Routes>
                            <Routes>
                                <Route path="/board/*" element={<Board />} />
                            </Routes>
                            <Routes>
                                <Route path="/getlogin" element={<Login />} />
                            </Routes>
                            <Routes>
                                <Route path="/getjoin" element={<Join />} />
                            </Routes>
                        </Router>
                        <Footer />
                    </div> 
                    <div className="drawer-side">
                        <label htmlFor="my-drawer-4" className="drawer-overlay"></label>
                        <ul className="menu p-4 w-1/3 bg-base-100 text-base-content">
                            {/* <!-- Sidebar content here --> */}
                            {detailInfo === [] ? null : 
                                <RateDetail
                                    detailInfo={detailInfo}
                                />
                            }
                        </ul>
                    </div>
                </div>
            </div> 
        </div>
    )
  }


export default App;