import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";


function Home(){

    const [topRating, setTopRating] = useState([])

    const getTopRate = async() => {
        const response = await axios.get("http://localhost:3001/getTopRate")
        setTopRating(response.data)
    }

    useEffect(() => { 
    getTopRate()
    }, [])




    return(
    <div>
            <div className="w-full h-2/5">
                <img className="w-full h-full" src="img/mainbanner4.png" alt="banner"/>
            </div>
        
        <div className="w-4/5 m-auto">
            <div className="m-auto text-left font-bold text-4xl p-10"> 평가 </div>
                <div className="flex flex-col w-full lg:flex-row justify-evenly">
                    <div className="card card-compact w-1/5 h-1/5 bg-base-100 shadow-xl border">
                        <figure><Link to="/rating/albums"><img src="img/albumrate.png" alt="newReleased" /></Link></figure>
                    </div>
                    <div className="card card-compact w-1/5 h-1/5 bg-base-100 shadow-xl">
                        <figure><Link to="/rating/songs"><img src="img/musicrate.png" alt="musicRate" /></Link></figure>
                    </div>
            </div>
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
                        <tr>
                            <td>Cy Ganderton</td>
                            <td>2022-11-28</td>
                        </tr>
                        <tr>
                            <td>Hart Hagerty</td>
                            <td>2022-11-28</td>
                        </tr>
                        <tr>
                            <td>Tax Accountant</td>
                            <td>2022-11-28</td>
                        </tr>
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