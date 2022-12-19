import { Link } from "react-router-dom";

function Nav(){
    const search_bar = Document



    return(
        // Nav Start 
        <div class=" w-full h-20">
            <div class="navbar bg-base-100">
                <div class="flex-1">
                    <a href="/" class="btn btn-ghost normal-case text-3xl">어~떤가~요 🎤</a>
                    <div class="flex items-center justify-left w-full">
                    <label className="btn btn-ghost m-1 text-lg"> 공지사항 </label>
                    <div className="dropdown">
                        <label tabIndex={0} className="btn btn-ghost m-1 text-lg">음악 평가</label>
                        <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52">
                            <li><a href="/rating">음악</a></li>
                            <li><a href="/rating">신곡/발매예정</a></li>
                        </ul>
                    </div>
                    <div className="dropdown">
                        <label tabIndex={0} className="btn btn-ghost m-1 text-lg">자유게시판</label>
                        <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52">
                            <li><a href="/board">음악</a></li>
                            <li><a href="/board">신곡/발매예정</a></li>
                        </ul>
                    </div>
                    </div>
                </div>
                <div id="search_bar" className="form-control mr-11">
                    <input type="text" placeholder="검색해보세요!" className="input input-ghost w-full max-w-xs hidden" />
                </div>
                <div class="flex-none">
                    <label htmlFor="login-modal" className="btn btn-outline btn-success mx-1">로그인</label>
                    <label htmlFor="join-modal" className="btn btn-success mx-1">회원가입</label>
                </div>
            </div>


            {/* 로그인 모달 */}
        <form>
        <input type="checkbox" id="login-modal" className="modal-toggle" />
        <div className="modal modal-bottom sm:modal-middle">
            <div className="modal-box relative">
                <label htmlFor="login-modal" className="btn btn-sm btn-circle btn-outline absolute right-2 top-2">✕</label>
                <h3 className="font-bold text-3xl text-center m-5"> 로그인</h3>
                <div className="form-control w-full">
                    <label className="label">
                        <span className="label-text m-auto p-1 font-bold">ID를 입력해주세요.</span>
                    </label>
                    <input type="text" placeholder="ID" className="input input-bordered w-full max-w-xs m-auto" />
                    <label className="label">
                        <span className="label-text m-auto p-1 font-bold">비밀번호를 입력해주세요.</span>
                    </label>
                    <input type="password" placeholder="비밀번호" className="input input-bordered w-full max-w-xs m-auto" />
                    <label className="label">
                        <span className="label-text m-auto p-1 font-bold">비밀번호를 다시 한 번 입력해주세요.</span>
                    </label>
                    <input type="password" placeholder="비밀번호 확인" className="input input-bordered w-full max-w-xs m-auto" />
                </div>
                <div className="modal-action">
                    <button type="submit" htmlFor="login-modal" className="btn btn-outline btn-success">로그인</button>
                </div>
            </div>
        </div>
        </form>  

        {/* 회원가입 모달 */}
        <form>
        <input type="checkbox" id="join-modal" className="modal-toggle" />
        <div className="modal modal-bottom sm:modal-middle">
            <div className="modal-box relative">
                <label htmlFor="join-modal" className="btn btn-sm btn-circle btn-outline absolute right-2 top-2">✕</label>
                <h3 className="font-bold text-3xl text-center m-8"> 🎉 회원가입 🥳</h3>
                <div className="form-control w-full">
                    <label className="label">
                        <span className="label-text m-auto p-3">ID를 입력해주세요.</span>
                    </label>
                    <input type="text" placeholder="ID" className="input input-bordered w-full max-w-xs m-auto" />
                    <label className="label">
                        <span className="label-text m-auto p-3">비밀번호를 입력해주세요.</span>
                    </label>
                    <input type="password" placeholder="비밀번호" className="input input-bordered w-full max-w-xs m-auto" />
                    <label className="label">
                        <span className="label-text m-auto p-3">비밀번호를 다시 한 번 입력해주세요.</span>
                    </label>
                    <input type="password" placeholder="비밀번호 확인" className="input input-bordered w-full max-w-xs m-auto" />
                    <label className="label">
                        <span className="label-text m-auto p-3">이메일을 입력해주세요.</span>
                    </label>
                    <input type="email" placeholder="이메일" className="input input-bordered w-full max-w-xs m-auto" />
                </div>
                <div className="modal-action">
                    <button type="submit" className="btn btn-outline btn-success">가입</button>
                </div>
            </div>
        </div>
        </form>
    </div>

    // Nav End
    )
}

export default Nav;