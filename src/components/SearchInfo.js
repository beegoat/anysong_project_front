import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";


function SearchInfo(){

    const { artist, song } = useParams()
    const [musicInfo, setMusicInfo] = useState([])

    const getMusicInfo = async() => {
        const response = await axios.get('http://43.201.140.172:3001/searchinfo', {
            params : {
                artist : artist,
                song : song
            }
        })
        setMusicInfo(response.data[0])
    }

    useEffect(() => {
        getMusicInfo()
    }, [artist, song])


    


    return(
        <>
        <div><img src={musicInfo.albumCover} alt="albumCover"></img></div>
        <div>{musicInfo.songTitle}</div>
        <div>{musicInfo.songArtist}</div>
        <div>{musicInfo.albumTitle}</div>
        <div>{musicInfo.publishedData}</div>
        {/* <div>{musicInfo.songTags[0]}</div> */}
        <div>{musicInfo.songIntroduction}</div>
        </>
    )
}

export default SearchInfo;