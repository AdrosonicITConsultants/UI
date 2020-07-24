import React, { Component } from 'react'
import { memoryHistory, browserHistory } from "../../helpers/history";
import { Row, Col , Container, Button} from 'reactstrap';
import { connect } from "react-redux";
import NavbarComponent from "../navbar/navbar";
import logos from "../../assets";
import "./AllEnquiryList.css"



export class AllEnquiryList extends Component {
    constructor() {
        super();

        this.buyersDetailsbtn = this.buyersDetailsbtn.bind(this);
        this.moqDetailsbtn = this.moqDetailsbtn.bind(this);
        this.proformaDetailsbtn = this.proformaDetailsbtn.bind(this);
        this.changeRequestbtn = this.changeRequestbtn.bind(this);
        this.qualityCheckbtn = this.qualityCheckbtn.bind(this);
        
        this.state = {
            selected:"BuyerDetails",
            buyersDetail: true,
            moqDetail: false,
            proformaDetails: false,
            qualityCheck:false,
            changeRequest:false,
           
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
        browserHistory.push("/home"); 
    } 
    render() {
        return (
            <React.Fragment>
                <NavbarComponent/>
                <Container>
                <Row noGutters={true} className="cpheadmarginenquiries">
                           <Col sm = "1">
                           <img
                                       src={logos.backarrowicon}
                                       className="margin-cparrow cparrowsize glyphicon"
                                        onClick={() => this.backoperation()}
                                   ></img>
                          
                          </Col>
                          <Col sm="10" >
                               <Row noGutters={true} className ="cp1heading bold fontplay ">
                                   <Col md="12">
                                        All Enquiries
                                       </Col>
                               </Row>
                               <Row noGutters={true}>
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
                                            Buyer's Detail
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
                                    </Row>

                                                       <Row noGutters={true}>
                                                           <Col sm={2}></Col>
                                                                    <Col sm={8}>
           {/* --------------------------------Buyer Detail----------------------------------------------                                                          */}
                                                                {this.state.buyersDetail ? 
                                                                <>
                                                               <Row noGutters={true}>
                                                                   <Col sm={12} className="col-xs-12 BdImgCol">
                                                                       <img  className="BdImg" src={logos.Dimapur}/></Col>
                                                               </Row>
                                                               <Row noGutters={true} className="BdImgCol">
                                                                    <Col sm={6} className="BuyerDetailsh1">
                                                                    Brand Name:
                                                                    </Col>
                                                                    <Col sm={6} className="">
                                                                        70
                                                                    </Col>
                                                                </Row>
                                                                <Row noGutters={true} className="BdImgCol">
                                                                    <Col sm={6} className="BuyerDetailsh1">
                                                                   Name:
                                                                    </Col>
                                                                    <Col sm={6} className="">
                                                                        70
                                                                    </Col>
                                                                </Row>
                                                                <Row noGutters={true} className="BdImgCol">
                                                                    <Col sm={6} className="BuyerDetailsh1">
                                                                    Email Id:
                                                                    </Col>
                                                                    <Col sm={6} className="">
                                                                        70
                                                                    </Col>
                                                                </Row>
                                                                <Row noGutters={true} className="BdImgCol">
                                                                    <Col sm={6} className="BuyerDetailsh1">
                                                                      Phone No:
                                                                    </Col>
                                                                    <Col sm={6} className="">
                                                                        70
                                                                    </Col>
                                                                </Row>
                                                                <Row noGutters={true} className="BdImgCol">
                                                                    <Col sm={6} className="BuyerDetailsh1">
                                                                    Alternate Phone Number:
                                                                    </Col>
                                                                    <Col sm={6} className="">
                                                                        70
                                                                    </Col>
                                                                    <hr className="hrlineasd "></hr>
                                                                </Row>
                                                                <Row noGutters={true} className="BdImgCol">
                                                                    <Col sm={4} className="">
                                                                   <h1 className="BDh1">Delivery address</h1>
                                                                   <p  className="BDp">validation is only applied on pincode field in Artisian Registration & not on buyers profile and registration</p>
                                                                    </Col>
                                                                    <Col sm={4} className="">
                                                                    <h1 className="BDh1">POC details</h1>
                                                                    <p className="BDp">Name : Manali Chintamani Dhuri</p>
                                                                    <p  className="BDp">Email Id : Manali</p>
                                                                    <p  className="BDp">Phone Number : 0987654321</p>
                                                                    </Col>
                                                                    <Col sm={4} className="">
                                                                    <h1 className="BDh1">GST Number</h1>
                                                                    <p  className="BDp">ABC-HJ-09</p>
                                                                    </Col>
                                                                   
                                                                </Row>
                                                                
                                                           </>
                                                                :null}
           {/* --------------------------------Buyer Detail----------------------------------------------                                                          */}
            {/* -------------------MOQ------------------------------------------------------------------------------ */}

                                                            {this.state.moqDetail ?  
                                                            <>
                                                                <Row noGutters={true} className="moqdetailCard Allenqlistbtnmt">
                                                                    <Col sm={6} className="Moqh1">
                                                                        Min Order Qnty:
                                                                    </Col>
                                                                    <Col sm={6} className="Moqh2">
                                                                        70
                                                                    </Col>
                                                                </Row>

                                                                 <Row noGutters={true} className="moqdetailCard Allenqlistbtnmt2">
                                                                 <Col sm={6} className="Moqh1">
                                                                     Price/unit:
                                                                 </Col>
                                                                 <Col sm={6} className="Moqh2">
                                                                 <i class="fa fa-inr" aria-hidden="true"></i>  7000
                                                                 </Col>
                                                             </Row>

                                                             <Row noGutters={true} className="moqdetailCard Allenqlistbtnmt2">
                                                                 <Col sm={6} className="Moqh1">
                                                                    Estimated delivery date:
                                                                 </Col>
                                                                 <Col sm={6} className="Moqh2select">
                                                                 <select name="cars" id="EDD" className="Moqh2selectheight">
                                                                    <option value="edd1">immediate</option>
                                                                    <option value="edd2">45 days from time of advance payment</option>
                                                                    <option value="edd3">60 days from time of advance payment</option>
                                                                    <option value="edd4">75 days from time of advance payment</option>
                                                                    <option value="edd4">90 days from time of advance payment</option>

                                                                    </select>
                                                                 </Col>
                                                             </Row>

                                                             <Row noGutters={true} className="moqdetailCard Allenqlistbtnmt2">
                                                                 <Col sm={12} className="Moqh1">
                                                                    Additional Note:
                                                                 </Col>
                                                                 <p className="Moqh1p">aaaaaaaaaaaaaaaa ggga</p>
                                                             </Row>

                                                             <Row noGutters={true} className=" Allenqlistbtnmt2">
                                                                 <Col sm={6} >
                                                                    <button className="savemoqbtn">Save</button>
                                                                 </Col>
                                                                 <Col sm={6} className="">
                                                                 <button className="sendmoqbtn">Send</button>
                                                                 </Col>
                                                             </Row>
                                                             </>

                                                                :null}
                     {/* -------------------MOQ------------------------------------------------------------------------------ */}

                                                            {this.state.proformaDetails ?  <div>
                                                            <h6>A</h6>
                                                            </div>:null}
                                                           
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
                          </Col>                            
                </Row>
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

const connectedLoginPage = connect(mapStateToProps)(AllEnquiryList);
export default connectedLoginPage;
