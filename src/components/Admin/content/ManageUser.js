import ModelCreateUser from "./ModelCreateUser";
const MangeUser = (props) => {
    return (
        <div className="manage-user-container">
            <div className="title">
                Quản lí Người dùng
            </div>
            <div>
                <button>Thêm Người Dùng</button>
            </div>
            <div>
                Danh sách người dùng
                <ModelCreateUser />
            </div>
        </div>
    )
}
export default MangeUser;