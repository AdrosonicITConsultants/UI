import React, { Component } from 'react'
import ReactDOM from "react-dom";
import ReactToPdf from "react-to-pdf";
import { memoryHistory, browserHistory } from "../../helpers/history";
import { Row, Col , Container, Button} from 'reactstrap';
import { connect } from "react-redux";
import NavbarComponent from "../navbar/navbar";
import logos from "../../assets";
import "./BuyerAdvancePayment.css";
import queryString from 'query-string';
import TTCEapi from '../../services/API/TTCEapi';
import customToast from "../../shared/customToast";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import moment from 'moment';
import Moment from 'react-moment';

import Footer from '../footer/footer';

export class BuyerAdvancePayment3 extends Component {
    constructor() {
        super();
        

        this.state = {
           
            dataload:true,
            enquiryCode:"",
            enquiryId:"",
            receiptId:"",
            receiptlabel:""

                   }
    }
 
    
    BacktoPreview(){
    // browserHistory.push("/buyerEnquiryDetails?code="+this.props.enquiryId)
    localStorage.setItem("SelectPI", 1);
    browserHistory.goBack()
    }
    // componentDidMount(){
    //     console.log(this.props.enquiryId);
    //     console.log(this.props.receiptId);
    //     console.log(this.props.receiptlabel)
    // }
  
    
    render(){
        let prop=this.props;
        console.log(prop);
        return(
            
<React.Fragment>
<Container>
    {this.state.dataload?
<>


<Row noGutters={true} className="">
                           <Col sm = "1" className="col-xs-1">
                           <img
                                       src={logos.backarrowicon}
                                       className="margin-cparrow cparrowsize glyphicon"
                                       onClick={() => this.BacktoPreview()}
                            ></img>
                          
                          </Col>
                          <Col sm = "11" className="col-xs-11  ">
                         <h3 className="fontheadingadv"><b>Advance Payment for Enquiry id:
                             {this.props.enquiryCode}
                              </b></h3>
                          
                          </Col>
                          </Row>
                          <hr className="hrlineadvpay "></hr>

                          <Row noGutters={true} className="mt-7">
                    <Col className="col-xs-1"></Col>
                    <Col className="col-xs-10">
                        <Row noGutters={true}>
                            <Col sm={3}></Col>
                            <Col sm="9">
                                <div className="imageinlist"> 
                                    <div className="imageinlist1"> 
                                    {
                                        this.props.productType === "Product"
                                        ?
                                        <a href={"/showArtisanProduct?ProductId="+this.props.productId }><img  src={TTCEapi.ImageUrl +"Product/" + this.props.productId + "/" + this.props.productImages.split(",")[0]} className="enquiryimage advpayimg"></img>
                                        </a>
                                        :
                                        <a href={"/showBuyerProduct?productId="+this.props.productId }><img  src={TTCEapi.ImageUrl +"CustomProduct/" + this.props.productId + "/" + this.props.productImages.split(",")[0]} className="enquiryimage advpayimg"></img>
                                        </a>

                                    }

                                    </div>
                                    
                                    {/* <span ></span> */}
                                </div>
                                <div>
                                  <div noGutters={true} >
                                      <Col className="leEnqid bold payadvhead">
                                      Enquiry Id : {this.props.enquiryCode}
                                      </Col>
                                  </div>
                                  <div noGutters={true} >
                                      <Col >
                                      <span className="leEnqtype bold fontsize16pa ">{this.props.productDesc} </span> 
                                       <span className="leEnqspun fontsize16pa"> / {this.props.yarnDesc}  X  {this.props.weftYarnId}  
                                        {this.props.extraWeftYarnId > 0 
                                        ?
                                        <>
                                        X {this.props.extraWeftYarnIds?this.props.extraWeftYarnIds:""}
                                        </>
                                        :
                                            <></>
                                        }</span> 
                                      </Col>
                                  </div>
                                  
                               
                                 
                                  <div noGutters={true} className="" >
                                      <Col className="leEnqprodcode ">
                                          <span className="leEnqprodbn bold">Artisan Brand : </span>
                                          <span className="leEnqbrandname ">{this.props.companyName}</span>                                   
                                      </Col>
                                  </div>
                                </div>
                            </Col>
                            
                        </Row>
                    </Col>

                    
                </Row>

                
<Row noGutters={true} style={{marginTop:"10px"}}>
<Col className="col-xs-12" style={{textAlign:"center",marginBottom:"20px"}}>
    <img src={logos.greentick} style={{height:"100px"}}/>
     </Col>
</Row>

<Row noGutters={true} style={{marginTop:"10px"}}>
    <Col className="col-xs-12" style={{textAlign:"center"}}>
    <p>   <span className="selectpercenttext">  Thank you! Your receipt has been uploaded successfully and Artisan is notified. <br/>
    The acceptance will be notified within 3 maximum days from now.
                </span></p>
    </Col>
</Row>

<Row noGutters={true} className="margintoprow">
    <Col className="col-xs-12" style={{textAlign:"center"}}>
    


         {/* <a href={"/payadvance?code="+this.props.enquiryCode }>
         <img  src={TTCEapi.ReceiptUrl + this.props.receiptId + "/" + this.props.receiptlabel}
       >

         </img>
                                         </a>  */}

<a href={TTCEapi.ReceiptUrl + prop.receiptId + "/" + prop.receiptlabel} target="_blank">
<button className="proccedwithadvpaybtn viewtractionbtnwidth"  >
            
        <img src={logos.whitetransaction} style={{marginRight:"11px",height:"20px"}}/>          
        View this transaction
            </button>
    </a>

    </Col>
</Row>
<br/>
<div className="colorbardiv">      
                          <img src={logos.colorbar} className="colorbarimg"></img>
                </div>
               
                </>:null}
               
</Container>

</React.Fragment>
        )
    }
    
}
function mapStateToProps(state) {
    // debugger;
    const { user } = state
    return { user };
}

const connectedLoginPage = connect(mapStateToProps)(BuyerAdvancePayment3);
export default connectedLoginPage;