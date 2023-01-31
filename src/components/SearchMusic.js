import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";


function SearchMusic({ API_URI }){

    const [searchWord, setSearchWord] = useState("")
    const [searchedMusic, setSearchedMusic] = useState([])
 
    const onChange = (e) => {
        setSearchWord(e.target.value)
    }

    const getMusicByWord = async() => {
        const response = await axios.get(`http://${API_URI}:3001/musicsearch`, {
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
            <input type="text text" placeholder="궁금한 음악을 검색해보세요 !" className="input w-full max-w-xs p-0"
            onChange={onChange} value={searchWord}
            />
            <div className="dropdown dropdwon-bottom dropdown-open">
                <ul tabIndex={0} className="dropdown-content menu shadow bg-base-100 rounded-box">
                    {searchedMusic.map((music) => {
                        return(
                            <div className="w-72">
                                <Link to={`/searchinfo/${music.artist}/${music.song}`}>
                                <label onClick={()=> {setSearchWord("")}}>
                                    <li className="inline-block">{music.image_url? <img className="w-20 h-20" src={music.image_url} alt="albumImg"></img> : <img className="w-20 h-20" src="img/no_album_img.png" alt="albumImg"></img>}</li>
                                    <div className="inline-block">
                                        <li className="block">{music.song}</li>
                                        <li className="block">{music.artist}</li>
                                    </div>
                                </label>
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