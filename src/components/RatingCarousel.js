import { Children } from "react";


function RatingCarousel({ children, total, limit, page, setPage }) {
    // numPages는 총 게시물 개수를 한 페이지에 보여줄 글 개수로 나누어서, 올림한 것으로 페이지네이션 알고리즘 방법이다.
    // 총 페이지수를 의미한다.
  const numPages = Math.ceil(total / limit);

  return (
    <>
        {/* 첫 번째 페이지라면 Disabled */}
        <div className="inline-block w-1/6 h-full mt-auto mb-auto">
            {page === 1 ?(
            <label className="w-40 ml-5">
                <img className="w-40 ml-5" src="../img/leftDisabled.png" alt="leftArrow"></img>
            </label>):
            <label className="w-40 ml-5" onClick={() => setPage(page - 1)} disabled={page === 1}>
                <img className="w-40 ml-5" src="../img/left.png" alt="leftArrow"></img>
            </label>}
        </div>
        {/* 총 페이지 수 갯수만큼의 배열을 만들어서, 1부터 1씩 증가하는 배열을 리턴한다. */}
        {children}
          {/* 마지막 페이지라면 Disabled */}
          <div className="inline-block w-1/6 h-full mt-auto mb-auto">
            {page === numPages - 1 ?(
            <label className="w-40 ml-5">
                <img className="w-40 mr-5" src="../img/rightDisabled.png" alt="rightArrow"></img>
            </label>):
            <label className="w-40 ml-5" onClick={() => setPage(page + 1)}>
                <img className="w-40 mr-5" src="../img/right.png" alt="rightArrow"></img>
            </label>}
        </div>
    </>
  );
}

export default RatingCarousel;