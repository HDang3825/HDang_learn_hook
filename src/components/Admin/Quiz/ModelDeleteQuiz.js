import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useTranslation, Trans } from "react-i18next";
const ModelDeleteQuiz = (props) => {
    const { t } = useTranslation();
    const { show, setShow, id, deleteQuiz, name } = props;
    const handleClose = () => {
        setShow(false);
    };
    const handleSubmitDelete = async () => {
        deleteQuiz(id);
        handleClose();
    }
    return (
        <>
            <Modal show={show} onHide={handleClose} animation={false} backdrop="static">
                <Modal.Header closeButton>
                    <Modal.Title>{t('deleteuser.title1')}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {t('deletequiz.title1')} <b>{name}</b> {t('deletequiz.title2')} <></>
                    <b>{id}</b>
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

export default ModelDeleteQuiz;