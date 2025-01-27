import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { toast } from 'react-toastify';
import { deleteUser } from '../../../services/apiServices';
const ModelDeleteUser = (props) => {
    const { show, setShow, dataUser, listUser } = props;
    const handleClose = () => {
        setShow(false)
    };
    const handleSubmitDelete = async () => {
        let data = await deleteUser(dataUser.id);
        if (data && data.EC === 0) {
            toast.info('Đã xóa người dùng!')
            handleClose();
            await listUser();
        }
        if (data && data.EC !== 0) {
            toast.error(data.EM);
        }
    }
    return (
        <>
            <Modal show={show} onHide={handleClose} animation={false} backdrop="static">
                <Modal.Header closeButton>
                    <Modal.Title>Xác Nhận Xóa ?</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Xác nhận xóa tài khoản có Email là <></>
                    <b>{dataUser && dataUser.email ? dataUser.email : ''}</b>
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

export default ModelDeleteUser;