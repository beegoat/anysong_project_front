import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";


function Home( { API_URI }){

    const [topRating, setTopRating] = useState([])
    const [mainNotice, setMainNotice] = useState([])

    const getTopRate = async() => {
        const response = await axios.get(`http://${API_URI}:3001/getTopRate`)
        console.log(response)
        setTopRating(response.data)
    }

    const getNotice = async() => {
        const response = await axios.get(`http://${API_URI}:3001/getnotice`)
        setMainNotice(response.data[0])
    }

    useEffect(() => { 
    getTopRate()
    getNotice()
    }, [])


    return(
    <div className="w-full h-2493">

        <div className="w-full h-696 mx-auto mt-120 mb-inter bg-gradient-to-r from-blue-200 to-purple-200 flex flex-col justify-center items-center">
            <div className="text-9xl font-serif font-extrabold mb-12">AnySong</div>
            <div className="text-3xl ">어떤 노래도</div>
            <div className="text-3xl">당신의 노래가 되는 곳</div>

        </div>

        {/* <div className="carousel w-full h-696 mx-auto mt-120 mb-inter">
            <div id="slide1" className="carousel-item relative w-full">
                <img src="img/mainbanner4.png" className="w-fit h-fit" />
                <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                <a href="#slide4" className="btn btn-circle btn-outline cursor-pointer">❮</a> 
                <a href="#slide2" className="btn btn-circle btn-outline cursor-pointer">❯</a>
                </div>
            </div> 
            <div id="slide2" className="carousel-item relative w-full">
                <img src="img/mainbanner3.png" className="w-full h-full" />
                <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                <a href="#slide1" className="btn btn-circle btn-outline">❮</a> 
                <a href="#slide3" className="btn btn-circle btn-outline">❯</a>
                </div>
            </div> 
            <div id="slide3" className="carousel-item relative w-full">
                <img src="img/mainbanner2.png" className="w-full h-full" />
                <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                <a href="#slide2" className="btn btn-circle btn-outline">❮</a> 
                <a href="#slide4" className="btn btn-circle btn-outline">❯</a>
                </div>
            </div> 
            <div id="slide4" className="carousel-item relative w-full">
                <img src="img/mainbanner1.png" className="w-full h-full" />
                <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                <a href="#slide3" className="btn btn-circle btn-outline">❮</a> 
                <a href="#slide1" className="btn btn-circle btn-outline">❯</a>
                </div>
            </div>
        </div> */}
        
        
        <div className="w-1464 h-576 mx-auto mb-inter">
            <div className="flex justify-center">
                <div className="w-2/3">
                    <img src="img/ratingbanner2.png"></img>
                </div>
                <div className="w-1/3 flex flex-col justify-center items-end">
                    <div className="w-3/4 h-24 btn btn-outline mb-4 text-3xl "><figure><Link to="/rating/albums">앨범 평가</Link></figure> </div>
                    <div className="w-3/4 h-24 btn btn-outline mt-4 text-3xl "><figure><Link to="/rating/songs">음원 평가</Link></figure> </div>
                </div>
            </div>
        </div>

        <div className="divider mb-inter"></div> 

        <div className="w-1464 h-576 mx-auto">
            <div className="flex justify-center">
                <div className="w-1/2">
                    {/* <div className="m-auto text-left font-bold text-4xl p-10"> 오늘의 명반 </div> */}
                    <div className="h-full flex justify-between">
                        <div className="w-1/2 h-full bg-base-100 shadow-xl image-full mr-5">
                            <figure><img className="w-full" src={topRating.albumUrl} alt="album" /></figure>
                            <div className="card-body">
                                <h2 className="card-title">{topRating.albumTitle}</h2>
                                <p>{topRating.albumArtist}</p>
                                <div className="card-actions justify-end">
                                    <button className="btn btn-primary">평점 {topRating.albumRate}</button>
                                </div>
                            </div>
                        </div>
                        <div className="w-1/2 h-full bg-base-100 shadow-xl image-full ml-5">
                            <figure><img className="w-full" src={topRating.songUrl} alt="song" /></figure>
                            <div className="card-body">
                                <h2 className="card-title">{topRating.songTitle}</h2>
                                <p>{topRating.songArtist}</p>
                                <div className="card-actions justify-end">
                                    <button className="btn btn-primary">평점 {topRating.songRate}</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="w-1/2">
                    <img src="img/topratingNow.png"></img>
                </div>
            </div>
        </div>

        <div className="divider"></div>

        <div className="w-1464 h-576 mx-auto mb-inter">
        <div>
            <div className="flex items-center">
                <div className="flex justify-center w-2/3 font-bold text-4xl p-10"> 공지사항 </div>
                <div className="flex justify-center w-1/3 font-bold text-4xl p-10"> 스트리밍 사이트 </div>
            </div>
                <div className="flex flex-col w-full lg:flex-row">
                    <div className="w-2/3">
                        <table className="table w-full text-center">
                            <thead>
                                <tr>
                                    <th className="text-xl">공지사항</th>
                                    <th className="text-xl">날짜</th>
                                </tr>
                            </thead>
                            <tbody>
                                {mainNotice.map((notice) => {
                                    return(
                                        <tr>
                                            <td><Link to={`/board/${notice.id}/notice`}>{notice.subject}</Link></td>
                                            <td>{notice.date}</td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                        </div>
                <div className="divider lg:divider-horizontal"></div>
                <div className="w-1/3 flex flex-col">
                    {/* <div className="flex justify-center  p-4">
                        <div className="text-2xl">인기 스트리밍 사이트</div>
                    </div> */}
                    <div>
                        <div className="flex flex-col">
                            <div className="h-1/2 flex items-center border-b-black mt-3 mb-7 p-2">
                                <div className="tooltip flex justify-center items-center w-1/2 h-full" data-tip="유투브">
                                   <div className="w-2/3"><a href="https://youtube.com"><img className="w-1/2 m-auto" src="img/youtube-logo.png" alt="유투브"/></a></div>
                                </div>
                                <div className="tooltip flex justify-center items-center w-1/2 h-full" data-tip="빌보드">
                                    <div className="w-2/3"><a href="https://www.billboard.com/charts/hot-100/"><img className="w-fit" src="img/billboard-logo.png" alt="빌보드"/></a></div>
                                </div>
                                <div className="tooltip flex justify-center items-center w-1/2 h-full" data-tip="스포티파이">
                                    <div className="w-2/3"><a href="https://www.spotify.com/kr-ko/"><img className="w-fit" src="img/spotify-logo.png" alt="스포티파이"/></a></div>
                                </div>
                            </div>
                            <div className="h-1/2 flex items-center mt-7 p-2">
                                <div className="tooltip flex justify-center items-center w-1/2 h-full" data-tip="멜론">
                                    <div className="w-2/3"><a href="https://www.melon.com/"><img className="w-fit" src="img/melon-logo.png" alt="멜론"/></a></div>
                                </div>
                                <div className="tooltip flex justify-center items-center w-1/2 h-full" data-tip="지니">
                                    <div className="w-2/3"><a href="https://genie.co.kr/"><img className="w-fit" src="img/genie-logo.png" alt="지니"/></a></div>
                                </div>
                                <div className="tooltip flex justify-center items-center w-1/2 h-full" data-tip="벅스">
                                    <div className="w-2/3"><a href="https://music.bugs.co.kr/"><img className="w-fit" src="img/bugs-logo.png" alt="벅스"/></a></div>
                                </div>
                            </div>
                        </div> 
                    </div>
                </div>
            </div>
        </div>
        </div>
        
    </div>
    )
}

export default Home;