import React, { Component } from "react";
import { Row, Col , Container} from 'reactstrap';
import "./homepage.css"
import logos from "../../assets";

export default class roleselect extends Component {
    constructor() {
        super();
        this.state = {
          
        };
      }
    
      artistopen() {
         this.props.handler(3);
        
      } 
      buyeropen() {
        this.props.handler(1);
       
     } 
    
     
    
    render() {

        return(
            <React.Fragment> 
                 <div className="demo" noGutters={true}>
                                <Row noGutters={true} className="text-center">
                        <img src={logos.mainlogo} alt="TataTrusts logo" className="logohome"></img>
                                </Row>
                                
                                <Row noGutters={true} className="text-center line3 font4">
                                    What describes you the best?
                                
                                </Row>
                                <Row noGutters={true} className="selectorrow text-center">
                                    <div className="box1" onClick={() => this.artistopen()}>
                                        <Row noGutters={true}>
                                <img src={logos.mainlogo} alt="TataTrusts logo" className="logoselect"></img>
                                        </Row>
                                        <Row noGutters={true} className="text-center font4">
                                            Artist
                                        </Row>

                                    </div>                        
                                    <div style={{color:"var(--lightFont)"}} className="half text-center">
                            <div className="vrline"></div>
                                        or
                                         <div style={{ marginTop: "0em", height:"3em" }} className="vrline"></div>
                                    </div>
                       
                                    <div className="box3 " onClick={() => this.buyeropen()}>
                                        <Row noGutters={true}>
                                <img src={logos.mainlogo} alt="TataTrusts logo" className="logoselect"></img>
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