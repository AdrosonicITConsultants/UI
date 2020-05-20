import React from 'react';
import { Row, Col, Button, Container, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
//import logo from '../../assets/TataTrustsNewLogo.png';

const ModalComponent = (props) => (
    <Modal isOpen={props.modal} toggle={props.togglemodal}>
    <ModalHeader toggle={props.togglemodal}>{props.title}</ModalHeader>
    <ModalBody>
      {props.children}
    </ModalBody>
    </Modal>
);

export default ModalComponent;