import React, { Component } from "react";
import { Row, Col , Container} from 'reactstrap';
import "./homepage.css"
import logo from "../../assets/logo.png";

export default class roleselect extends Component {
    render() {

        return(
            <React.Fragment> 
                 <div className="demo" noGutters={true}>
                                <Row noGutters={true} className="text-center">
                                    <img src={logo} alt="TataTrusts logo" className="logohome"></img>
                                </Row>
                                <hr className="hrline"></hr>
                                <Row noGutters={true} className="text-center font2" >
                                    An initiative by Antran
                                </Row>
                                <Row noGutters={true} className="text-center font2">
                                Part of TataTrusts
                                </Row>
                                <Row noGutters={true} className="text-center line3 font3">
                                    What describes you the best?
                                
                                </Row>
                                <Row noGutters={true} className="selectorrow text-center">
                                    <div className="box1">
                                        <Row noGutters={true}>
                                        <img src={logo} alt="TataTrusts logo" className="logoselect"></img>
                                        </Row>
                                        <Row noGutters={true} className="text-center font4">
                                            Artist
                                        </Row>

                                    </div>
                                    <div className="half text-center">
                                        or
                                    </div>
                                    <div className="box3 ">
                                        <Row noGutters={true}>
                                        <img src={logo} alt="TataTrusts logo" className="logoselect"></img>
                                        </Row>
                                        <Row noGutters={true} className="text-center font4">
                                            Buyer
                                        </Row>

                                    </div>


                                </Row>
                                <Row noGutters={true} className="text-center line5 font3">
                                    Need Help Deciding?
                                </Row>
                                <Row noGutters={true} className="text-center line6 font3">
                                    Change language
                                </Row>
                                <br></br>
                                 

                            </div>

            </React.Fragment> 
        )
    }

}