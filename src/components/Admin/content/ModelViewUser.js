import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import _ from 'lodash';
import { useTranslation, Trans } from "react-i18next";
const ModelViewUser = (props) => {
    const { t } = useTranslation();
    const { show, setShow, dataUser, reset } = props;
    const handleClose = () => {
        setShow(false);
        setEmail('');
        setPass('');
        setUsername('');
        setRole('USER');
        setPreView('');
        reset({});
    }
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [pass, setPass] = useState('');
    const [role, setRole] = useState('USER');
    const [preView, setPreView] = useState('');
    useEffect(() => {
        if (!_.isEmpty(dataUser)) {
            setEmail(dataUser.email);
            setUsername(dataUser.username);
            setRole(dataUser.role);
            if (dataUser.image) {
                setPreView(`data:image/jpeg;base64,${dataUser.image}`);
            } else {
                setPreView('');
            }
        }
    }, [dataUser])
    return (
        <>
            {/* <Button variant="primary" onClick={handleShow}>
                Launch demo modal
            </Button> */}

            <Modal show={show} onHide={handleClose} size='xl' backdrop="static" className='model-add-user'>
                <Modal.Header closeButton>
                    <Modal.Title>{t('viewuser.title1')}</Modal.Title>
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
                                disabled
                                onChange={(event) => { setUsername(event.target.value) }}
                            />
                        </div>
                        <div className="col-md-4">
                            <label className="form-label">{t('createuser.title7')}</label>
                            <select
                                className="form-select"
                                value={role}
                                disabled
                                onChange={(event) => { setRole(event.target.value) }}>
                                <option value='USER'>{t('createuser.title8')}</option>
                                <option value='ADMIN'>{t('createuser.title9')}</option>
                            </select>
                        </div>
                        <div className='col-md-12'>
                            <label className="form-label label-upload" htmlFor='labelUpload'>
                                {t('viewuser.title2')}
                            </label>
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
                </Modal.Footer>
            </Modal>
        </>
    );
}
export default ModelViewUser;