import { useEffect } from "react";

function SongsGet({ id, title, artist, img_url, setDrawerInfo, isSong, isAlbum }){

    // RateDetail에 선택한 앨범 표시하기 위해 App.js로 값 넘김
    const sendInfo = () => {
        setDrawerInfo(id, title, artist, img_url, isSong, isAlbum)
    }


    return (
        <div className="card w-96 bg-base-100 shadow-xl inline-flex justify-center m-5">
            <figure><img src={img_url} alt="album_photo" /></figure>
                <div className="card-body">
                <h2 className="card-title justify-center overflow-hidden text-ellipsis whitespace-nowrap">{title}</h2>
                <h1 className="flex justify-center text-ellipsis">{artist}</h1>
                <label htmlFor="my-drawer-4" className="drawer-button btn btn-primary" onClick={sendInfo}>평가하기</label>
                <div className="card-actions justify-end">
                </div>
            </div>
        </div>
    )
}

export default SongsGet;