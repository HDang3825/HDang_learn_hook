import ModelCreateUser from "./ModelCreateUser";
import './ManageUser.scss'
import { FcPlus } from 'react-icons/fc';
import { useState } from "react";
import { ToastContainer } from 'react-toastify';
const MangeUser = (props) => {
    const [showModelCreateUser, setShowModelCreateUser] = useState(false)
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
                    Danh sách người dùng
                </div>
                <ModelCreateUser show={showModelCreateUser} setShow={setShowModelCreateUser} />
            </div>
            <ToastContainer autoClose='3000' />
        </div>
    )
}
export default MangeUser;