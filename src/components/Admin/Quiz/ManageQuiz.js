import { useState } from 'react';
import './ManageQuiz.scss'
import Select from 'react-select';
import { postCreateNewQuiz } from '../../../services/apiServices';
import { toast } from 'react-toastify';
import TableQuiz from './TableQuiz';
import { Accordion } from 'react-bootstrap';
const ManageQuiz = (props) => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [type, setType] = useState('');
    const [image, setImage] = useState(null);
    const options = [
        { value: 'EASY', label: 'Dễ' },
        { value: 'MEDIUM', label: 'Trung Bình' },
        { value: 'HARD', label: 'Khó' },
    ];
    const handleChangeFile = (event) => {
        if (event.target && event.target.files && event.target.files[0]) {
            setImage(event.target.files[0])
        }

    }
    const handleClickSubmit = async () => {
        if (!name || !description || !type) {
            toast.error("Vui lòng điền đầy đủ thông tin!")
            return;
        }
        let res = await postCreateNewQuiz(description, name, type?.value, image)
        if (res && res.EC === 0) {
            setName('');
            setImage('');
            setType('');
            setDescription('')
            window.location.reload();
            toast.success("Tạo mới bài Quiz thành công!")
        } else {
            toast.error(res.EM)
        }
    }
    return (
        <div className="quiz-container">
            <Accordion defaultActiveKey="0">
                <Accordion.Item eventKey="0">
                    <Accordion.Header>
                        <div className="title">
                            <h4>Quản lí bài Quiz </h4>
                        </div>
                    </Accordion.Header>
                    <Accordion.Body>
                        <div className="add-new">
                            <fieldset className="border rounded-3 p-3">
                                <legend className="float-none w-auto px-3">Thêm bài Quiz:</legend>
                                <div className="form-floating mb-3">
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Tên"
                                        value={name}
                                        onChange={(event) => { setName(event.target.value) }}
                                    />
                                    <label>Tên</label>
                                </div>
                                <div className="form-floating mb-3">
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Miêu tả"
                                        value={description}
                                        onChange={(event) => { setDescription(event.target.value) }}
                                    />
                                    <label >Miêu tả</label>
                                </div>
                                <div className='mb-3'>
                                    <Select
                                        defaultValue={type}
                                        onChange={setType}
                                        options={options}
                                        placeholder="Độ Khó"
                                    />
                                </div>
                                <div className="more-actions">
                                    <label className='mb-1' >Hình Ảnh</label>
                                    <input
                                        type="file"
                                        className="form-control"
                                        onChange={(event) => { handleChangeFile(event) }}
                                    />
                                </div>
                                <div className='mt-3'>
                                    <button
                                        className='btn btn-warning'
                                        onClick={() => { handleClickSubmit() }}
                                    >
                                        Lưu
                                    </button>
                                </div>
                            </fieldset>
                        </div>
                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>
            <hr />
            <div className="list-quiz">
                <TableQuiz />
            </div>
        </div>
    )
}
export default ManageQuiz;