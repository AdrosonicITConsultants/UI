import React from 'react';
import { Row, Col, Button, Container, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import logo from '../../assets/TataTrustsNewLogo.png';

const ModalWishlistComponent = (props) => (
    <Modal isOpen={props.confirmModal} toggle={props.togglemodalEnroll} className={props.className}>
    <ModalHeader toggle={props.togglemodalEnroll}>{props.title}</ModalHeader>
    <ModalBody>
      {props.children}
    </ModalBody>
    </Modal>
);

export default ModalWishlistComponent;