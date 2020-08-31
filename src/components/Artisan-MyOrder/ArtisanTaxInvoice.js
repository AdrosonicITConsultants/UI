
import React, { Component } from 'react'
import { memoryHistory, browserHistory } from "../../helpers/history";
import { Row, Col , Container, Button} from 'reactstrap';
import { connect } from "react-redux";
import NavbarComponent from "../navbar/navbar";
import logos from "../../assets";
import "./Artisianmyorder.css";
import queryString from 'query-string';
import TTCEapi from '../../services/API/TTCEapi';
import customToast from "../../shared/customToast";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import Moment from 'react-moment';


export default class ArtisanTaxInvoice extends Component {
    constructor() {
        super();
       
        this.state = {
            
           
         
        }
    }

    render() {
        return (
            <React.Fragment>
                     <Row noGutters={true} className="PIcolmt BdImgCol">
                                                        <Col sm={6} >
                                                            <label>Quantity</label>
                                                            <br/>
                                                        <input 
                                                        className="PIinput"
                                                            type="number"
                                                           
                                                            value={this.state.quantity }
                                                            name="quantity"
                                                            onChange={this.handleChange}
                                                            />
                                                        </Col>
                                                        <Col sm={6}>
                                                        <label >Rate per unit(or metre)</label>
                                                        <br/>
                                                        {/* <input className="PIinput" type="number"/> */}
                                                        {/* <span 
                                                        className={this.state.isPidetail ? "rssymboldis":"rssymbol"}
                                                       > */}
                                                            <select name="cars" id="cars" 
                                                            className={this.state.isPidetail ? "rssymboldis":"rssymbol"}
                                                                >
                                                                <option value="volvo">₹</option>
                                                                <option value="saab">$</option>
                                                            </select>
                                                    {/* </span> */}
                                                        <input type="number"  className="PIinput rsinputboxwidth"
                                                       
                                                        value={this.state.rpu }
                                                        name="rpu"
                                                        onChange={this.handleChange} />
                                                        </Col>
                                                    </Row>
                                                    <Row noGutters={true} className="PIcol2mt BdImgCol">
                                                    <Col sm={6}>
                                                    <label>Expected date of delivery</label>
                                                    <br/>
                                                        <input className="PIinput" type="date"
                                                       
                                                        value={this.state.dod }
                                                        name="dod"
                                                        onChange={this.handleChange}/>

                                                    </Col>
                                                    <Col sm={6}>
                                                    <label>HSN Code</label>
                                                    <br/>
                                                        <input className="PIinput" type="number"
                                                       
                                                        value={this.state.hsncode }
                                                        name="hsncode"
                                                        onChange={this.handleChange}/>
                                                    </Col>
                                                    </Row>

                                                   
                                                    <Row noGutters={true} className="PIcol2mt BdImgCol">
                                                            <Col sm={12}>
                                                            <input type="checkbox" name="checkbox" value="check" id="agree"
                                                            
                                                            style={{marginRight:"5px"}} 
                                                            /> 
                                                                Agree to <a
                                                                    style={{ cursor: "pointer", fontSize: "15px" }}
                                                                    onClick={() => {
                                                                    alert("clicked");
                                                                    }}
                                                                >
                                                                    terms & condition
                                                                </a>

                                                            </Col>
                                                            </Row>
                                                            <p className="text-center">
                                                    {this.state.showValidationPi ? (
                                                <span className="bg-danger">All fields are Mandatory</span>
                                                ) : (
                                                <br />
                                                )}
                                                </p>
                                                <Row noGutters={true}>
                                                <Col sm={12} className="text-center">
                                                    
                                                        <button className="previewandpi"
                                                        //  onClick={() => this.savePIDetails()}
                                                         >
                                                        <img src={logos.PIbtnicon} className="PIbuttonicon"></img>Preview & send PI</button>
                                                </Col>
                                                
                         </Row>
 
                </React.Fragment>
                )
                }



}



