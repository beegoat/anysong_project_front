import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";


function Home(){

    const [topRating, setTopRating] = useState([])
    const [mainNotice, setMainNotice] = useState([])

    const getTopRate = async() => {
        const response = await axios.get('http://43.201.140.172/getTopRate')
        setTopRating(response.data)
    }

    const getNotice = async() => {
        const response = await axios.get('43.201.140.172/getnotice')
        setMainNotice(response.data[0])
    }

    useEffect(() => { 
    getTopRate()
    getNotice()
    }, [])


    return(
    <div className="w-full">
        <div className="carousel w-full h-full">
            <div id="slide1" className="carousel-item relative w-full">
                <img src="img/mainbanner4.png" className="w-full" />
                <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                <a href="#slide4" className="btn btn-circle btn-outline">❮</a> 
                <a href="#slide2" className="btn btn-circle btn-outline">❯</a>
                </div>
            </div> 
            <div id="slide2" className="carousel-item relative w-full">
                <img src="img/mainbanner3.png" className="w-full" />
                <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                <a href="#slide1" className="btn btn-circle btn-outline">❮</a> 
                <a href="#slide3" className="btn btn-circle btn-outline">❯</a>
                </div>
            </div> 
            <div id="slide3" className="carousel-item relative w-full">
                <img src="img/mainbanner2.png" className="w-full" />
                <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                <a href="#slide2" className="btn btn-circle btn-outline">❮</a> 
                <a href="#slide4" className="btn btn-circle btn-outline">❯</a>
                </div>
            </div> 
            <div id="slide4" className="carousel-item relative w-full">
                <img src="img/mainbanner1.png" className="w-full" />
                <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                <a href="#slide3" className="btn btn-circle btn-outline">❮</a> 
                <a href="#slide1" className="btn btn-circle btn-outline">❯</a>
                </div>
            </div>
        </div>
        
        <div className="flex justify-center">
            <div className="bg-ratingBackground bg-center" >
                <div className="m-auto text-left font-bold text-4xl p-10"> 평가 </div>
                    <div className="flex flex-col w-full lg:flex-row justify-evenly">
                        <div className="card card-compact w-1/5 h-1/5 bg-base-100">
                            <figure><Link to="/rating/albums"><img src="img/rate1.png" alt="newReleased" /></Link></figure>
                        </div>
                        <div className="card card-compact w-1/5 h-1/5 bg-base-100">
                            <figure><Link to="/rating/songs"><img src="img/rate2.png" alt="musicRate" /></Link></figure>
                        </div>
                </div>
            </div>
            <div>
                <div className="m-auto text-left font-bold text-4xl p-10"> 오늘의 명반 </div>
                <div className="flex flex-col w-full lg:flex-row justify-evenly">
                    <div className="card w-80 bg-base-100 shadow-xl image-full">
                        <figure><img src={topRating.albumUrl} alt="album" /></figure>
                        <div className="card-body">
                            <h2 className="card-title">{topRating.albumTitle}</h2>
                            <p>{topRating.albumArtist}</p>
                            <div className="card-actions justify-end">
                            <button className="btn btn-primary">평점 {topRating.albumRate}</button>
                            </div>
                        </div>
                    </div>
                    <div className="card w-80 bg-base-100 shadow-xl image-full">
                        <figure><img src={topRating.songUrl} alt="song" /></figure>
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
        </div>

        <div>
            <div className="m-auto text-left font-bold text-4xl p-10"> 공지사항 </div>
                <div className="flex flex-col w-full lg:flex-row">
                    <div className="w-2/3">
                        <table className="table w-full text-center">
                            <thead>
                                <tr>
                                    <th>공지사항</th>
                                    <th>날짜</th>
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
                <div className="grid flex-grow h-40 card bg-base-300 rounded-box place-items-center">content</div>
            </div>
        </div>
    </div>
    )
}

export default Home;