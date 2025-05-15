import { useEffect, useState } from "react";
import { deleteQuizForAdmin, getAllQuizForAdmin, putEditQuiz } from "../../../services/apiServices";
import { toast } from "react-toastify";
import ModelDeleteQuiz from "./ModelDeleteQuiz";
import ModelEditQuiz from "./ModelEditQuiz";
import { useTranslation, Trans } from "react-i18next";
const TableQuiz = (props) => {
    const { t } = useTranslation();
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
            toast.info(t('tablequiz.title1'))
        }
    }
    const editQuiz = async (id, description, name, difficulty, image) => {
        let res = await putEditQuiz(id, description, name, difficulty, image)
        if (res && res.EC === 0) {
            toast.success(t('managequestion.title1'))
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
                {t('tablequiz.title2')}
            </div>
            <table className="table table-hover table-bordered my-3">
                <thead>
                    <tr>
                        <th scope="col">{t('tableuser.title1')}</th>
                        <th scope="col">{t('tableuser.title2')}</th>
                        <th scope="col">{t('tableuser.title3')}</th>
                        <th scope="col">{t('editquiz.title4')}</th>
                        <th scope="col">{t('tableuser.title4')}</th>
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
                                        {item.difficulty === 'EASY' ? t('managequiz.title1')
                                            : item.difficulty === 'MEDIUM' ? t('managequiz.title2')
                                                : item.difficulty === 'HARD' ? t('managequiz.title3')
                                                    : 'Chưa xác định'}</td>
                                    <td>
                                        <button className="btn btn-warning mx-2" onClick={() => { handleClickEdit(item) }}>{t('tableuser.title6')}</button>
                                        <button className="btn btn-danger" onClick={() => { handleClickDelete(item) }} >{t('tableuser.title7')}</button>
                                    </td>
                                </tr>
                            )
                        })
                    }
                    {listQuiz && listQuiz.length === 0 &&
                        <tr>
                            <td colSpan={'5'} style={{ padding: '20px 35%' }}>{t('tablequiz.title3')}</td>
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