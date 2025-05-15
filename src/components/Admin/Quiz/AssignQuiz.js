import Select from 'react-select';
import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { getAllQuizForAdmin, getListTableUser, postAssignQuiz } from "../../../services/apiServices";
import { useTranslation, Trans } from "react-i18next";
const AssignQuiz = (props) => {
    const { t } = useTranslation();
    const [selectedQuiz, setSelectedQuiz] = useState({});
    const [listQuiz, setListQuiz] = useState();
    const [selectedUser, setSelectedUser] = useState({});
    const [listUser, setListUser] = useState();
    const fetchQuiz = async () => {
        let res = await getAllQuizForAdmin();
        if (res && res.EC === 0) {
            let newQuiz = res.DT.map(item => {
                return {
                    value: item.id,
                    label: `${item.id}-${item.name}`
                }
            })
            setListQuiz(newQuiz)
        }
    }
    const fetchUser = async () => {
        let res = await getListTableUser();
        if (res && res.EC === 0) {
            let users = res.DT.map(item => {
                return {
                    value: item.id,
                    label: `${item.id}-${item.username}-${item.email}`
                }
            })
            setListUser(users)
        }
    }
    useEffect(() => {
        fetchQuiz();
        fetchUser();
    }, []);
    const handleClickAssign = async () => {
        let res = await postAssignQuiz(selectedQuiz.value, selectedUser.value)
        if (res && res.EC === 0) {
            toast.success(t('assignquiz.title1'))
        } else {
            toast.error(res.EM);
        }
    }
    return (
        <div className="assign-quiz-container row">
            <div className="col-6 form-group">
                <label className="mb-2">{t('assignquiz.title2')}</label>
                <Select
                    defaultValue={selectedQuiz}
                    onChange={setSelectedQuiz}
                    options={listQuiz}
                />
            </div>
            <div className="col-6 form-group">
                <label className="mb-2">{t('assignquiz.title3')}</label>
                <Select
                    defaultValue={selectedUser}
                    onChange={setSelectedUser}
                    options={listUser}
                />
            </div>
            <div>
                <button
                    className='btn btn-warning mt-3'
                    onClick={() => handleClickAssign()}
                >
                    {t('assignquiz.title4')}
                </button>
            </div>
        </div>
    )
}
export default AssignQuiz;