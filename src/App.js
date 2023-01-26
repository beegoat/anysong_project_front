import { useState, useEffect } from "react";
import {BrowserRouter as Router, Routes, Route, useNavigate, Link} from "react-router-dom";
import { withCookies, useCookies } from 'react-cookie';
import axios from "axios"


import Home from "./routes/Home";
import Rating from "./routes/Rating";
import Board from "./routes/Board";

import Nav from "./components/Nav";
import Footer from "./components/Footer";
import RateDetail from "./components/StarRating/RateDetail";
import Mypage from "./components/Mypage";
import SearchInfo from "./components/SearchInfo"


function App() {

    const [userData, setUserData] = useState("");

    useEffect(() => {
        axios.post("http://localhost:3001/jwtauthcheck")
        .then((res) => {
            setUserData(res.data);
        })
    }, []);
    
    // 
    const [detailInfo, setDetailInfo] = useState([]);

    // Rating에서 특정 앨범의 값 가져와서 detailInfo 값에 넣고, 이를 RateDetail에 전달중
    const setDrawerInfo = (id, title, artist, img, isSong, isAlbum) => {
        setDetailInfo({id, title, artist, img, isSong, isAlbum})
    }

    return (
        
        <div>
            <div>
                <div className="drawer drawer-end -z-10">
                    <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
                    <div className="drawer-content">
            {/* <!-- Page content here --> */}
                    <Nav 
                        userData={userData}
                        />
                            <Routes>
                                <Route path="/" element={<Home />}/>
                            </Routes>
                            <Routes>
                                <Route path="/rating/*" element={
                                <Rating 
                                    setDrawerInfo={setDrawerInfo} />
                                }/>
                            </Routes>
                            <Routes>
                                <Route path="/board/*" element={
                                <Board 
                                    userData={userData}/>
                                }/>
                            </Routes>
                            <Routes>
                                <Route path="/mypage" element={
                                <Mypage
                                    userData={userData}/>
                                }/>
                            </Routes>
                            <Routes>
                                <Route path="/searchinfo/:artist/:song" element={
                                    <SearchInfo />
                                }/>
                            </Routes>
                        <Footer />
                    </div> 
                    <div className="drawer-side">
                        <label htmlFor="my-drawer-4" className="drawer-overlay"></label>
                        <ul className="menu p-4 w-1/3 bg-base-100 text-base-content">
                            {/* <!-- Sidebar content here --> */}
                            {detailInfo === [] ? null : 
                                <RateDetail
                                    detailInfo={detailInfo}
                                    userData={userData}
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