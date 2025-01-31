import ReactPaginate from "react-paginate";

const TableUserPaginate = (props) => {
    const { tableUserPaginate, setShowEdit, getData, setShowView, setShowDelete, setPage, totalPage, page, listUser } = props;
    const handlePageClick = (event) => {
        setPage(+event.selected + 1);
        listUser(+event.selected + 1);
    };
    const handleClickEdit = (item) => {
        getData(item);
        setShowEdit(true);
    }
    const handleClickView = (item) => {
        getData(item);
        setShowView(true);
    }
    const handleClickDelete = (item) => {
        getData(item);
        setShowDelete(true);
    }
    return (
        <>
            <table className="table table-hover table-bordered">
                <thead>
                    <tr>
                        <th scope="col">STT</th>
                        <th scope="col">Email</th>
                        <th scope="col">Tên</th>
                        <th scope="col">Vai Trò</th>
                        <th scope="col"> Tùy Chọn </th>
                    </tr>
                </thead>
                <tbody>
                    {tableUserPaginate && tableUserPaginate.length > 0 &&
                        tableUserPaginate.map((item, index) => {
                            return (
                                <tr key={`table-user-${item.id}`}>
                                    <td>{index + 1}</td>
                                    <td>{item.email}</td>
                                    <td>{item.username}</td>
                                    <td>{item.role}</td>
                                    <td>
                                        <button className="btn btn-info" onClick={() => handleClickView(item)}> Chi Tiết </button>
                                        <button className="btn btn-warning mx-2" onClick={() => handleClickEdit(item)}>Sửa</button>
                                        <button className="btn btn-danger" onClick={() => handleClickDelete(item)}>Xóa</button>
                                    </td>
                                </tr>
                            )
                        })
                    }
                    {tableUserPaginate && tableUserPaginate.length === 0 &&
                        <tr>
                            <td colSpan={'5'} style={{ padding: '20px 35%' }}>Chưa có người dùng!!!</td>
                        </tr>
                    }
                </tbody>
            </table>
            <div className="d-flex justify-content-center">
                <ReactPaginate
                    nextLabel="Sau >"
                    onPageChange={handlePageClick}
                    pageRangeDisplayed={3}
                    marginPagesDisplayed={2}
                    pageCount={totalPage}
                    previousLabel="< Trước"
                    pageClassName="page-item"
                    pageLinkClassName="page-link"
                    previousClassName="page-item"
                    previousLinkClassName="page-link"
                    nextClassName="page-item"
                    nextLinkClassName="page-link"
                    breakLabel="..."
                    breakClassName="page-item"
                    breakLinkClassName="page-link"
                    containerClassName="pagination"
                    activeClassName="active"
                    renderOnZeroPageCount={null}
                    forcePage={page - 1}
                />
            </div>
        </>
    )
}
export default TableUserPaginate;