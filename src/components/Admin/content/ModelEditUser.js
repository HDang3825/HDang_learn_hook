import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { FcPlus } from 'react-icons/fc';
import { toast } from 'react-toastify';
import { putEditUser } from '../../../services/apiServices';
import _ from 'lodash';
import { useTranslation, Trans } from "react-i18next";
const ModelEditUser = (props) => {
    const { t } = useTranslation();
    const { show, setShow, dataUser, reset, listUser, page } = props;
    const handleClose = () => {
        setShow(false);
        setEmail('');
        setPass('');
        setUsername('');
        setRole('USER');
        setImage('');
        setPreView('');
        reset({});
    }
    const [id, setId] = useState('');
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [pass, setPass] = useState('');
    const [role, setRole] = useState('USER');
    const [image, setImage] = useState('');
    const [preView, setPreView] = useState('');
    useEffect(() => {
        if (!_.isEmpty(dataUser)) {
            setId(dataUser.id)
            setEmail(dataUser.email);
            setUsername(dataUser.username);
            setRole(dataUser.role);
            setImage('');
            if (dataUser.image) {
                setPreView(`data:image/jpeg;base64,${dataUser.image}`);
            } else {
                setPreView('');
            }
        }
    }, [dataUser])
    const handleUpLoadImage = (event) => {
        if (event.target && event.target.files && event.target.files[0]) {
            setPreView(URL.createObjectURL(event.target.files[0]));
            setImage(event.target.files[0]);
        }

    }
    const validateEmail = (email) => {
        return String(email)
            .toLowerCase()
            .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            );
    };
    const handleSubmitCreateUser = async () => {
        let isValidateEmail = validateEmail(email);
        if (!isValidateEmail) {
            toast.error(t('createuser.title1'));
            return;
        }
        let data = await putEditUser(id, username, role, image);
        if (data && data.EC === 0) {
            toast.success(t('edituser.title1'));
            handleClose();
            await listUser(page);
        }
        if (data && data.EC !== 0) {
            toast.error(data.EM);
        }
    }
    return (
        <>
            {/* <Button variant="primary" onClick={handleShow}>
                Launch demo modal
            </Button> */}

            <Modal show={show} onHide={handleClose} size='xl' backdrop="static" className='model-add-user'>
                <Modal.Header closeButton>
                    <Modal.Title>{t('edituser.title2')}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form className="row g-3">
                        <div className="col-md-6">
                            <label className="form-label">Email</label>
                            <input
                                type="email"
                                className="form-control"
                                disabled
                                value={email}
                                onChange={(event) => { setEmail(event.target.value) }}
                            />
                        </div>
                        <div className="col-md-6">
                            <label className="form-label">{t('createuser.title5')}</label>
                            <input
                                type="password"
                                className="form-control"
                                disabled
                                value={pass}
                                onChange={(event) => { setPass(event.target.value) }}
                            />
                        </div>
                        <div className="col-md-6">
                            <label className="form-label">{t('createuser.title6')}</label>
                            <input
                                type="text"
                                className="form-control"
                                value={username}
                                onChange={(event) => { setUsername(event.target.value) }}
                            />
                        </div>
                        <div className="col-md-4">
                            <label className="form-label">{t('createuser.title7')}</label>
                            <select
                                className="form-select"
                                value={role}
                                onChange={(event) => { setRole(event.target.value) }}>
                                <option value='USER'>{t('createuser.title8')}</option>
                                <option value='ADMIN'>{t('createuser.title9')}</option>
                            </select>
                        </div>
                        <div className='col-md-12'>
                            <label className="form-label label-upload" htmlFor='labelUpload'>
                                <FcPlus />
                                {t('createuser.title10')}
                            </label>
                            <input type='file' id='labelUpload' hidden onChange={(event) => { handleUpLoadImage(event) }} />
                        </div>
                        <div className='col-md-12 img-preview'>
                            {preView ?
                                <img src={preView} />
                                :
                                <span>{t('edituser.title3')}</span>
                            }
                        </div>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        {t('createuser.title12')}
                    </Button>
                    <Button variant="primary" onClick={() => { handleSubmitCreateUser() }}>
                        {t('edituser.title4')}
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}
export default ModelEditUser;