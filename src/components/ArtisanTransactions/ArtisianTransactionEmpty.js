import React, { Component } from 'react'
import { memoryHistory, browserHistory } from "../../helpers/history";
import { Row, Col , Container, Button} from 'reactstrap';
import { connect } from "react-redux";
import NavbarComponent from "../navbar/navbar";
import logos from "../../assets";
import TTCEapi from '../../services/API/TTCEapi';
import Footer from "../footer/footer";

export class ArtisianTransactionEmpty extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
           
        }
          }      
        browseproduct(){
            browserHistory.push("/Artisanself")
        }

        reachOutToUsModal = () => {
            document.getElementById('reachOutToUsModal').style.display='block';
           }

           reachOutToUsModalClose = () => {
            document.getElementById('reachOutToUsModal').style.display='none';
           }
 
    
    render() {
        return (
            <React.Fragment>
               
                <Row noGutters={true} className=" ">
                           
                          <Col sm="12" className="col-xs-12 forgottoplaceorder artempthreadbg" style={{textAlign:"center"}}>
                        <h1 className="playfair">Nothing <br/> sold yet ?</h1> 
                          <Row noGutters={true}>
                             <Col sm="5"></Col><Col sm="2"><hr className="hrempty"/></Col><Col sm="5"></Col>
                         </Row>   
                         <Row noGutters={true}>
                         <p className="emtytextp">There are no transactions done yet. <br/> 
                         To know the best practices or in case of any help. <br/>
                         Try reaching out to our Tata Trusts Team.</p>
                       
                             </Row>         
                         </Col>   
                         <div style={{textAlign:"center"}} 
                          >
                        <button className="wishlistblack browseproductbtn" onClick={this.reachOutToUsModal}>
                        <i class="fa fa-handshake-o" aria-hidden="true" style={{marginRight:"5px"}}></i>
                         Reach out to Tata Trusts</button>
                        </div>                          
                </Row>

                <div id="reachOutToUsModal" class="w3-modal">
                <div class="w3-modal-content w3-animate-top modalBoxSize">
                <div class="w3-container chatAttachModalOuter">
                    <div className="text-right">
                        <img src={logos.closelogo} className="chatAttachCloseIcon" onClick={this.reachOutToUsModalClose}/>
                    </div>
                    <h4 className="artisanChatModalTitle text-center">For any query reach us @ <br/><br/><a href = "mailto: antaran@tatatrusts.org">
                    antaran@tatatrusts.org</a></h4>
                </div>
                </div>
                </div>
                
            </React.Fragment>
        )
    }
}

function mapStateToProps(state) {
    const { user } = state
    return { user };
}

const connectedLoginPage = connect(mapStateToProps)(ArtisianTransactionEmpty);
export default connectedLoginPage;
