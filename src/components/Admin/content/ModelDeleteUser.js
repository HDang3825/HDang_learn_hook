import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { toast } from 'react-toastify';
import { deleteUser } from '../../../services/apiServices';
import { useTranslation, Trans } from "react-i18next";
const ModelDeleteUser = (props) => {
    const { t } = useTranslation();
    const { show, setShow, dataUser, listUser, setPage } = props;
    const handleClose = () => {
        setShow(false);
        setPage(1);
    };
    const handleSubmitDelete = async () => {
        let data = await deleteUser(dataUser.id);
        if (data && data.EC === 0) {
            toast.info(t('deleteuser.title'))
            handleClose();
            await listUser(1);
        }
        if (data && data.EC !== 0) {
            toast.error(data.EM);
        }
    }
    return (
        <>
            <Modal show={show} onHide={handleClose} animation={false} backdrop="static">
                <Modal.Header closeButton>
                    <Modal.Title>{t('deleteuser.title1')}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {t('deleteuser.title2')} <></>
                    <b>{dataUser && dataUser.email ? dataUser.email : ''}</b>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        {t('deleteuser.title3')}
                    </Button>
                    <Button variant="primary" onClick={() => { handleSubmitDelete() }}>
                        {t('deleteuser.title4')}
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ModelDeleteUser;