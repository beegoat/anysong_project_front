function Pagination({ total, limit, page, setPage }) {
    // numPages는 총 게시물 개수를 한 페이지에 보여줄 글 개수로 나누어서, 올림한 것으로 페이지네이션 알고리즘 방법이다.
    // 총 페이지수를 의미한다.
  const numPages = Math.ceil(total / limit);

  return (
    <>
        {/* 첫 번째 페이지라면 Disabled */}
        {/* {page === 1 ? null : 
        <button className="btn" onClick={() => setPage(page - 1)} disabled={page === 1}>
        이전
        </button>} */}
        
        {/* 총 페이지 수 갯수만큼의 배열을 만들어서, 1부터 1씩 증가하는 배열을 리턴한다. */}
        {Array(numPages)
          .fill()
          .map((_, i) => (
            <button
              className="btn mx-1"
              key={i + 1}
            //   페이지수를 변경시켜서 Board의 page를 변경시켜 => offset값을 변경시켜, 보이는 글의 인덱스를 조정한다
              onClick={() => setPage(i + 1)}
              aria-current={page === i + 1 ? "page" : null}
            >
            {/* Array(numPages).fill().map((_,i) => {i+1}) */}
              {i + 1}
            </button>
          ))}
          {/* 마지막 페이지라면 Disabled */}
        {/* <button className="btn" onClick={() => setPage(page + 1)} disabled={page === numPages}>
          다음
        </button> */}
    </>
  );
}

export default Pagination;