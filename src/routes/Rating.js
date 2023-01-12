import axios from "axios";
import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";

import SongsGet from "../components/SongsGet";

function Rating({ setDrawerInfo }){
    const [songs, setSongs] = useState([]);
    const [albums, setAlbums] = useState([]);

    const getMusicInfo = async () => {
        const getSongs = await axios.get(
            'http://localhost:3001/songs', {});
        setSongs(getSongs.data)
        const getAlbums = await axios.get(
            'http://localhost:3001/albums', {});
        setAlbums(getAlbums.data)
    }

    useEffect(() => {
        getMusicInfo()
    }, [])
    
    return(
        <Routes>
            <Route path="/songs" element={
                <div>
                    {songs.map(
                        (song) => (
                            <SongsGet
                                key={song.index}
                                id={song.id}
                                img_url={song.image_url}
                                title={song.title}
                                artist={song.artist}
                                setDrawerInfo={setDrawerInfo}
                                isSong={true}
                                isAlbum={false}
                        />)
                    )}
                </div>
            }/>
            <Route path="/albums" element={
                <div>
                    {albums.map(
                        (album) => (
                            <SongsGet
                                key={album.index}
                                id={album.id}
                                img_url={album.image_url}
                                title={album.title}
                                artist={album.artist}
                                setDrawerInfo={setDrawerInfo}
                                isSong={false}
                                isAlbum={true}
                        />)
                    )}
                </div>
            }/>
        </Routes>
    )
}

export default Rating;