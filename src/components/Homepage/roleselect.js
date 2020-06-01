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
                                
                                <Row noGutters={true} className="text-center line31 font4 fontplay">
                                    What describes you the best?
                                
                                </Row>
                               
                                <Row noGutters={true} className="selectorrow text-center">
                                    <div className="box1" onClick={() => this.artistopen()}>
                                        <Row noGutters={true}>
                                <img src={logos.buyerlogo} alt="TataTrusts logo" className="logoselect"></img>
                                        </Row>
                                        <Row noGutters={true} className="text-center font3">
                                            Artisan
                                        </Row>
<br/>
                                    </div>                        
                        <div style={{ color:"#c7c7c7"}} className="half text-center">
                            <div className="vrline"></div>
                            <div className ="or fontplay" style={{}}>or</div>
                                      
                                         <div style={{ marginTop: "2%", height:"1.5em" }} className="vrline"></div>
                                    </div>
                       
                                    <div className="box3 " onClick={() => this.buyeropen()}>
                                        <Row noGutters={true}>
                                <img src={logos.buyerlogo} alt="TataTrusts logo" className="logoselect"></img>
                                        </Row>
                                        <Row noGutters={true} className="text-center font3">
                                            Buyer
                                        </Row>
                            <br />
                                    </div>


                                </Row>
                                {/* <Row noGutters={true} className="text-center line5 font3">
                                    Need Help Deciding?
                                </Row> */}
                    <br />
                    <br />
                    <br />
                                <Row noGutters={true} className="text-center  mt37">
                                    Privacy Policy
                                    
                                </Row>
                                <br></br>
                                 

                            </div>

            </React.Fragment> 
        )
    }

}