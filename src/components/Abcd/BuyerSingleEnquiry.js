import React, { Component } from 'react'
import { memoryHistory, browserHistory } from "../../helpers/history";
import { Row, Col , Container, Button, Collapse} from 'reactstrap';
import { connect } from "react-redux";
import NavbarComponent from "../navbar/navbar";
import logos from "../../assets";
// import "./AllEnquiryList.css";
import queryString from 'query-string';
import TTCEapi from '../../services/API/TTCEapi';
import customToast from "../../shared/customToast";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import Moment from 'react-moment';
// import { Footer } from 'rsuite';
import Footer from "../footer/footer";
import { BuyerPreviewInvoice } from '../BuyerEnquiries/BuyerPreviewInvoice';



export class BuyerSingleEnquiry extends Component {
    constructor() {
        super();

        this.buyersDetailsbtn = this.buyersDetailsbtn.bind(this);
        this.moqDetailsbtn = this.moqDetailsbtn.bind(this);
        this.proformaDetailsbtn = this.proformaDetailsbtn.bind(this);
        this.changeRequestbtn = this.changeRequestbtn.bind(this);
        this.qualityCheckbtn = this.qualityCheckbtn.bind(this);
        this.handleMoqEdit = this.handleMoqEdit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handlePiEdit= this.handlePiEdit.bind(this);
        this.state = {
            selected:"proformaDetails",
            buyersDetail: false,
            moqDetail: true,
            proformaDetails: false,
            qualityCheck:false,
            changeRequest:false, 
            getMoqDeliveryTimes:[],
            showValidationMoq:false,
            showValidationPi:false,
            isMoqdetail:true,
            isPidetail:true,
            moq:0,
            ppu:"",
            deliveryDesc:-1,
            additionalInfo:"",
            getMoq:[],
            getPi:[],
            dataload : false,
            isSend:-1,
            ImageUrl:TTCEapi.ImageUrl+'Product/',
            progressid:1,
            Progressidnext:2,
            readmore:false,
            // <img src={this.state.ImageUrl + data.productId + '/' + data.lable } />
        }
    }
    buyersDetailsbtn(){
      
        this.setState((prevState) => {
            return{
                selected: "BuyerDetails",
                buyersDetail: true,
                moqDetail: false,
                proformaDetails: false,
                qualityCheck:false,
                changeRequest:false,
               
            };
          
        });
    }

    moqDetailsbtn(){
        this.setState((prevState) => {
            return{
             selected: "moqDetails",
            moqDetail: true,
            buyersDetail: false,
            proformaDetails: false,
            qualityCheck:false,
            changeRequest:false,
         
            };
        });
    }

        proformaDetailsbtn(){
        this.setState((prevState) => {
            return{
                selected:"proformaDetails",
                proformaDetails: true,
                moqDetail: false,
                buyersDetail: false,
                qualityCheck:false,
                changeRequest:false,
                
            };
        });
    }
    changeRequestbtn(){
        this.setState((prevState) => {
            return{
                selected:"changeRequest",
                proformaDetails: false,
                moqDetail: false,
                buyersDetail: false,
                qualityCheck:false,
                changeRequest:true,
             
            };
        });
    }
    qualityCheckbtn(){
        this.setState((prevState) => {
            return{
                selected:"qualityCheck",
                proformaDetails: false,
                moqDetail: false,
                buyersDetail: false,
                qualityCheck:true,
                changeRequest:false,
              
            };
        });
    }
          
    backoperation(){
        browserHistory.push("/enquiriesList"); 
    } 

    handleCluster(e) {
      
        // console.log(e.target.id);
        var index = e.target.selectedIndex;
        var optionElement = e.target.childNodes[index];
        var option =  optionElement.getAttribute('moqId');
        // console.log(option);
        
        // this.setState({ [e.target.name]: e.target.value,moqId:option }, ()=> {
        //   console.log(this.state.moqId);
         
          
        // });
      }

