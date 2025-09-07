import React from "react";
import { useState } from "react";
import { Button, Modal } from "react-bootstrap";

export interface IModalProps {
  children: React.ReactNode | React.ReactNode[];
}

export const ModalC: React.FC<IModalProps> = ({ children }) => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);
  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Launch Demo Modal
      </Button>
      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal Heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>{children}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
