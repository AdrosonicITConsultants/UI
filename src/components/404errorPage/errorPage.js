import React, { Component } from 'react'
import { connect } from "react-redux";
import NavbarComponent from "../navbar/navbar";
import Footer from "../footer/footer";
import { Row, Col, Container, Label } from "reactstrap";
import logos from "../../assets";
import "./errorPage.css";
import { browserHistory } from "../../helpers/history";

 class ErrorPage extends Component {

    backoperation(){
        browserHistory.goBack(); 
    } 

    render() {
        var user = "";
        user = JSON.parse(localStorage.getItem("user")) ? JSON.parse(localStorage.getItem("user")) : "";
        return (            
        <div>
            {user !== ""?
            <React.Fragment>
                <NavbarComponent></NavbarComponent>
                <Container>
                    <Row noGutters={true}>
                        <Col className="col-xs-12 text-center">
                            <p className="errorPageText">404 : Page Not Found</p>
                            <div className="errorPageButton" onClick={() => this.backoperation()}>Go Back</div>
                        </Col>
                    </Row>
                </Container>
                <Footer></Footer>
            </React.Fragment>
            :
            <React.Fragment>
                <Container>
                    <Row noGutters={true}>
                        <Col className="col-xs-12 text-center">
                            <p className="errorPageText">404 : Page Not Found</p>
                            <div className="errorPageButton" onClick={() => this.backoperation()}>Go Back</div>
                        </Col>
                    </Row>
                </Container>
            </React.Fragment>
            }
        </div>          
        );
    }
}

 export default ErrorPage;