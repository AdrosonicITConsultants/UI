import React, { Component } from 'react'
import { connect } from "react-redux";
import NavbarComponent from "../navbar/navbar";
import Footer from "../footer/footer";
import { Row, Col, Container, Label } from "reactstrap";
import logos from "../../assets";

 class ErrorPage extends Component {
    render() {
        var user = "";
        user = JSON.parse(localStorage.getItem("user")) ? JSON.parse(localStorage.getItem("user")) : "";
        console.log("testError");
        return (            
        <div>
            {user !== ""?
            <React.Fragment>
                <NavbarComponent></NavbarComponent>
                <Container>
                    heloo
                </Container>
                <Footer></Footer>
            </React.Fragment>
            :
            <React.Fragment>
                <Container>
                    heloo
                </Container>
            </React.Fragment>
            }
        </div>          
        );
    }
}

 export default ErrorPage;