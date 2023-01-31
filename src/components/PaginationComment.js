function PaginationComment({ total, limit, page, setPage }) {
    // numPages는 총 게시물 개수를 한 페이지에 보여줄 글 개수로 나누어서, 올림한 것으로 페이지네이션 알고리즘 방법이다.
    // 총 페이지수를 의미한다.
  const numPages = Math.ceil(total / limit);

  return (
    <>
    <div className="w-full h-14">
        <div className="flex justify-end mt-3">
            {page === 1 ? <button className="mx-1 bg-white" /> : 
            <button className="mx-1" onClick={() => setPage(page - 1)}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-10 h-10">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M11.25 9l-3 3m0 0l3 3m-3-3h7.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            </button>}

            {page === numPages ? <button className="mx-1 bg-white" />  :
            <button className="mx-1" onClick={() => setPage(page + 1)}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-10 h-10">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12.75 15l3-3m0 0l-3-3m3 3h-7.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            </button>}
        </div>
    </div>
    </>
  );
}

export default PaginationComment;