import React from 'react';

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

import { MODAL_ACTION_CLOSE, MODAL_ACTION_CONFIRM } from '~/utilities/constants';

function ModalConfirm({ title, content, show, onAction }) {
    return (
        <Modal show={show} onHide={() => onAction('close')} backdrop="static" keyboard={false}>
            <Modal.Header closeButton>
                <Modal.Title>{title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>{content}</Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={() => onAction(MODAL_ACTION_CLOSE)} size="lg">
                    Đóng
                </Button>
                <Button variant="danger" onClick={() => onAction(MODAL_ACTION_CONFIRM)} size="lg">
                    Xác nhận
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default ModalConfirm;
