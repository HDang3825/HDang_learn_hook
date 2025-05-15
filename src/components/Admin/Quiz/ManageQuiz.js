import { useState } from 'react';
import './ManageQuiz.scss'
import Select from 'react-select';
import { postCreateNewQuiz } from '../../../services/apiServices';
import { toast } from 'react-toastify';
import TableQuiz from './TableQuiz';
import { Accordion } from 'react-bootstrap';
import QuizQA from './QuizQA';
import AssignQuiz from './AssignQuiz';
import { useTranslation, Trans } from "react-i18next";
const ManageQuiz = (props) => {
    const { t } = useTranslation();
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [type, setType] = useState('');
    const [image, setImage] = useState(null);
    const options = [
        { value: 'EASY', label: t('managequiz.title1') },
        { value: 'MEDIUM', label: t('managequiz.title2') },
        { value: 'HARD', label: t('managequiz.title3') },
    ];
    const handleChangeFile = (event) => {
        if (event.target && event.target.files && event.target.files[0]) {
            setImage(event.target.files[0])
        }

    }
    const handleClickSubmit = async () => {
        if (!name || !description || !type) {
            toast.error(t('managequiz.title4'))
            return;
        }
        let res = await postCreateNewQuiz(description, name, type?.value, image)
        if (res && res.EC === 0) {
            setName('');
            setImage('');
            setType('');
            setDescription('')
            window.location.reload();
            toast.success(t('managequiz.title5'))
        } else {
            toast.error(res.EM)
        }
    }
    return (
        <div className="quiz-container">
            <Accordion defaultActiveKey="0">
                <Accordion.Item eventKey="0">
                    <Accordion.Header>
                        <div className="title">
                            <h4>{t('managequiz.title8')} </h4>
                        </div>
                    </Accordion.Header>
                    <Accordion.Body>
                        <div className="add-new">
                            <fieldset className="border rounded-3 p-3">
                                <legend className="float-none w-auto px-3">{t('managequiz.title9')}</legend>
                                <div className="form-floating mb-3">
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder={t('managequestion.title11')}
                                        value={name}
                                        onChange={(event) => { setName(event.target.value) }}
                                    />
                                    <label>{t('managequestion.title11')}</label>
                                </div>
                                <div className="form-floating mb-3">
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder={t('editquiz.title3')}
                                        value={description}
                                        onChange={(event) => { setDescription(event.target.value) }}
                                    />
                                    <label >{t('editquiz.title3')}</label>
                                </div>
                                <div className='mb-3'>
                                    <Select
                                        defaultValue={type}
                                        onChange={setType}
                                        options={options}
                                        placeholder={t('editquiz.title4')}
                                    />
                                </div>
                                <div className="more-actions">
                                    <label className='mb-1' >{t('viewuser.title2')}</label>
                                    <input
                                        type="file"
                                        className="form-control"
                                        onChange={(event) => { handleChangeFile(event) }}
                                    />
                                </div>
                                <div className='mt-3'>
                                    <button
                                        className='btn btn-warning'
                                        onClick={() => { handleClickSubmit() }}
                                    >
                                        {t('edituser.title4')}
                                    </button>
                                </div>
                            </fieldset>
                        </div>
                        <div className="list-quiz">
                            <TableQuiz />
                        </div>
                    </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="1">
                    <Accordion.Header>
                        <div className="title">
                            <h4>{t('managequiz.title6')} </h4>
                        </div>
                    </Accordion.Header>
                    <Accordion.Body>
                        <QuizQA />
                    </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="2">
                    <Accordion.Header>
                        <div className="title">
                            <h4>{t('managequiz.title7')} </h4>
                        </div>
                    </Accordion.Header>
                    <Accordion.Body>
                        <AssignQuiz />
                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>
            <hr />
        </div>
    )
}
export default ManageQuiz;