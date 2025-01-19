import React, { useEffect, useState } from "react";
import { toast } from 'react-toastify';
const MyComponent = (props) => {
    const [arrName, setStateName] = useState(
        [
            { id: '1', name: 'Hải Đăng' },
            { id: '2', name: 'Chà My' },
            { id: '3', name: 'Kim Châu' },
            { id: '4', name: 'Nhất Phi' }
        ],
    );
    const [addName, setAddName] = useState('')
    const [showHide, setShowHide] = useState(false)
    const handleChangeInput = (event) => {
        setAddName(event.target.value);
    }
    const handleClickAdd = () => {
        if (!addName) {
            toast.error('Không được bỏ trống')
            return;
        }
        let id = Math.floor(Math.random() * 100001)
        let add = {
            id: id,
            name: addName
        }
        setStateName([...arrName, add],)
        setAddName('')
    }
    const handleClickDelete = (item) => {
        setStateName([...arrName.filter(a => a.id !== item.id)])
    }
    useEffect(() => {
        setTimeout(() => {
            document.title = 'Home'
        }, 2000)
    }, [])
    useEffect(() => {
        if (arrName.length === 0)
            toast.info('Đã xóa tất cả. Danh sách trống')
    }, [arrName])
    const handleHideShow = () => {
        setShowHide(!showHide)
    }
    return (
        <>
            <div>
                <input
                    type="text"
                    value={addName || ''}
                    onChange={(event) => { handleChangeInput(event) }}
                />
                <button type="submit" onClick={() => handleClickAdd()}>Thêm</button>
            </div>
            {showHide === false ?
                <div><button type="button" onClick={() => { handleHideShow() }}>Hiện</button></div>
                :
                <>
                    {arrName && arrName.length > 0 &&
                        arrName.map((item, index) => {
                            return (
                                <div key={item.id}>
                                    {index + 1}-{item.name}
                                    <> </><span onClick={() => handleClickDelete(item)}>x</span>
                                </div>
                            )
                        })
                    }
                    {arrName.length > 0 ?
                        <div><button type="button" onClick={() => { handleHideShow() }}>Ẩn</button></div>
                        :
                        <div>Danh sách trống</div>
                    }

                </>
            }


        </>
    )
}
export default MyComponent;