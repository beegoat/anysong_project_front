import axios from "axios";
import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";

import SongsGet from "../components/SongsGet";
import RatingCarousel from "../components/RatingCarousel";

function Rating({ setDrawerInfo }){
    const [songs, setSongs] = useState([]);
    const [albums, setAlbums] = useState([]);

    const [limit, setLimit] = useState(6);
    const [page, setPage] = useState(1);
    const offset = (page - 1) * limit

    const getMusicInfo = async () => {
        const getSongs = await axios.get(
            'http://43.201.140.172:3001/songs', {});
        setSongs(getSongs.data)
        const getAlbums = await axios.get(
            'http://43.201.140.172:3001/albums', {});
        setAlbums(getAlbums.data)
    }

    useEffect(() => {
        getMusicInfo()
    }, [])
    
    return(
        <Routes>
            <Route path="/songs" element={
                <div className="flex">
                <RatingCarousel 
                    total={songs.length}
                    limit={limit}
                    page={page}
                    setPage={setPage}
                >
                <div className="flex flex-wrap justify-center">
                    {songs.slice(offset, offset + limit).map(
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
                </RatingCarousel>
                </div>
            }/>
            <Route path="/albums" element={
                <div className="flex">
                <RatingCarousel 
                    total={albums.length}
                    limit={limit}
                    page={page}
                    setPage={setPage}>
                <div className="flex flex-wrap justify-center">
                    {albums.slice(offset, offset + limit).map(
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
                </RatingCarousel>
            </div>
            }/>
        </Routes>
    )
}

export default Rating;