      handleMoqEdit(){
        
            this.setState({
                isMoqdetail:!this.state.isMoqdetail
                
            },()=>{
                // this.checkSave();
            });
            
        
      }

      handlePiEdit(){
        
        this.setState({
            isPidetail:!this.state.isPidetail
            
        },()=>{
            // this.checkSave();
        });
        
    
  }

      handleChange(e) {
        const { name, value } = e.target;
        console.log(value);
        this.setState({ [name]: value }, () => {
        //   console.log(this.state.moq);
        });
    }

    readmoreNote(){
    this.setState({
    readmore:!this.state.readmore
    })
    }

    render() {
        return (
            <React.Fragment>
  <Row noGutters={true}>
      {/* ---------------------------------------------NAVBAR START----------------------------------------------------- */}

                                    <Row noGutters={true}>
                                    <Col sm={1}>
     
                                            </Col>
                                            <Col sm={2}  
                                            className={
                                                (this.state.selected == "BuyerDetails"
                                                     ? "Allenqlistbtn2"
                                                         : "Allenqlistbtn")
                                                     }
                                            onClick={this.buyersDetailsbtn}>
                                            Artisan Detail
                                            </Col>
                                            <Col sm={2} 
                                            className={
                                                (this.state.selected == "moqDetails"
                                                     ? "Allenqlistbtn2"
                                                         : "Allenqlistbtn")
                                                     }
                                            onClick={this.moqDetailsbtn}>
                                            MOQ Detail 
                                            </Col>

                                            <Col sm={2} 
                                              className={
                                                (this.state.selected == "proformaDetails"
                                                     ? "Allenqlistbtn2"
                                                         : "Allenqlistbtn")
                                                     }
                                             onClick={this.proformaDetailsbtn}>
                                           Proforma Invoice
                                            </Col>
                                            <Col sm={2} 
                                              className={
                                                (this.state.selected == "changeRequest"
                                                     ? "Allenqlistbtn2"
                                                         : "Allenqlistbtn")
                                                     }
                                             onClick={this.changeRequestbtn}>
                                            Change Request 
                                            </Col>
                                            <Col sm={2}  
                                            className={
                                                (this.state.selected == "qualityCheck"
                                                     ? "Allenqlistbtn2"
                                                         : "Allenqlistbtn")
                                                     }
                                            onClick={this.qualityCheckbtn}>
                                           Quality Check 
                                            </Col>
                                            <Col sm={1}>
                                            
                                            </Col>
                                   
                                                       <Row noGutters={true}>
                                                           <Col sm={2}></Col>
                                                                    <Col sm={8}>
           {/* --------------------------------Buyer Detail----------------------------------------------  */}
                                                                {this.state.buyersDetail ? 
                                                                <>
                                                                BUyer Details
                                                                </>
                                                                 
                                                                :null}
           {/* --------------------------------Buyer Detail end----------------------------------------------                                                          */}
            {/* -------------------MOQ start------------------------------------------------------------------------------ */}
           
                                                            {this.state.moqDetail ?  
                                                            
                                                          <> 
                                                          <h1>Received MOQ</h1>
                                                         <Row noGutters={true} style={{overflow:"auto"}}>
                                                        <table className="MOqtable" style={{width:"100%"}}>
                                                            <tr className="borderleftblue">
                                                            <td >
                                                                <Row noGutters={true}>
                                                                     <Col className="col-xs-12 " sm={12} md={4} >
                                                                        <img src={logos.Fabric} className="Receivemoqbrandimg"></img>
                                                                    </Col>

                                                                    <Col className="col-xs-12 colright" sm={12} md={8}>
                                                                       <p className="Artisianbrandh">Artisian Brand :<span style={{color:"cornflowerblue"}}> Chidiya</span> </p>
                                                                        <span className="regionmoq"> Region,orissa</span>
                                                                    </Col>
                                                                </Row>
                                                            </td>
                                                            <td>
                                                            <Row noGutters={true}>
                                                                     <Col className="col-xs-12 tdclasscss">
                                                                        <p className="theading">MOQ</p>
                                                                            300
                                                                    </Col>
                                                                </Row>
                                                            </td>
                                                            <td>
                                                            <Row noGutters={true}>
                                                            <Col className="col-xs-12 tdclasscss">
                                                            <p className="theading">Price/unit(or m)</p>
                                                            <i class="fa fa-inr" aria-hidden="true"></i>
                                                                                   300
                                                                    </Col>
                                                                </Row>
                                                             </td>
                                                            <td>
                                                            <Row noGutters={true}>
                                                            <Col className="col-xs-12 tdclasscss">
                                                            <p className="theading">ETA Delivery</p>
                                                                            300 Days
                                                                    </Col>
                                                                </Row>
                                                            </td>
                                                            <td>
                                                            <Row noGutters={true} onClick={() => this.readmoreNote()}>
                                                            <Col className="col-xs-12 readmored" >
                                                            <p className="receading"  >Received</p>
                                                            {this.state.readmore ? <>Collapse  <i class="fa fa-angle-up fa-lg" aria-hidden="true"></i> </>:
                                                            <> Read More <i class="fa fa-angle-down fa-lg" aria-hidden="true"></i></>
                                                            }
                                                                           

                                                                    </Col>
                                                                </Row>
                                                            </td>
                                                            {this.state.readmore?
                                                            ""
                                                            :
                                                            <td>
                                                            <Row noGutters={true}>
                                                            <Col className="col-xs-12 tdclasscss">
                                                           
                                                            <i class="fa fa-minus-circle" aria-hidden="true" style={{color:"red"}}></i>
                                                                    </Col>
                                                                </Row>
                                                            </td>
                                                            }
                                                           
                                                            <td className={this.state.readmore? "acceptmoqbtnlg":"acceptmoqbtn"} >
                                                            <Row noGutters={true} >
                                                                     <Col className="col-xs-12 ">
                                                                     <i class="fa fa-handshake-o accepticon" aria-hidden="true"></i>
                                                                 Accept
                                                                    </Col>
                                                                </Row>
                                                            </td>
                                                        </tr>
                                                       
                                                        </table>
                                                        {/* -----------readmore-------------- */}
                                                                 {this.state.readmore ? 
                                                                  <div className="readmorediv">
                                                                  <p><b>Note from Artisan</b></p>
                                                                   This is a note from artisan  This is a note from artisan  This is a note from artisan  This is a note from artisan
                                                                   This is a note from artisan  This is a note from artisan  This is a note from artisan  This is a note from artisan
                                                                   This is a note from artisan  This is a note from artisan  This is a note from artisan  This is a note from artisan
                                                                   This is a note from artisan  This is a note from artisan  This is a note from artisan  This is a note from artisan
                                                                  </div>
                                                                 :null}
                                                             
                                                              
                                                          
                                                        </Row>  
                                                          </>

                                                                :null}
                     {/* -------------------MOQ------------------------------------------------------------------------------ */}

                                                            {this.state.proformaDetails ? 
                                                            <>
                                                       <BuyerPreviewInvoice />
                                                            </>:null}
                                         {/* ----------------------------------------------------------------------------------------------                   */}
                                                            {this.state.changeRequest ?  <div>
                                                            <h6>change....</h6>
                                                            </div>:null}

                                                            {this.state.qualityCheck ?  <div>
                                                            <h6>qualityCheck...</h6>
                                                            </div>:null}
                                                            
                                                            </Col>
                                                            <Col sm={2}></Col>
                                                     </Row>
  
  
                               </Row>


{/* ---------------------------------------------NAVBAR ENDS----------------------------------------------------- */}
                                      
            </Row>
                 </React.Fragment>
        )
    }
}



function mapStateToProps(state) {
    // debugger;
    const { user } = state
    return { user };
}

const connectedLoginPage = connect(mapStateToProps)(BuyerSingleEnquiry);
export default connectedLoginPage;