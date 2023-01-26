import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";


function SearchMusic(){

    const [searchWord, setSearchWord] = useState("")
    const [searchedMusic, setSearchedMusic] = useState([])
 
    const API_KEY = "e35e27f252f8e4498dabac2591997ed0"
    const API_URL = `http://ws.audioscrobbler.com/2.0/?method=track.search&track=Believe&api_key=${API_KEY}&format=json`

    const onChange = (e) => {
        setSearchWord(e.target.value)
    }

    const getMusicByWord = async() => {
        const response = await axios.get('http://localhost:3001/musicsearch', {
            params : {
                searchWord : searchWord
            }
        })
        setSearchedMusic(response.data)
    }

    useEffect(() => {
        getMusicByWord()
    }, [searchWord])

    return (
        <div>
            <input type="text" placeholder="search Here" className="input w-full max-w-xs"
            onChange={onChange} value={searchWord}
            />
            <div className="dropdown dropdwon-bottom dropdown-open">
                <ul tabIndex={0} className="dropdown-content menu shadow bg-base-100 rounded-box">
                    {searchedMusic.map((music) => {
                        return(
                            <div className="w-72">
                                <Link to={`/searchinfo/${music.artist}/${music.song}`}>
                                    <li className="inline-block">{music.image_url? <img className="w-20 h-20" src={music.image_url} alt="albumImg"></img> : <img className="w-20 h-20" src="img/no_album_img.png" alt="albumImg"></img>}</li>
                                    <div className="inline-block">
                                        <li className="block">{music.song}</li>
                                        <li className="block">{music.artist}</li>
                                    </div>
                                </Link>
                            </div>
                        )
                    })}
                </ul>
            </div>
        </div>


    )
}

export default SearchMusic;