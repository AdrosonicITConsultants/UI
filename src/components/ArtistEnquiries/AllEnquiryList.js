import React, { Component } from 'react'
import { memoryHistory, browserHistory } from "../../helpers/history";
import { Row, Col , Container, Button} from 'reactstrap';
import { connect } from "react-redux";
import NavbarComponent from "../navbar/navbar";
import logos from "../../assets";
import "./AllEnquiryList.css"
<<<<<<< HEAD
import TTCEapi from '../../services/API/TTCEapi';


export class AllEnquiryList extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
            ongoingEnquiry:true,
            enquiryStagesMTO :[],
            stage: 3,
=======



export class AllEnquiryList extends Component {
    constructor() {
        super();
>>>>>>> f60fb338305f5c63a651d3bf3810a723a7e3c5ea

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
<<<<<<< HEAD
        this.completed = this.completed.bind(this);
        this.ongoing = this.ongoing.bind(this);


    }      
    completed(){
        this.setState({ongoingEnquiry:false})
    }  
    ongoing(){
        this.setState({ongoingEnquiry:true})
    }        
=======
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
          
>>>>>>> f60fb338305f5c63a651d3bf3810a723a7e3c5ea
    backoperation(){
        browserHistory.push("/home"); 
    }
    componentDidMount(){
        TTCEapi.getEnquirStages().then((response)=>{
            if(response.data.valid)
            {
                console.log(response.data.data);
                this.setState({enquiryStagesMTO:response.data.data})
            }
        })
    } 
    render() {
        return (
            <React.Fragment>
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
                               <Row noGutters={true} className ="cp1heading bold fontplay ">
                                   <Col md="12" className="col-xs-12">
                                        All Enquiries
                                       </Col>
                               </Row>
<<<<<<< HEAD
                               <Row noGutters={true} className="mt20">
                                   {this.state.ongoingEnquiry
                                   ?
                                    <>
                                     <Col className="navoncon oncoselected bold">
                                       <span onClick={this.ongoing }>Ongoing</span> 
                                       <hr className="selctedoptionhr"></hr>
                                    </Col>
                                    <Col className="navoncon onconotselected light">
                                       <span onClick={this.completed }>Completed</span> 
                                    </Col>
                                    </>
                                    :
                                    <>
                                     <Col className="navoncon onconotselected light">
                                     <span onClick={this.ongoing }>Ongoing</span> 
                                    </Col>
                                    <Col className="navoncon oncoselected bold">
                                    <span onClick={this.completed }>Completed</span> 
                                    <hr className="selctedoptionhr2"></hr>

                                    </Col>
                                    </>
                                    }
                                   
=======
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
  
  
>>>>>>> f60fb338305f5c63a651d3bf3810a723a7e3c5ea
                               </Row>
                               
                          </Col>                            
                </Row>
                <Row>
                    <hr className="enquiryoptionhr"></hr>
                </Row>
                <>
                <hr></hr>
                <Row noGutters={true}>
                    <Col className="col-xs-1"></Col>
                    <Col className="col-xs-10">
                        <Row noGutters={true}>
                            <Col sm="9">
                                <div className="imageinlist"> 
                                    <div className="imageinlist1"> 
                                    <img src={logos.dupatta} className="enquiryimage"></img>

                                    </div>
                                    <a href="/" className="leEnqprodName">Crimson Red Ikat Silk Fabrics</a>
                                    {/* <span ></span> */}
                                    
                                </div>
                                <div>
                                  <div noGutters={true} >
                                      <Col className="leEnqid bold">
                                      Enquiry Id : AN-23-GH-778
                                      </Col>
                                  </div>
                                  <div noGutters={true} >
                                      <Col >
                                      <span className="leEnqtype bold ">Fabric </span> 
                                       <span className="leEnqspun"> / Natura Dye  X  Natura Dye   X  Natura Dye</span> 
                                      </Col>
                                  </div>
                                  <div noGutters={true} className="" >
                                      <Col className="leEnqprodcode ">
                                          Product Code : AWE2 - 2345                                      
                                      </Col>
                                  </div>
                               
                                  <div noGutters={true} className="" >
                                      <Col className="leEnqprodtype ">
                                          Made to order                                
                                      </Col>
                                  </div>
                                  <div noGutters={true} className="" >
                                      <Col className="leEnqprodcode ">
                                          <span className="leEnqprodbn ">Brand Name : </span>
                                          <span className="leEnqbrandname ">A & B Fashion House</span>                                   
                                      </Col>
                                  </div>
                                </div>
                            </Col>
                            <Col sm="3" className="text-right">
                                <div noGutters={true} >
                                      <Col className="leEnqOrderAmount ">
                                      Order Amount
                                      </Col>
                                </div>
                                <div noGutters={true} >
                                      <Col className="leEnqAmount bold">
                                      ₹ 280000
                                      </Col>
                                </div>
                                <div noGutters={true} >
                                      <Col className="leEnqidDateStarted">
                                      Date Started : 12-07-2020
                                      </Col>
                                </div>
                                <div noGutters={true} >
                                      <Col className="leEnqidLastUpdated">
                                      Last Updated : 12-07-2020
                                      </Col>
                                </div>
                                <div noGutters={true} >
                                      <Col className="leEnqidEstDelivery">
                                      Est. Date of delivery : 12-07-2020
                                      </Col>
                                </div>

                                
                            </Col>
                        </Row>
                    </Col>

                    
                </Row>
                <Row noGutters={true} className="mt7">
                <Col className="col-xs-1"></Col>
                    <Col className="col-xs-10">
                       <Row noGutters={true}>
                           <Col className="col-xs-12 leEnqstatus bold">
                           Enquiry Status
                           </Col>
                       </Row>
                    </Col>
                </Row>
                <Row noGutters={true} className="mt7">
                <Col className="col-xs-1"></Col>
                    <Col className="col-xs-10">
                       <Row noGutters={true}>
                           <Col className="col-xs-12 ">
                           <div className="progressbarfont">
                            <br /><br />
                            <ul className="list-unstyled multi-steps">
                            {this.state.enquiryStagesMTO.map((item) => <li key={item.id} className={this.state.stage == item.id ? "is-active": " "} >{item.desc}</li> )     }
                            </ul>
                            </div>
                           </Col>
                       </Row>
                    </Col>
                </Row>
                <div className="colorbardiv">      
                          <img src={logos.colorbar} className="colorbarimg"></img>
                </div>
                </>
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
