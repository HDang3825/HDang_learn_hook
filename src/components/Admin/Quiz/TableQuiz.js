import { useEffect, useState } from "react";
import { deleteQuizForAdmin, getAllQuizForAdmin, putEditQuiz } from "../../../services/apiServices";
import { toast } from "react-toastify";
import ModelDeleteQuiz from "./ModelDeleteQuiz";
import ModelEditQuiz from "./ModelEditQuiz";
const TableQuiz = (props) => {
    const [listQuiz, setListQuiz] = useState([]);
    const [deleteId, setDeleteId] = useState('');
    const [deleteName, setDeleteName] = useState('');
    const [showModelDelete, setShowModelDelete] = useState(false);
    const [showModelEdit, setShowModelEdit] = useState(false);
    const [dataEditQuiz, setDataEditQuiz] = useState({})
    const fetchQuiz = async () => {
        let res = await getAllQuizForAdmin();
        if (res && res.EC === 0) {
            setListQuiz(res.DT)
        }
    }
    useEffect(() => {
        fetchQuiz();
    }, []);
    const deleteQuiz = async (id) => {
        let res = await deleteQuizForAdmin(id)
        if (res && res.EC === 0) {
            fetchQuiz();
            toast.info('Đã xóa bài Quiz!')
        }
    }
    const editQuiz = async (id, description, name, difficulty, image) => {
        let res = await putEditQuiz(id, description, name, difficulty, image)
        if (res && res.EC === 0) {
            toast.success('Cập nhật thành công!')
            fetchQuiz();
        }
        else {
            toast.error(res.EM)
        }
    }
    const handleClickDelete = (item) => {
        if (item && item.id) {
            setDeleteId(item.id)
            setDeleteName(item.name)
            setShowModelDelete(true);
        }
    }
    const handleClickEdit = (item) => {
        if (item && item.id) {
            setShowModelEdit(true);
            setDataEditQuiz(item);
        }
    }
    return (
        <>
            <div className="h4">
                Danh Sách Bài Quiz:
            </div>
            <table className="table table-hover table-bordered my-3">
                <thead>
                    <tr>
                        <th scope="col">STT</th>
                        <th scope="col">Tên</th>
                        <th scope="col">Miêu Tả</th>
                        <th scope="col">Độ Khó</th>
                        <th scope="col">Tùy Chọn</th>
                    </tr>
                </thead>
                <tbody>
                    {listQuiz && listQuiz.length > 0 &&
                        listQuiz.map((item, index) => {
                            return (
                                <tr key={`table-qiuz-${item.id}`}>
                                    <td>{index + 1}</td>
                                    <td>{item.name}</td>
                                    <td>{item.description}</td>
                                    <td>
                                        {item.difficulty === 'EASY' ? 'Dễ'
                                            : item.difficulty === 'MEDIUM' ? 'Trung Bình'
                                                : item.difficulty === 'HARD' ? 'Khó'
                                                    : 'Chưa xác định'}</td>
                                    <td>
                                        <button className="btn btn-warning mx-2" onClick={() => { handleClickEdit(item) }}>Sửa</button>
                                        <button className="btn btn-danger" onClick={() => { handleClickDelete(item) }} >Xóa</button>
                                    </td>
                                </tr>
                            )
                        })
                    }
                    {listQuiz && listQuiz.length === 0 &&
                        <tr>
                            <td colSpan={'5'} style={{ padding: '20px 35%' }}>Chưa có bài Quiz nào!!!</td>
                        </tr>
                    }
                </tbody>
            </table>
            <ModelDeleteQuiz
                show={showModelDelete}
                setShow={setShowModelDelete}
                id={deleteId}
                deleteQuiz={deleteQuiz}
                name={deleteName}
            />
            <ModelEditQuiz
                show={showModelEdit}
                setShow={setShowModelEdit}
                dataQuiz={dataEditQuiz}
                setDataQuiz={setDataEditQuiz}
                editQuiz={editQuiz}
            />

        </>
    )
}
export default TableQuiz;