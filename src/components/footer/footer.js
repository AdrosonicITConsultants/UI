import React, { Component } from 'react'
import "./footer.css"
import { Row, Col, Container } from "reactstrap";
import { logRoles } from '@testing-library/react';
import logos from "../../assets"



export default class Footer extends Component {
    render() {
        return (
        
            <div className="footerblack">
                <Row></Row>
                <Row noGutters={true}> 
                    <Col md="4" sm="4" xs="4" className="text-left">Follow us on</Col>
                    <Col md="4" sm="4" xs="4" className="text-center">For any help</Col>
                    <Col md="4" sm="4" xs="4"  className="text-right">DOWNLOAD CRAFT EXCHANGE APP ON</Col>
                    
                </Row>
                <br/>
                <Row noGutters={true}>
                    <Col className="col-md-4 col-sm-4  text-left">
                        <i className="col-md-1 col-sm-1 fa fa-facebook" style={{color:"white"}}></i>
                        <i className="col-md-1 col-sm-1 fa fa-instagram" style={{ color: "white" }}></i>
                        <i className="col-md-1 col-sm-1 fa fa-twitter" style={{ color: "white" }}></i>
                    </Col>
                    <Col className="col-md-4 col-sm-4  text-center">Write us on help@craftexchange.com</Col>
                    <Col className="col-md-4 col-sm-4  text-right">
                        <div className="col-md-4 col-sm-4  text-center"></div>
                        <img className="col-md-4 col-sm-4  text-center" style={{width:"85px"}} src={logos.appstorebtn}></img>
                        <img className="col-md-4 col-sm-4 text-center" style={{ width: "85px" }} src={logos.playstorebtn}></img>
                        </Col>

                </Row>
         

                <Row noGutters={true}>
                    <Col className="col-md-4 col-sm-4  font1 text-left">2020 CRAFT XCHANGE ALL RIGHTS RESERVED</Col>
                    <Col className="col-md-4 col-sm-4  text-center"><div>
                        Registered address:
                        <p className="font1">abc gali,abc xyz,</p>
                       
                        </div></Col>
                    <Col className="col-md-4 col-sm-4  text-right font1">
                        <p className="col-md-4 col-sm-4  text-center">Privacy policy</p>
                        <p className="col-md-4 col-sm-4  text-center"> Terms of Usage</p>
                        <p className="col-md-4 col-sm-4  text-center">Cookie policy</p>
                        </Col>

                </Row>
               
            </div>
       
        )
    }
}
