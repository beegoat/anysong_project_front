import { Link } from "react-router-dom";

function Home(){
    return(
    <div>
            <div className="w-full h-96">
                <img className="w-full h-full" src="img/banner.png" alt="banner"/>
            </div>
        
        <div class="w-4/5 m-auto">
            <div className="m-auto text-left font-bold text-4xl p-10"> 평가 </div>
                <div className="flex flex-col w-full lg:flex-row justify-evenly">
                    <div className="card card-compact w-2/5 bg-base-100 shadow-xl">
                        <figure><Link to="/rating"><img src="https://placeimg.com/400/225/arch" alt="Shoes" /></Link></figure>
                        <div className="card-body">
                            <h2 className="text-center text-3xl font-bold"> 신곡 / 발매예정 </h2>
                            <p className="text-center">새로 발매된 음악과 💿 <br/>발매예정 음악 ⏰<br/> 평가해보세요! ⭐️</p>
                            <div className="card-actions justify-end">
                            </div>
                        </div>
                    </div>
                    <div className="card card-compact w-2/5 bg-base-100 shadow-xl">
                        <figure><Link to="/rating"><img src="https://placeimg.com/400/225/arch" alt="Shoes" /></Link></figure>
                        <div className="card-body">
                            <h2 className="text-center text-3xl font-bold"> 음악 </h2>
                            <p className="text-center">🔥 최신 노래부터 😎<br/>🍃 추억의 노래까지 😌<br/> 내 점수는 몇 점? ⭐️</p>
                            <div className="card-actions justify-end">
                            </div>
                        </div>
                    </div>
            </div>
            <div className="m-auto text-left font-bold text-4xl p-10"> 오늘의 명반 </div>
            <div className="flex flex-col w-full lg:flex-row justify-evenly">
            <div className="card w-80 bg-base-100 shadow-xl image-full">
                <figure><img src="https://placeimg.com/400/225/arch" alt="Shoes" /></figure>
                <div className="card-body">
                    <h2 className="card-title">Shoes!</h2>
                    <p>If a dog chews shoes whose shoes does he choose?</p>
                    <div className="card-actions justify-end">
                    <button className="btn btn-primary">Buy Now</button>
                    </div>
                </div>
            </div>
            <div className="card w-80 bg-base-100 shadow-xl image-full">
                <figure><img src="https://placeimg.com/400/225/arch" alt="Shoes" /></figure>
                <div className="card-body">
                    <h2 className="card-title">Shoes!</h2>
                    <p>If a dog chews shoes whose shoes does he choose?</p>
                    <div className="card-actions justify-end">
                    <button className="btn btn-primary">Buy Now</button>
                    </div>
                </div>
            </div>
            <div className="card w-80 bg-base-100 shadow-xl image-full">
                <figure><img src="https://placeimg.com/400/225/arch" alt="Shoes" /></figure>
                <div className="card-body">
                    <h2 className="card-title">Shoes!</h2>
                    <p>If a dog chews shoes whose shoes does he choose?</p>
                    <div className="card-actions justify-end">
                    <button className="btn btn-primary">Buy Now</button>
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