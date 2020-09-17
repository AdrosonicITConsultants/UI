import React, {Component} from 'react';
import logos from "../../assets";
import TTCEapi from "../../services/API/TTCEapi";
import { Row, Col, Container } from 'reactstrap';
import Moment from 'react-moment';
import NavbarComponent from "../navbar/navbar";
import Footer from "../footer/footer";
import queryString from 'query-string';
import { browserHistory } from "../../helpers/history";
import customToast from "../../shared/customToast";
import { toast } from "react-toastify";
import "./artisanChat.css";

export default class ArtisanChat extends Component {

    constructor(props) {
        super(props);
    
        this.state = {  
            
        };   
    
    }

    render() {

    return (
        <React.Fragment>
            <NavbarComponent/>
            <Container>
                <Row noGutters={true}>
                    <Col md={4}>1</Col>
                    <Col md={8}>
                        <div className="artisanChatOnLoadBar"></div>
                        <div className="artisanChatTalkMoreText">Talk more, sell more !</div>
                        <div>Select the chat to view conversation here !</div>
                    </Col>
                </Row>
            </Container>               
            <Footer/>
        </React.Fragment>
    )
    }
}