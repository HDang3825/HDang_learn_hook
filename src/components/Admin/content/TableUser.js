const TableUser = (props) => {
    const { tableUser, setShowEdit, getData, setShowView, setShowDelete } = props;
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
                    {tableUser && tableUser.length > 0 &&
                        tableUser.map((item, index) => {
                            return (
                                <tr key={`table-user-${index + 1}`}>
                                    <td>{item.id}</td>
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
                    {tableUser && tableUser.length === 0 &&
                        <tr>
                            <td colSpan={'5'} style={{ padding: '20px 35%' }}>Chưa có người dùng!!!</td>
                        </tr>
                    }
                </tbody>
            </table>
        </>
    )
}
export default TableUser;