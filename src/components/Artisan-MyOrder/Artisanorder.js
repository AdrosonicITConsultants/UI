

import React, { Component } from 'react'
import { memoryHistory, browserHistory } from "../../helpers/history";
import { Row, Col , Container, Button} from 'reactstrap';
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
import { ArtisanTransaction } from './ArtisanTransaction';
import { PIchange } from './PIChange';
import { PreviewOldchanges } from './PreviewOldchanges';
import { ChangeRequest } from './ChangeRequest';
import { PreviewChangedPI } from './PreviewChangedPI';




export class Artisanorder extends Component {
    constructor() {
        super();

       
        this.state = {
            selected:"BuyerDetails",
            transaction: true,
            proformainvoice: false,
            changeReq: false,
            taxInvoice:false,
            qualityCheck:false, 
            dataload:true
           
        
        }
        this.transactionsbtn = this.transactionsbtn.bind(this);
        this.moqDetailsbtn = this.moqDetailsbtn.bind(this);
        this.proformaDetailsbtn = this.proformaDetailsbtn.bind(this);
        this.changeRequestbtn = this.changeRequestbtn.bind(this);
        this.qualityCheckbtn = this.qualityCheckbtn.bind(this);
    }

 
    transactionsbtn(){
      
        this.setState((prevState) => {
            return{
                selected: "BuyerDetails",
                transaction: true,
                proformainvoice: false,
                changeReq: false,
                taxInvoice:false,
                qualityCheck:false,
               
            };
          
        });
    }

    moqDetailsbtn(){
        this.setState((prevState) => {
            return{
             selected: "moqDetails",
            proformainvoice: true,
            transaction: false,
            changeReq: false,
            taxInvoice:false,
            qualityCheck:false,
         
            };
        });
    }

        proformaDetailsbtn(){
        this.setState((prevState) => {
            return{
                selected:"changeReq",
                changeReq: true,
                proformainvoice: false,
                transaction: false,
                taxInvoice:false,
                qualityCheck:false,
                
            };
        });
    }
    changeRequestbtn(){
        this.setState((prevState) => {
            return{
                selected:"qualityCheck",
                changeReq: false,
                proformainvoice: false,
                transaction: false,
                taxInvoice:false,
                qualityCheck:true,
             
            };
        });
    }
    qualityCheckbtn(){
        this.setState((prevState) => {
            return{
                selected:"taxInvoice",
                changeReq: false,
                proformainvoice: false,
                transaction: false,
                taxInvoice:true,
                qualityCheck:false,
              
            };
        });
    }
          
    backoperation(){
        browserHistory.push("/buyerEnquiriesList"); 
    } 

    handleCluster(e) {
 
        var index = e.target.selectedIndex;
        var optionElement = e.target.childNodes[index];
        var option =  optionElement.getAttribute('moqId');
     
      }

  
      

    render() {
        return (
            <React.Fragment>
                 {this.state.dataload == true 
                   
                   ? 
                   <>
                <NavbarComponent/>
                <Container>
                <Row noGutters={true} className="">
                           <Col sm = "1" className="col-xs-2">
                           <img
                                       src={logos.backarrowicon}
                                       className="margin-cparrow cparrowsize glyphicon"
                                        onClick={() => this.backoperation()}
                            ></img>
                          
                          </Col>
                          <Col sm="10" className="col-xs-9">
                               <Row noGutters={true} className ="cp1heading bold  ">
                                   <Col md="12" className="col-xs-12">
                                        {/* Enquiry Id :  */}
                                        {/* {this.state.getEnquiryMoq[0].openEnquiriesResponse.enquiryCode} */}
                                       </Col>
                               </Row>
                          </Col>                            
                </Row>
               

                             
                               <Row noGutters={true}>
                                    <Row noGutters={true}>
                                    <Col sm={1}>
     
                                            </Col>
                                            <Col sm={2}  
                                            className={
                                                (this.state.selected == "BuyerDetails"
                                                     ? "Allenqlistbtn2 ml60"
                                                         : "Allenqlistbtn ml60")
                                                     }
                                            onClick={this.transactionsbtn}>
                                            Transaction
                                            </Col>
                                            <Col sm={2} 
                                            className={
                                                (this.state.selected == "moqDetails"
                                                     ? "Allenqlistbtn2"
                                                         : "Allenqlistbtn")
                                                     }
                                            onClick={this.moqDetailsbtn}>
                                            Proforma Invoice 
                                            </Col>

                                            <Col sm={2} 
                                              className={
                                                (this.state.selected == "changeReq"
                                                     ? "Allenqlistbtn2"
                                                         : "Allenqlistbtn")
                                                     }
                                             onClick={this.proformaDetailsbtn}>
                                           Change Request
                                            </Col>
                                            <Col sm={2} 
                                              className={
                                                (this.state.selected == "qualityCheck"
                                                     ? "Allenqlistbtn2"
                                                         : "Allenqlistbtn")
                                                     }
                                             onClick={this.changeRequestbtn}>
                                             Quality Check 
                                            </Col>
                                            <Col sm={2}  
                                            className={
                                                (this.state.selected == "taxInvoice"
                                                     ? "Allenqlistbtn2"
                                                         : "Allenqlistbtn")
                                                     }
                                            onClick={this.qualityCheckbtn}>
                                           Tax Invoice
                                            </Col> 
                                             <Col sm={1}>
                                            
                                            </Col>
                                    </Row>
                                    <br></br>

                                                       <Row noGutters={true}>
                                                           <Col sm={1}></Col>
                                                          
          
                                                                {this.state.transaction ? 
                                                                             
                                                                             <>
                                                                           
                                                                             <Col sm={12}>
                                                                              <div>
                                                                           <ArtisanTransaction />
                                                                             </div>
                                                                             </Col>
                                                                             </>
                                                                              :
                                                                                 null}
                                                            
  





                                                                {this.state.proformainvoice? 
                                                                <>
                                                                <Col sm={1}></Col>
                                                                <Col sm={8}>
                                                                  <PIchange />
                                                                  {/* <PreviewOldchanges /> */}
                                                                 
                                                                </Col>
                                                                </>
                                                                :
                                                                <>
                                                                </>}

     
                   

                                                            {this.state.changeReq ? 
                                                            <>
                                                            <Col sm={1}></Col>
                                                            <Col sm={8}>
                                                            <ChangeRequest />
                                                            </Col>
                                                            </>
                                                            :null}
                                       
                                                            {this.state.qualityCheck ?  
                                                            <>
                                                            <Col sm={1}></Col>
                                                            <Col sm={8}>
                                                             <div>
                                                            <h6>QC...</h6>
                                                            </div>
                                                            </Col>
                                                            </>:null}

                                                            {this.state.taxInvoice ? 
                                                            <>
                                                            <Col sm={1}></Col>
                                                            <Col sm={8}>
                                                             <div>
                                                            <h6>tax...</h6>
                                                            </div>
                                                            </Col>
                                                            </>
                                                            :null}
                                                            
                                                            
                                                            
                                                     </Row>
  
  
                               </Row>
                               <Row>
            <div> 
              <img
                className="notifyFooterBanner internaldiv"
                src={logos.notifyFooterBanner}
              ></img>
            </div>
          </Row> 
                </Container>
                <Footer/>
                </> :
                <> </>}
            </React.Fragment>
        )
    }
}



function mapStateToProps(state) {
    // debugger;
    const { user } = state
    return { user };
}
