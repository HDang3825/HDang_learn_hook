import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { FcPlus } from 'react-icons/fc';
import { toast } from 'react-toastify';
import { putEditUser } from '../../../services/apiServices';
import _ from 'lodash';
const ModelEditUser = (props) => {
    const { show, setShow, dataUser, reset, listUser } = props;
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
            toast.error('Email không hợp lệ!');
            return;
        }
        let data = await putEditUser(id, username, role, image);
        if (data && data.EC === 0) {
            toast.success('Cập nhật người dùng thành công!');
            handleClose();
            await listUser();
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
                    <Modal.Title>Chỉnh Sửa Người Dùng</Modal.Title>
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
                                onChange={(event) => { setUsername(event.target.value) }}
                            />
                        </div>
                        <div className="col-md-4">
                            <label className="form-label">Vai Trò</label>
                            <select
                                className="form-select"
                                value={role}
                                onChange={(event) => { setRole(event.target.value) }}>
                                <option value='USER'>Người Dùng</option>
                                <option value='ADMIN'>Quản Trị</option>
                            </select>
                        </div>
                        <div className='col-md-12'>
                            <label className="form-label label-upload" htmlFor='labelUpload'>
                                <FcPlus />
                                Tải Ảnh Lên
                            </label>
                            <input type='file' id='labelUpload' hidden onChange={(event) => { handleUpLoadImage(event) }} />
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
                    <Button variant="primary" onClick={() => { handleSubmitCreateUser() }}>
                        Lưu
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}
export default ModelEditUser;