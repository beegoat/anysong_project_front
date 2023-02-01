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
import Mypage from "./routes/Mypage";
import SearchInfo from "./components/SearchInfo"


function App() {
    

    // const API_URI = 'localhost'
    // const API_URI = '43.201.140.172'
    const API_URI = '3.39.181.6'

    axios.defaults.withCredentials = true;


    const [userData, setUserData] = useState("");


    useEffect(() => {
        try{
            axios.post(`http://${API_URI}:3001/jwtauthcheck`, {withCredentials: true})
            .then((res) => {
                setUserData(res.data);
            })
        } catch(e) {
            console.error(e)
        }
    }, []);
    
    // 
    const [detailInfo, setDetailInfo] = useState([]);

    // Rating에서 특정 앨범의 값 가져와서 detailInfo 값에 넣고, 이를 RateDetail에 전달중
    const setDrawerInfo = (id, title, artist, img, isSong, isAlbum) => {
        setDetailInfo({id, title, artist, img, isSong, isAlbum})
    }

    return (
        
        <div className="w-full h-full">
            <div>
                <div className="drawer drawer-end -z-10">
                    <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
                    <div className="drawer-content">
            {/* <!-- Page content here --> */}
                    <Nav 
                        userData={userData}
                        setUserData={setUserData}
                        API_URI={API_URI}
                        />
                            <Routes>
                                <Route path="/" element={
                                <Home 
                                API_URI={API_URI}/>
                                }/>
                            </Routes>
                            <Routes>
                                <Route path="/rating/*" element={
                                <Rating 
                                    setDrawerInfo={setDrawerInfo}
                                    API_URI={API_URI} />
                                }/>
                            </Routes>
                            <Routes>
                                <Route path="/board/*" element={
                                <Board 
                                    userData={userData}
                                    API_URI={API_URI} />
                                }/>
                            </Routes>
                            <Routes>
                                <Route path="/mypage" element={
                                <Mypage
                                    userData={userData}
                                    setUserData={setUserData}
                                    API_URI={API_URI} />
                                }/>
                            </Routes>
                            <Routes>
                                <Route path="/searchinfo/:artist/:song" element={
                                    <SearchInfo 
                                    API_URI={API_URI} />
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
                                    API_URI={API_URI}
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