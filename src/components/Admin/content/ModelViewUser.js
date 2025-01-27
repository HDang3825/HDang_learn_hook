import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import _ from 'lodash';
const ModelViewUser = (props) => {
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
                    <Modal.Title>Chi Tiết Người Dùng</Modal.Title>
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
                            <label className="form-label">Password</label>
                            <input
                                type="password"
                                className="form-control"
                                disabled
                                value={pass}
                                onChange={(event) => { setPass(event.target.value) }}
                            />
                        </div>
                        <div className="col-md-6">
                            <label className="form-label">Tên Người Dùng</label>
                            <input
                                type="text"
                                className="form-control"
                                value={username}
                                disabled
                                onChange={(event) => { setUsername(event.target.value) }}
                            />
                        </div>
                        <div className="col-md-4">
                            <label className="form-label">Vai Trò</label>
                            <select
                                className="form-select"
                                value={role}
                                disabled
                                onChange={(event) => { setRole(event.target.value) }}>
                                <option value='USER'>Người Dùng</option>
                                <option value='ADMIN'>Quản Trị</option>
                            </select>
                        </div>
                        <div className='col-md-12'>
                            <label className="form-label label-upload" htmlFor='labelUpload'>
                                Hình Ảnh
                            </label>
                        </div>
                        <div className='col-md-12 img-preview'>
                            {preView ?
                                <img src={preView} />
                                :
                                <span>Chưa có hình ảnh</span>
                            }
                        </div>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Đóng
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}
export default ModelViewUser;