import ModelCreateUser from "./ModelCreateUser";
import ModelViewUser from "./ModelViewUser";
import ModelEditUser from "./ModelEditUser";
import './ManageUser.scss'
import { FcPlus } from 'react-icons/fc';
import { useEffect, useState } from "react";
import { getListTableUser, getListTableUserPaginate } from "../../../services/apiServices";
import TableUser from "./TableUser";
import ModelDeleteUser from "./ModelDeleteUser";
import TableUserPaginate from "./TableUserPaginate";
const MangeUser = (props) => {
    const LIMIT_USER = 5;
    const [showModelCreateUser, setShowModelCreateUser] = useState(false);
    const [showModelEditUser, setShowModelEditUser] = useState(false);
    const [showModelViewUser, setShowModelViewUser] = useState(false);
    const [showModelDeleteUser, setShowModelDeleteUser] = useState(false);
    const [tableUser, setTableUser] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPage, setTotalPage] = useState(0);
    const [dataUser, setDataUser] = useState({})
    const listUser = async (number) => {
        let res = await getListTableUserPaginate(number, LIMIT_USER);
        if (res.EC === 0) {
            setTableUser(res.DT.users);
            setTotalPage(res.DT.totalPages)
        }
    }
    useEffect(() => {
        listUser(1);
    }, []);
    const getDataUserTable = (user) => {
        setDataUser(user)
    }
    return (
        <div className="manage-user-container">
            <div className="title">
                Quản lí Người dùng
            </div>
            <div className="user-content">
                <div className="btn-add-user">
                    <button className="btn btn-primary" onClick={() => { setShowModelCreateUser(true) }}> <FcPlus /> Thêm Người Dùng</button>
                </div>
                <div className="table-user-container">
                    {/* <TableUser
                        tableUser={tableUser}
                        setShowEdit={setShowModelEditUser}
                        getData={getDataUserTable}
                        setShowView={setShowModelViewUser}
                        setShowDelete={setShowModelDeleteUser}
                    /> */}
                    <TableUserPaginate
                        tableUserPaginate={tableUser}
                        setShowEdit={setShowModelEditUser}
                        getData={getDataUserTable}
                        setShowView={setShowModelViewUser}
                        setShowDelete={setShowModelDeleteUser}
                        setPage={setPage}
                        page={page}
                        totalPage={totalPage}
                        listUser={listUser}
                    />
                </div>
                <ModelCreateUser
                    show={showModelCreateUser}
                    setShow={setShowModelCreateUser}
                    setPage={setPage}
                    listUser={listUser}
                />
                <ModelViewUser
                    show={showModelViewUser}
                    setShow={setShowModelViewUser}
                    dataUser={dataUser}
                    reset={setDataUser}
                />
                <ModelEditUser
                    show={showModelEditUser}
                    setShow={setShowModelEditUser}
                    listUser={listUser}
                    dataUser={dataUser}
                    reset={setDataUser}
                    page={page}
                />
                <ModelDeleteUser
                    show={showModelDeleteUser}
                    setShow={setShowModelDeleteUser}
                    dataUser={dataUser}
                    setPage={setPage}
                    listUser={listUser}
                />
            </div>
        </div>
    )
}
export default MangeUser;