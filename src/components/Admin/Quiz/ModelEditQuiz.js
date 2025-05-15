import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { FcPlus } from 'react-icons/fc';
import Select from 'react-select';
import _ from 'lodash';
import { useTranslation, Trans } from "react-i18next";
const ModelEditQuiz = (props) => {
    const { t } = useTranslation();
    const { show, setShow, dataQuiz, setDataQuiz, editQuiz } = props;
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [difficulty, setDifficulty] = useState('');
    const [image, setImage] = useState('');
    const [preView, setPreView] = useState('')
    const options = [
        { value: 'EASY', label: t('managequiz.title1') },
        { value: 'MEDIUM', label: t('managequiz.title2') },
        { value: 'HARD', label: t('managequiz.title3') },
    ];
    const handleClose = () => {
        setShow(false);
        setDescription('');
        setDifficulty('');
        setImage('');
        setName('');
        setPreView('');
        setDataQuiz({})
    }
    useEffect(() => {
        if (!_.isEmpty(dataQuiz)) {
            setName(dataQuiz.name)
            setDescription(dataQuiz.description);
            setDifficulty(dataQuiz.difficulty);
            setImage('');
            if (dataQuiz.image) {
                setPreView(`data:image/jpeg;base64,${dataQuiz.image}`);
            } else {
                setPreView('');
            }
        }
    }, [dataQuiz])
    const handleUpLoadImage = (event) => {
        if (event.target && event.target.files && event.target.files[0]) {
            setPreView(URL.createObjectURL(event.target.files[0]));
            setImage(event.target.files[0]);
        }

    }
    const handleSubmitEdit = () => {
        console.log(name, dataQuiz.id, description, difficulty?.value, image, preView)
        editQuiz(dataQuiz.id, description, name, difficulty?.value, image)
        handleClose();

    }
    return (
        <>
            {/* <Button variant="primary" onClick={handleShow}>
                Launch demo modal
            </Button> */}

            <Modal show={show} onHide={handleClose} size='xl' backdrop="static" className='model-add-user'>
                <Modal.Header closeButton>
                    <Modal.Title>{t('editquiz.title1')}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <fieldset className="border rounded-3 p-3">
                        <legend className="float-none w-auto px-3">{t('editquiz.title2')}</legend>
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
                                defaultValue={difficulty}
                                onChange={setDifficulty}
                                options={options}
                                placeholder={t('editquiz.title4')}
                            />
                        </div>
                        <div className="more-actions">
                            <label className="form-label label-upload" htmlFor='labelUpload'>
                                <FcPlus />
                                {t('viewuser.title2')}
                            </label>
                            <input type='file' id='labelUpload' hidden onChange={(event) => { handleUpLoadImage(event) }} />
                            <div className='col-md-12 img-preview'>
                                {preView ?
                                    <img src={preView} />
                                    :
                                    <span>{t('edituser.title3')}</span>
                                }
                            </div>
                        </div>
                    </fieldset>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        {t('createuser.title12')}
                    </Button>
                    <Button variant="primary" onClick={() => { handleSubmitEdit() }}>
                        {t('edituser.title4')}
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}
export default ModelEditQuiz;