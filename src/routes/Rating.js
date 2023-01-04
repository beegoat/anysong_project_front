import { useEffect } from "react"

function Rating({id, img_url, title, artist, setDrawerInfo}){

    // RateDetail에 선택한 앨범 표시하기 위해 App.js로 값 넘김
    const sendInfo = () => {
        setDrawerInfo(id, title, artist, img_url)
    }

    return (

            <div className="card w-96 bg-base-100 shadow-xl inline-flex m-5">
                <figure><img src={img_url} alt="album_photo" /></figure>
                    <div className="card-body">
                    <h2 className="card-title">{title}</h2>
                    <p>{artist}</p>
                    <label htmlFor="my-drawer-4" className="drawer-button btn btn-primary" onClick={sendInfo}>평가하기</label>
                    <div className="card-actions justify-end">
                    </div>
                </div>
            </div>
    )
}

export default Rating;