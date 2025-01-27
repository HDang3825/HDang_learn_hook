import ModelCreateUser from "./ModelCreateUser";
import ModelViewUser from "./ModelViewUser";
import ModelEditUser from "./ModelEditUser";
import './ManageUser.scss'
import { FcPlus } from 'react-icons/fc';
import { useEffect, useState } from "react";
import { getListTableUser } from "../../../services/apiServices";
import { ToastContainer } from 'react-toastify';
import TableUser from "./TableUser";
import ModelDeleteUser from "./ModelDeleteUser";
const MangeUser = (props) => {
    const [showModelCreateUser, setShowModelCreateUser] = useState(false);
    const [showModelEditUser, setShowModelEditUser] = useState(false);
    const [showModelViewUser, setShowModelViewUser] = useState(false);
    const [showModelDeleteUser, setShowModelDeleteUser] = useState(false);
    const [tableUser, setTableUser] = useState([]);
    const [dataUser, setDataUser] = useState({})
    const listUser = async () => {
        let res = await getListTableUser();
        if (res.EC === 0) {
            setTableUser(res.DT);
        }
    }
    useEffect(() => {
        listUser();
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
                    <TableUser
                        tableUser={tableUser}
                        setShowEdit={setShowModelEditUser}
                        getData={getDataUserTable}
                        setShowView={setShowModelViewUser}
                        setShowDelete={setShowModelDeleteUser}
                    />
                </div>
                <ModelCreateUser
                    show={showModelCreateUser}
                    setShow={setShowModelCreateUser}
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
                />
                <ModelDeleteUser
                    show={showModelDeleteUser}
                    setShow={setShowModelDeleteUser}
                    listUser={listUser}
                    dataUser={dataUser}
                />
            </div>
            <ToastContainer autoClose='3000' />
        </div>
    )
}
export default MangeUser;