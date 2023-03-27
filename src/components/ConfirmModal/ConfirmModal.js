import React from "react";
import { Modal, Button } from "react-bootstrap";

const ConfirmModal = ({ show, onClose, onConfirm }) => {
  return (
    <> 
    <Modal show={show} centered>
        <Modal.Header>
          <Modal.Title>Xoá bài viết</Modal.Title>
        </Modal.Header>
        <Modal.Body>Bạn có chắc chắn muốn xoá bài viết không ?</Modal.Body>
        <Modal.Footer>
          <Button variant="danger"  onClick={() => onClose()}>
            Đóng 
          </Button>
          <Button variant="primary"  onClick={() => onConfirm()}>
            Xoá
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ConfirmModal;
