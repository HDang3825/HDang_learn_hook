import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { toast } from 'react-toastify';
const ModelTotalQuiz = (props) => {
    const { show, setShow, data } = props;
    const handleClose = () => {
        setShow(false);
    };
    const handleSubmitDelete = async () => {
        handleClose()
    }
    return (
        <>
            <Modal show={show} onHide={handleClose} animation={false} backdrop="static">
                <Modal.Header closeButton>
                    <Modal.Title>Kết Quả</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div>Tổng số câu: <b>{data ? data.countTotal : 'Chưa hiển thị'}</b></div>
                    <div>Số câu đúng: <b>{data ? data.countCorrect : 'Chưa hiển thị'}</b></div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Xem đáp án
                    </Button>
                    <Button variant="primary" onClick={() => { handleSubmitDelete() }}>
                        Xác Nhận
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ModelTotalQuiz;