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
                        <button className="wishlistblack browseproductbtn">
                        <i class="fa fa-handshake-o" aria-hidden="true" style={{marginRight:"5px"}}></i>
                         Reach out to Tata Trusts</button>
                        </div>                          
                </Row>
                
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
