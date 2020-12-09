import React, { Component } from "react";
import { Row, Col , Container} from 'reactstrap';
import "./homepage.css"
import logos from "../../assets";
import TTCEapi from '../../services/API/TTCEapi';

export default class roleselect extends Component {
    constructor() {
        super();
        this.state = {
          
        };
      }
    
      artistopen() {
         this.props.handler(3);
         localStorage.setItem("selectedUserId", 1);
      } 
      buyeropen() {
        this.props.handler(1);
        localStorage.setItem("selectedUserId", 2);
     } 
    
    helpshow(){
        document.getElementById('help').style.display='block';
    } 
    helpClose(){
        document.getElementById('help').style.display='none'; 
    }
    
    render() {

        return(
            <React.Fragment> 
                 <div className="demo"  >
                                <Row   className="text-center">
                        <img src={logos.mainlogo} alt="TataTrusts logo" className="logohome"></img>
                                </Row>
                                
                                <Row   className="text-center line31 font4 fontplay">
                                    What describes you the best?
                                
                                </Row>
                               
                                <Row   className="selectorrow text-center">
                                    <div className="box1" onClick={() => this.artistopen()}>
                                        <Row  >
                                <img src={logos.artisanlogo} alt="TataTrusts logo" className="logoselect"></img>
                                        </Row>
                                        <Row   className="text-center font3">
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
                                        <Row  >
                                <img src={logos.buyerlogo} alt="TataTrusts logo" className="logoselect"></img>
                                        </Row>
                                        <Row   className="text-center font3">
                                            Buyer
                                        </Row>
                            <br />
                                    </div>


                                </Row>
                                <Row   className="text-center line5 font3">
                                {/* <a style={{color:"black"}} href={TTCEapi.DocumentsURL + "Help.pdf"}
                                    target="_blank">Help?</a> */}
                                   <p style={{color:"black",fontWeight:"600"}} onClick={this.helpshow}>Help?</p> 
                                </Row>
                  
              
                
                                <Row   className="text-center">
                                    
                                 <a style={{color:"black",fontStyle:"italic",marginTop:"10px",fontSize:"17px"}} href={TTCEapi.DocumentsURL + "LEGAL%20DISCLAIMER.pdf"}
                                    target="_blank">Legal Disclaimer </a> | <a style={{color:"black",fontStyle:"italic",marginTop:"10px",fontSize:"17px"}} href={TTCEapi.DocumentsURL + "PRIVACY%20POLICY.pdf"}
                                    target="_blank">Privacy Policy</a> 
                                    
                                </Row>
                                <br></br>
                                <Row className="text-center">
 <p className="newsloganp"> Any commercial activity between the buyer and the artisan is solely <br></br> between the two entities. Antaran (An Initiative of Tata Trusts) <br></br>does not take responsibility for any transactions whatsoever. 
</p>
                                </Row>
 

                            </div>
   {/* _____________________________________________Modal ________________________________________________ */}
   <div id="help" class="w3-modal" style={{paddingTop:"200px"}}>
    <div class="w3-modal-content w3-animate-top modalBoxSize" >
        <div class="w3-container buyerMOQAcceptModalContainer">
        <Row noGutters={true}>
            <Col sm={12}  style={{textAlign:"right"}}>
              <h1 className="closebtn" onClick={() => this.helpClose()}>X</h1>
            </Col>
  
        </Row>
       <p className="helpptag">For any kind of help reach out to us at <br></br>
       <a href = "mailto: antaran@tatatrusts.org">
             antaran@tatatrusts.org</a></p>
       
                                                                     
        
    </div>
    </div>
</div>

      {/* -------------------------------------------Modal ends   ----------------          */}   

            </React.Fragment> 
        )
    }

}