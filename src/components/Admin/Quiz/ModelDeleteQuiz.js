import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
const ModelDeleteQuiz = (props) => {
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
                    <Modal.Title>Xác Nhận Xóa ?</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Xác nhận xóa bài Quiz <b>{name}</b> có ID là <></>
                    <b>{id}</b>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Hủy
                    </Button>
                    <Button variant="primary" onClick={() => { handleSubmitDelete() }}>
                        Xác Nhận
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ModelDeleteQuiz;