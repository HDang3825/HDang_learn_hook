import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { toast } from 'react-toastify';
import { useTranslation, Trans } from "react-i18next";
import React, { useState } from 'react';
const ModelTotalQuiz = (props) => {
    const { t } = useTranslation();
    const { show, setShow, data, handleShowAnswer } = props;
    const handleClose = () => {
        setShow(false);
        handleShowAnswer();
    };
    const handleSubmitDelete = async () => {
        handleClose();
    }
    return (
        <>
            <Modal show={show} onHide={handleClose} backdrop="static">
                <Modal.Header closeButton>
                    <Modal.Title> {t('modeltotalquiz.title1')}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div>{t('modeltotalquiz.title2')} <b>{data ? data.countTotal : 'Chưa hiển thị'}</b></div>
                    <div>{t('modeltotalquiz.title3')} <b>{data ? data.countCorrect : 'Chưa hiển thị'}</b></div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        {t('modeltotalquiz.title4')}
                    </Button>
                    <Button variant="primary" onClick={() => { handleSubmitDelete() }}>
                        {t('modeltotalquiz.title5')}
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ModelTotalQuiz;